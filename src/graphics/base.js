import { DRAWSTATUS } from "../common/status";
import { uuid } from "../tools/common";

export default class Base {
  /**
   * @property {CanvasRenderingContext2D.direction} direction 属性用来在绘制文本时，描述当前文本方向
   * @default inherit
   */
  direction = "inherit";

  /**
   * @property {String|CanvasGradient|CanvasPattern} fillStyle 填充颜色
   * @default #000
   */
  fillStyle = "#000";

  /**
   * @property {String} font 当前字体样式的属性
   * @default '10px sans-serif'
   */
  font = "10px sans-serif";

  /**
   * @property {String} fontKerning 字体字距调整
   * @default 'auto'
   */
  fontKerning = "auto";

  /**
   * @property {String} fontStretch 字体的伸展值
   * @default 'normal'
   */
  fontStretch = "normal";

  /**
   * @property {String} fontVariantCaps 渲染文本的替代大写形式
   * @default 'normal'
   */
  fontVariantCaps = "normal";

  /**
   * @property {Number} globalAlpha 设置图形和图片透明度的属性
   * @default 1
   */
  globalAlpha = 1;

  /**
   * @property {CanvasRenderingContext2D.globalCompositeOperation} globalCompositeOperation 在绘制新形状时应用的合成操作的类型
   * @default source-over
   */
  globalCompositeOperation = "source-over";

  /**
   * @property {Boolean} imageSmoothingEnabled 对缩放后的图片进行平滑处理
   * @default true
   */
  imageSmoothingEnabled = true;

  /**
   * @property {Boolean} imageSmoothingQuality 设置图像平滑度
   * @default "low"
   */
  imageSmoothingQuality = "low";

  /**
   * @property {String} letterSpacing 字母之间的间距
   * @default "0px"
   */
  letterSpacing = "0px";

  /**
   * @property {CanvasRenderingContext2D.lineCap} lineCap 如何绘制每一条线段末端的属性
   * @default butt
   */
  lineCap = "butt";

  /**
   * @property {CanvasRenderingContext2D.lineJoin} lineJoin 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
   * @default miter
   */
  lineJoin = "miter";

  /**
   * @property {Number} lineWidth 线段的宽度
   * @default 1
   */
  lineWidth = 1;

  /**
   * @property {Number} miterLimit 斜接面限制比例
   * @default 1
   */
  miterLimit = 10;

  /**
   * @property {Number} shadowBlur 模糊效果程度
   * @default 0
   */
  shadowBlur = 0;

  /**
   * @property {String} shadowColor 阴影颜色
   * @default "rgba(0, 0, 0, 0)"
   */
  shadowColor = "rgba(0, 0, 0, 0)";

  /**
   * @property {Number} shadowOffsetX  阴影水平偏移距离
   * @default 0
   */
  shadowOffsetX = 0;

  /**
   * @property {Number} shadowOffsetY  阴影垂直偏移距离
   * @default 0
   */
  shadowOffsetY = 0;

  /**
   * @property {String|CanvasGradient|CanvasPattern} strokeStyle  填充颜色
   * @default #000
   */
  strokeStyle = "#000";

  /**
   * @property {CanvasRenderingContext2D.textAlign} textAlign 文本的对齐方式
   * @default "start"
   */
  textAlign = "start";

  /**
   * @property {CanvasRenderingContext2D.textBaseline} textBaseline 当前文本基线
   * @default "alphabetic"
   */
  textBaseline = "alphabetic";

  /**
   * @property {CanvasRenderingContext2D.textRendering} textRendering 渲染文本时向渲染引擎提供应该如何优化的相关信息
   * @default "auto"
   */
  textRendering = "auto";

  /**
   * @property {String} wordSpacing 绘制文本时单词之间的间距
   * @default "0px"
   */
  wordSpacing = "0px";

  _storeProps = [
    "direction",
    "fillStyle",
    "filter",
    "font",
    "fontKerning",
    "fontStretch",
    "fontVariantCaps",
    "globalAlpha",
    "globalCompositeOperation",
    "imageSmoothingEnabled",
    "imageSmoothingQuality",
    "letterSpacing",
    "lineCap",
    "lineDashOffset",
    "lineJoin",
    "lineWidth",
    "miterLimit",
    "shadowBlur",
    "shadowColor",
    "shadowOffsetX",
    "shadowOffsetY",
    "strokeStyle",
    "textAlign",
    "textBaseline",
    "textRendering",
    "wordSpacing",
  ];

  /**
   * @property {String} text 图形的类型
   */
  type = "";

  /**
   *  @property {String} text 图形的唯一标识
   */
  id = "";

  /**
   * @property {CircleGeometry} 图形的几何形状
   */
  geom = null;

  _drawStatus = DRAWSTATUS.NONE;

  _canvasHeight = 0;

  _canvasWidth = 0;

  /**
   * 图形类的基类, 抽象类，不能直接new
   * @param {String} type 图形的类型
   * @param {String} id 图形的唯一标识
   */
  constructor(type, id) {
    this.type = type;
    this.setId(id);
    this.setDrawStatus(DRAWSTATUS.PROCESS);
  }

  /**
   * 返回图形的类型
   * @returns {String}
   */
  getType() {
    return this.type;
  }

  /**
   * 返回唯一标识
   * @returns {String}
   */
  getId() {
    return this.id;
  }

  /**
   * 返回图形对应的几何形状
   * @returns
   */
  getGeomerty() {
    return this.geom;
  }

  /**
   * 设置唯一表示
   * @param {String} id
   */
  setId(id) {
    this.id = id || uuid();
  }

  getDrawStatus() {
    return this._drawStatus;
  }

  setDrawStatus(status) {
    this._drawStatus = status;
  }

  getVisible() {
    return this.globalAlpha !== 0;
  }

  getCanvasHeight() {
    return this._canvasHeight;
  }

  getCanvasWidth() {
    return this._canvasWidth;
  }

  /**
   * 渲染图形
   * @param {CanvasRenderingContext2D} context
   * @param {Boolean} isRedraw -是否强制渲染
   */
  render(context, isRedraw = false) {
    this._canvasHeight = context.canvas.height;
    this._canvasWidth = context.canvas.width;
    if (this.getVisible(context)) {
      if (isRedraw) {
        this.setDrawStatus(DRAWSTATUS.PROCESS);
        this.save();
        this._updateStyle();
        this._render(context);
        this.restore();
      } else {
        if (this.getDrawStatus() === DRAWSTATUS.NONE) {
          this.setDrawStatus(DRAWSTATUS.PROCESS);
          this.save();
          this._updateStyle();
          this._render(context);
          this.restore();
        }
      }
      this.setDrawStatus(DRAWSTATUS.DONE);
    }
  }

  _updateStyle() {
    for (let prop of this._storeProps) {
      context[prop] = this[prop];
    }
  }

  /**
   * 转为字符串展示
   * @returns {string}
   */
  toString() {
    return `${this.getType()}Graphics geomerty=${this.getGeomerty().toString()}`;
  }
}
