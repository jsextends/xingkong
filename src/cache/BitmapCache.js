import Rectangle from "../geom/Rectangle"
import StageGL from "../display/StageGL";
import { nanoid } from 'nanoid'
/**
 * Class BitmapCache
 */
export default class BitmapCache {
    /**
     * @property {Number} width 缓存canvas的宽度
     */
    width = 1;

    /**
     * @property {Number} height 缓存canvas的高度 
     */
    height = 1;

    /**
     * @property {Number} x 缓存canvas的x位置
     */
    x = 0;

    /**
     * @property {Number} y 缓存canvas的y位置
     */
    y = 0;

    /**
     * @property {Number} scale 缓存canvas的scale
     * @default 1
     */
    scale = 1;

    /**
     * @property {height} offX
     * @default 0
     */
    offX = 0;

    /**
     * @property {height} offY
     * @default 0
     */
    offY = 0;

    /**
     * @property {height} cacheID
     */
    cacheID = 0;

    target = null;

    /**
     * @property {height} _filterOffX
     */
    _filterOffX = 0;

    /**
     * @property {height} _filterOffY
     */
    _filterOffY = 0;

    /**
     * @property {height} _cacheDataURLID
     */
    _cacheDataURLID = 0;

    /**
     * @property {height} _cacheDataURL
     */
    _cacheDataURL = null;

    /**
     * @property {height} _drawWidth
     */
    _drawWidth = 0;

    /**
     * @property {height} _drawHeight
     */
    _drawHeight = 0;

    /**
     * @property {height} _boundRect
     */
    _boundRect = new Rectangle();

    _options = null;

    /**
     * 获取通过过滤器作用后的有效范围
     * @param {*} target 
     * @returns {Rectangle}
     */
    static getFilterBounds(target) {
        let result = new Rectangle();
        let filters = target.filters;
        let filterCount = filters && filters.length;
        if (!!filterCount <= 0) { return result; }
        for (let i = 0; i < filterCount; i++) {
            let filter = filters[i];
            if (filter && filter.getBounds) {
                let test = filter.getBounds();
                if (test) {
                    if (i == 0) {
                        result.setValues(test.x, test.y, test.width, test.height);
                    } else {
                        result.extend(test.x, test.y, test.width, test.height);
                    }
                }
            }
        }
        return result;
    };

    constructor() {
        this.width = 1;
        this.height = 1;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
    }

    /**
     * 定义一个有效的缓存
     * @param {Container} target 缓存的源对象
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} scale 
     * @param {Object} options 
     */
    define(target, x, y, width, height, scale, options) {
        if (!target) { throw "没有定义缓存的源对象"; }
        this._options = options;
        this.target = target;
        this.width = width >= 1 ? width : 1;
        this.height = height >= 1 ? height : 1;
        this.x = x || 0;
        this.y = y || 0;
        this.scale = scale || 1;
        this.update();
    };

    /**
     * 更新图像的融合模式
     * @param {CanvasRenderingContext2D.globalCompositeOperation} compositeOperation 
     */
    update(compositeOperation) {
        if (!this.target) { throw "缓存的源对象没有被定义" }

        let filterBounds = BitmapCache.getFilterBounds(this.target);
        let surface = this.target.cacheCanvas;

        this._drawWidth = Math.ceil(this.width * this.scale) + filterBounds.width;
        this._drawHeight = Math.ceil(this.height * this.scale) + filterBounds.height;

        if (!surface || this._drawWidth != surface.width || this._drawHeight != surface.height) {
            this._updateSurface();
        }

        this._filterOffX = filterBounds.x;
        this._filterOffY = filterBounds.y;
        this.offX = this.x * this.scale + this._filterOffX;
        this.offY = this.y * this.scale + this._filterOffY;

        this._drawToCache(compositeOperation);

        this.cacheID = nanoid();
    };

    release() {
        if (this._webGLCache) {
            if (!this._webGLCache.isCacheControlled) {
                if (this.__lastRT) { this.__lastRT = undefined; }
                if (this.__rtA) { this._webGLCache._killTextureObject(this.__rtA); }
                if (this.__rtB) { this._webGLCache._killTextureObject(this.__rtB); }
                if (this.target && this.target.cacheCanvas) { this._webGLCache._killTextureObject(this.target.cacheCanvas); }
            }
            this._webGLCache = false;
        } else {
            var stage = this.target.stage;
            if (stage instanceof StageGL) {
                stage.releaseTexture(this.target.cacheCanvas);
            }
        }
        this.target = this.target.cacheCanvas = null;
        this.cacheID = this._cacheDataURLID = this._cacheDataURL = undefined;
        this.width = this.height = this.x = this.y = this.offX = this.offY = 0;
        this.scale = 1;
    };

    /**
     * 返回一个包含图片展示的 data URI
     * @param {string} [type="image/png"] 图片格式
     * @param {*} [encoderOptions=0.92] 在指定图片格式为image/jpeg或image/webp的情况下，可以从0到1的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92
     * @returns {data URI}
     */
    getCacheDataURL(type = "image/png", encoderOptions = 0.92) {
        var cacheCanvas = this.target && this.target.cacheCanvas;
        if (!cacheCanvas) { return null; }
        if (this.cacheID != this._cacheDataURLID) {
            this._cacheDataURLID = this.cacheID;
            this._cacheDataURL = cacheCanvas.toDataURL ? cacheCanvas.toDataURL(type, encoderOptions) : null
        }
        return this._cacheDataURL;
    };

    /**
     * 将缓存的信息绘制到上下文
     * @param {CanvasRenderingContext2D} ctx 需要绘制的上下文
     * @returns 
     */
    draw(ctx) {
        if (!this.target) { return false; }
        ctx.drawImage(this.target.cacheCanvas,
            this.x + (this._filterOffX / this.scale), this.y + (this._filterOffY / this.scale),
            this._drawWidth / this.scale, this._drawHeight / this.scale
        );
    };

    /**
     * 获取界限
     * @returns {Rectangle}
     */
    getBounds() {
        this._boundRect.setValues(
            this._filterOffX / this.scale, this._filterOffY / this.scale,
            this.width / this.scale, this.height / this.scale
        );
        return this._boundRect
    };

    _updateSurface() {
        var surface;
        if (!this._options || !this._options.useGL) {
            surface = this.target.cacheCanvas;
            if (!surface) {
                surface = this.target.cacheCanvas = document.createElement("canvas");
            }

            surface.width = this._drawWidth;
            surface.height = this._drawHeight;
            return;
        }

        if (!this._webGLCache) {
            if (this._options.useGL === "stage") {
                if (!(this.target.stage && this.target.stage.isWebGL)) {
                    var error = "不能使用'stage'作为缓存，因为对象的父阶段是";
                    error += this.target.stage ? "非WebGL" : "未设置，请将子容器添加到正确的阶段";
                    throw error;
                }
                this.target.cacheCanvas = true; 
                this._webGLCache = this.target.stage;

            } else if (this._options.useGL === "new") {
                this.target.cacheCanvas = document.createElement("canvas"); 
                this._webGLCache = new StageGL(this.target.cacheCanvas, { antialias: true, transparent: true, autoPurge: -1 });
                this._webGLCache.isCacheControlled = true;

            } else if (this._options.useGL instanceof StageGL) {
                this.target.cacheCanvas = true;
                this._webGLCache = this._options.useGL;
                this._webGLCache.isCacheControlled = true;

            } else {
                throw "提供给useGL的无效的，有效的选项['stage', 'new', StageGL, undefined],而不是 " + this._options.useGL;
            }
        }

        surface = this.target.cacheCanvas;
        var stageGL = this._webGLCache;

        if (stageGL.isCacheControlled) {
            surface.width = this._drawWidth;
            surface.height = this._drawHeight;
            stageGL.updateViewport(this._drawWidth, this._drawHeight);
        }
        if (this.target.filters) {
            stageGL.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight);
            stageGL.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight);
        } else {
            if (!stageGL.isCacheControlled) {
                stageGL.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight);
            }
        }
    };

    _drawToCache(compositeOperation) {
        var surface = this.target.cacheCanvas;
        var target = this.target;
        var webGL = this._webGLCache;

        if (webGL) {
            webGL.cacheDraw(target, target.filters, this);
            surface = this.target.cacheCanvas;

            surface.width = this._drawWidth;
            surface.height = this._drawHeight;
        } else {
            var ctx = surface.getContext("2d");

            if (!compositeOperation) {
                ctx.clearRect(0, 0, this._drawWidth + 1, this._drawHeight + 1);
            }

            ctx.save();
            ctx.globalCompositeOperation = compositeOperation;
            ctx.setTransform(this.scale, 0, 0, this.scale, -this._filterOffX, -this._filterOffY);
            ctx.translate(-this.x, -this.y);
            target.draw(ctx, true);
            ctx.restore();


            if (target.filters && target.filters.length) {
                this._applyFilters(ctx);
            }
        }
        surface._invalid = true;
    };

    _applyFilters(ctx) {
        var filters = this.target.filters;
        var w = this._drawWidth;
        var h = this._drawHeight;
        var data;
        var i = 0, filter = filters[i];
        do {
            if (filter.usesContext) {
                if (data) {
                    ctx.putImageData(data, 0, 0);
                    data = null;
                }
                filter.applyFilter(ctx, 0, 0, w, h);
            } else {
                if (!data) {
                    data = ctx.getImageData(0, 0, w, h);
                }
                filter._applyFilter(data);
            }
            filter = filter._multiPass !== null ? filter._multiPass : filters[++i];
        } while (filter);

        if (data) {
            ctx.putImageData(data, 0, 0);
        }
    };

    toString() {
        return "[BitmapCache]";
    };
}