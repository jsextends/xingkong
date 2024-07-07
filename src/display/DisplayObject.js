import { JEventTarget } from "@jsextends/jevent"
import { nanoid } from 'nanoid'
import DisplayProps from "../geom/DisplayProps";
import Matrix2D from "../geom/Matrix2D";
import Stage from "./Stage";
import BitmapCache from "../cache/BitmapCache"
import Point from "../geom/Point";

/** 
 * Class DisplayObject
 * @description DisplayObject是**星空**库中所有显示类的基类。它定义了所有显示对象之间共享的核心属性和方法
 * @extends JEventTarget
 */
export default class DisplayObject extends JEventTarget {

    /**
     * @property {Number} alpha 设置图形和图片透明度的属性。数值的范围从 0.0（完全透明）到 1.0（完全不透明）
     * @default 1
     */
    alpha = 1;

    /**
     * @property {HTMLCanvasElement} cacheCanvas 如果缓存处于活动状态，则返回保存该显示对象图像的画布
     * @default null
     */
    cacheCanvas = null;

    /**
     * @property {BitmapCache} bitmapCache 如果创建了缓存，则返回管理cacheccanvas及其属性的类
     * @default null
     */
    bitmapCache = null;

    /**
     * @property {String} id 这个显示对象的唯一ID
     * @default null
     */
    id = null;

    /**
     * @property {Boolean} mouseEnabled 如果将此值设置为false，则在单击子容器时不会触发该容器上的事件
     * @default true
     */
    mouseEnabled = true;

    /**
     * @property {Boolean} tickEnabled 如果为false，则该tick不会在此显示对象(或其子对象)上运行
     * @default true
     */
    tickEnabled = true;

    /**
     * @property {String|null} name 显示对象的可选名称
     * @default null
     */
    name = null;

    /**
     * @property {Container|Stage|null} parent 此显示对象的Container或Stage对象的引用
     * @default null
     */
    parent = null;

    /**
     * @property {Number} regX 显示对象的定位点的x偏移量
     * @default 0
     */
    regX = 0;

    /**
     * @property {Number} regY 显示对象的定位点的y偏移量
     * @default 0
     */
    regY = 0;

    /**
     * @property {Number} rotation 显示对象的旋转度
     * @default 0
     */
    rotation = 0;

    /**
     * @property {Number} scaleX 用于水平拉伸此显示对象的因子
     * @description 将scaleX设置为2将把显示对象拉伸到其标称宽度的两倍。若要水平翻转对象，请将比例设置为负数。
     * @default 1
     */
    scaleX = 1;

    /**
     * @property {Number} scaleY 用于垂直拉伸此显示对象的因子
     * @description 将scaleY设置为2将把显示对象拉伸到其标称高度的两倍。若要垂直翻转对象，请将比例设置为负数。
     * @default 1
     */
    scaleY = 1;
    
    /**
     * @property {Number} skewX 显示对象水平倾斜的因子。
     * @default 0
     */
    skewX = 0;

    /**
     * @property {Number} skewY 显示对象垂直倾斜的因子。
     * @default 0
     */
    skewY = 0;

    /**
     * @property {Shadow} shadow 一个阴影对象，它定义要在此显示对象上呈现的阴影
     * @default null
     */
    shadow = null;

    /**
     * @property {Boolean} visible 表明是否应将此显示对象呈现到画布上
     * @default true 
     */
    visible = true;

    /**
     * @property {Number} x 显示对象相对于其父对象的x(水平)位置。
     * @default 0
     */
    x = 0;

    /**
     * @property {Number} x 显示对象相对于其父对象的y(垂直)位置。
     * @default 0
     */
    y = 0;

    /**
     * @property {Matrix2D|null} transformMatrix 定义此显示对象的转换
     * @default null
     */
    transformMatrix = null;

    /**
     * @property {CanvasRenderingContext2D.globalCompositeOperation} compositeOperation 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
     * @see  {@link https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation|globalCompositeOperation}
     */
    compositeOperation = null;

    /**
     * @property {Boolean} snapToPixel 表明当snapToPixelEnabled为true时，显示对象是否应该绘制到整个像素
     * @default true
     */
    snapToPixel = true;

    /**
     * @property {Array} filters 应用于此显示对象的筛选器对象数组
     * @description 过滤器仅在对显示对象调用Cache或UpdateCache时应用/更新，并且仅应用于缓存的区域
     * @default []
     */
    filters = [];

    /**
     * @property {Shape} mask 一个Shape实例，它为这个显示对象定义了一个矢量蒙版(剪切路径)
     * @description 形状的转换将相对于显示对象的父坐标应用
     * @default null
     */
    mask = null;

    /**
     * @property {Object} hitArea 在检查鼠标交互或测试getObjectsUnderPoint时要测试的显示对象
     */
    hitArea = null;

    /**
     * @property {String} cursor CSS游标
     * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor|cursor}
     * @description 用户将鼠标悬停在此显示对象上时将显示。必须使用enableMouseOver方法启用鼠标悬停事件才能使用此属性。在容器上设置非空游标将覆盖在其后代上设置的游标。
     */
    cursor = null;

    /**
     * @property {Number} _cacheScale 缓存的缩放倍数
     * @private
     * @default 1
     */
    _cacheScale = 1 

    /**
     * @property {string} _cacheDataURLID 缓存对象url的唯一标识
     * @private 
     */
    _cacheDataURLID = "";

    /**
     * @property {String} _cacheDataURL 缓存对象url
     * @private 
     * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL|toDataURL}
     */
    _cacheDataURL = null;

    /**
     * @property {Object} _props 其他的一些属性
     * @private
     */
    _props = null;

    /**
     * @property {Rectangle} _rectangle
     * @private
     */
    _rectangle = null;

    /**
     * @property {Object} _bounds
     * @private
     */
    _bounds = null;

    /**
     * @private
     * @property {Number} _webGLRenderStyle canvas上下文的类型
     * @default 0
     */
    _webGLRenderStyle = DisplayObject._StageGL_NONE;

    /**
     * @property {Matrix2D} _glMtx
     * @private
     */
    _glMtx = null;

    /**
     * @static
     * @property {Array} _MOUSE_EVENTS 支持的鼠标事件类型
     * @protected
     */
    static _MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"];

    /**
     * @static
     * @property {Boolean} suppressCrossDomainErrors 在使用诸如hitTest、鼠标事件等功能时，显示错误
     * @protected
     * @default false
     */
    static suppressCrossDomainErrors = false;

    /**
     * @static
     * @property {Boolean} _snapToPixelEnabled 在绘制期间临时复制snapToPixelEnabled以提供全局访问
     * @protected
     * @default false
     */
    static _snapToPixelEnabled = false;

     /**
     * @static
     * @enum {Number}
     * @readonly
     */
    static _StageGL_NONE = 0;

    /**
     * @static
     * @enum {Number}
     * @readonly
     */
    static _StageGL_SPRITE = 1;

    /**
     * @static
     * @enum {Number}
     * @readonly
     */
    static _StageGL_BITMAP = 2;

    /**
	 * @property {HTMLCanvasElement | Object} _hitTestCanvas
	 * @static
	 * @protected
	 **/
    _hitTestCanvas = null;

 	/**
	 * @property {CanvasRenderingContext2D} _hitTestContext
	 * @static
	 * @protected
	 **/
    _hitTestContext = null;

    /**
     * @constructor
     * @description 用于构建一个DisplayObject,这个类不能直接new
     */
    constructor() {
        super();
        id = nanoid()
        _props = new DisplayProps();
        _rectangle = new Rectangle();
        _glMtx = Matrix2D();

        if (!DisplayObject._hitTestCanvas) {
            let canvas = document.createElement("canvas");
            DisplayObject._hitTestCanvas = canvas;
            DisplayObject._hitTestContext = canvas.getContext("2d");
            canvas.width = canvas.height = 1;
        }
    }

    /**
     * 获取绘制的舞台信息
     * @returns {Stage}
     */
    getStage() {
        let o = this;
        while (o.parent) { o = o.parent; }
        if (o instanceof Stage) { return o; }
        return null;
    }

    /**
     * 获取缓存的唯一标识
     * @returns {string}
     */
    getCacheID() {
        return this.bitmapCache && this.bitmapCache.cacheID
    }

    /**
     * 设置缓存的唯一标识
     * @param {String} id 缓存的唯一标识
     */
    setCacheID(id) {
        this.bitmapCache && (this.bitmapCache.cacheID = id);
    }

    /**
     * 获取水平方向的缩放倍数
     * @returns {Number}
     */
    getScale() {
        return this.scaleX;
    }

    /**
     * 设置缩放倍数
     * @param {Number} scale 
     */
    setScale(scale) {
        this.scaleX = this.scaleY = scale;
    }

    /**
     * 判断当前的显示对象是否可见
     * @returns {Boolean}
     */
    isVisible() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
    };

    /**
     * 绘制显示的对象
     * @param {CanvasRenderingContext2D} ctx 容器的上下文
     * @param {Boolean} ignoreCache 是否忽略缓存容器的绘制
     * @returns 
     */
    draw(ctx, ignoreCache) {
        var cache = this.bitmapCache;
        if (cache && !ignoreCache) {
            return cache.draw(ctx);
        }
        return false;
    };

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 容器的上下文
     */
    updateContext(ctx) {
        var o = this, mask = o.mask, mtx = o._props.matrix;
        if (mask && mask.graphics && !mask.graphics.isEmpty()) {
            mask.getMatrix(mtx);
            ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);

            mask.graphics.drawAsPath(ctx);
            ctx.clip();

            mtx.invert();
            ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        }

        this.getMatrix(mtx);
        var tx = mtx.tx, ty = mtx.ty;
        if (DisplayObject._snapToPixelEnabled && o.snapToPixel) {
            tx = tx + (tx < 0 ? -0.5 : 0.5) | 0;
            ty = ty + (ty < 0 ? -0.5 : 0.5) | 0;
        }
        ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, tx, ty);
        ctx.globalAlpha *= o.alpha;
        if (o.compositeOperation) { ctx.globalCompositeOperation = o.compositeOperation; }
        if (o.shadow) { this._applyShadow(ctx, o.shadow); }
    };

    /**
     * 设置缓存
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} scale 
     * @param {Object} options 
     */
    cache(x, y, width, height, scale, options) {
        if (!this.bitmapCache) {
            this.bitmapCache = new BitmapCache();
        } else {
            this.bitmapCache._autoGenerated = false;
        }
        this.bitmapCache.define(this, x, y, width, height, scale, options);
    };

    /**
     * 更新缓存的图形融合模式
     * @param {CanvasRenderingContext2D.globalCompositeOperation} compositeOperation 
     */
    updateCache(compositeOperation) {
        if (!this.bitmapCache) {
            throw "cache() must be called before updateCache()";
        }
        this.bitmapCache.update(compositeOperation);
    };

    /**
     * 销毁缓存
     */
    uncache() {
        if (this.bitmapCache) {
            this.bitmapCache.release();
            this.bitmapCache = undefined;
        }
    };

    
    getCacheDataURL(type, encoderOptions) {
        return this.bitmapCache ? this.bitmapCache.getCacheDataURL(type, encoderOptions) : null;
    };
    localToGlobal(x, y, pt) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(x, y, pt || new Point());
    };

    globalToLocal(x, y, pt) {
        return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(x, y, pt || new Point());
    };

    localToLocal(x, y, target, pt) {
        pt = this.localToGlobal(x, y, pt);
        return target.globalToLocal(pt.x, pt.y, pt);
    };

    setTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = scaleX == null ? 1 : scaleX;
        this.scaleY = scaleY == null ? 1 : scaleY;
        this.rotation = rotation || 0;
        this.skewX = skewX || 0;
        this.skewY = skewY || 0;
        this.regX = regX || 0;
        this.regY = regY || 0;
        return this;
    };

    getMatrix(matrix) {
        var o = this, mtx = matrix || new Matrix2D();
        return o.transformMatrix ? mtx.copy(o.transformMatrix) :
            (mtx.identity() && mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY));
    };

    getConcatenatedMatrix(matrix) {
        var o = this, mtx = this.getMatrix(matrix);
        while (o = o.parent) {
            mtx.prependMatrix(o.getMatrix(o._props.matrix));
        }
        return mtx;
    };

    getConcatenatedDisplayProps(props) {
        props = props ? props.identity() : new createjs.DisplayProps();
        var o = this, mtx = o.getMatrix(props.matrix);
        do {
            props.prepend(o.visible, o.alpha, o.shadow, o.compositeOperation);

            // we do this to avoid problems with the matrix being used for both operations when o._props.matrix is passed in as the props param.
            // this could be simplified (ie. just done as part of the prepend above) if we switched to using a pool.
            if (o != this) { mtx.prependMatrix(o.getMatrix(o._props.matrix)); }
        } while (o = o.parent);
        return props;
    };


    hitTest(x, y) {
        var ctx = DisplayObject._hitTestContext;
        ctx.setTransform(1, 0, 0, 1, -x, -y);
        // hit tests occur in a 2D context, so don't attempt to draw a GL only Texture into a 2D context
        this.draw(ctx, !(this.bitmapCache && !(this.bitmapCache._cacheCanvas instanceof WebGLTexture)));

        var hit = this._testHit(ctx);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 2, 2);
        return hit;
    };

    set(props) {
        for (var n in props) { this[n] = props[n]; }
        return this;
    };

    getBounds() {
        if (this._bounds) { return this._rectangle.copy(this._bounds); }
        var cache = this.bitmapCache;
        if (cache && this.cacheCanvas) {
            return cache.getBounds();
        }
        return null;
    };

    getTransformedBounds() {
        return this._getBounds();
    };

    setBounds(x, y, width, height) {
        if (x == null) { this._bounds = x; return; }
        this._bounds = (this._bounds || new Rectangle()).setValues(x, y, width, height);
    };

    clone() {
        return this._cloneProps(new DisplayObject());
    };

    toString() {
        return "[DisplayObject (name=" + this.name + ")]";
    };
    _updateState(){

    };

    _cloneProps(o) {
        o.alpha = this.alpha;
        o.mouseEnabled = this.mouseEnabled;
        o.tickEnabled = this.tickEnabled;
        o.name = this.name;
        o.regX = this.regX;
        o.regY = this.regY;
        o.rotation = this.rotation;
        o.scaleX = this.scaleX;
        o.scaleY = this.scaleY;
        o.shadow = this.shadow;
        o.skewX = this.skewX;
        o.skewY = this.skewY;
        o.visible = this.visible;
        o.x = this.x;
        o.y = this.y;
        o.compositeOperation = this.compositeOperation;
        o.snapToPixel = this.snapToPixel;
        o.filters = this.filters == null ? null : this.filters.slice(0);
        o.mask = this.mask;
        o.hitArea = this.hitArea;
        o.cursor = this.cursor;
        o._bounds = this._bounds;
        o._webGLRenderStyle = this._webGLRenderStyle;
        return o;
    };

    _applyShadow(ctx, shadow) {
        shadow = shadow || Shadow.identity;
        ctx.shadowColor = shadow.color;
        ctx.shadowOffsetX = shadow.offsetX;
        ctx.shadowOffsetY = shadow.offsetY;
        ctx.shadowBlur = shadow.blur;
    };

    _tick(evtObj) {
        // because tick can be really performance sensitive, check for listeners before calling dispatchEvent.
        var ls = this._listeners;
        if (ls && ls["tick"]) {
            // reset & reuse the event object to avoid construction / GC costs:
            evtObj.target = null;
            evtObj.propagationStopped = evtObj.immediatePropagationStopped = false;
            this.dispatchEvent(evtObj);
        }
    };

    _testHit(ctx) {
        try {
            var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1;
        } catch (e) {
            if (!DisplayObject.suppressCrossDomainErrors) {
                throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
            }
        }
        return hit;
    };

    _getBounds(matrix, ignoreTransform) {
        return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
    };

    _transformBounds(bounds, matrix, ignoreTransform) {
        if (!bounds) { return bounds; }
        var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height, mtx = this._props.matrix;
        mtx = ignoreTransform ? mtx.identity() : this.getMatrix(mtx);

        if (x || y) { mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y); } // TODO: simplify this.
        if (matrix) { mtx.prependMatrix(matrix); }

        var x_a = width * mtx.a, x_b = width * mtx.b;
        var y_c = height * mtx.c, y_d = height * mtx.d;
        var tx = mtx.tx, ty = mtx.ty;

        var minX = tx, maxX = tx, minY = ty, maxY = ty;

        if ((x = x_a + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = x_a + y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }

        if ((y = x_b + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = x_b + y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }

        return bounds.setValues(minX, minY, maxX - minX, maxY - minY);
    };

    _hasMouseEventListener() {
        var evts = DisplayObject._MOUSE_EVENTS;
        for (var i = 0, l = evts.length; i < l; i++) {
            if (this.hasEventListener(evts[i])) { return true; }
        }
        return !!this.cursor;
    };
}