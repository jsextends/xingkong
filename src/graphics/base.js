import { nanoid } from "nanoid"

export default class Base {
    /**
     * @property {CanvasRenderingContext2D.direction} direction 属性用来在绘制文本时，描述当前文本方向
     * @default inherit
     */
    direction = "inherit"

    /**
     * @property {String|CanvasGradient|CanvasPattern} fillStyle 填充颜色
     * @default #000
     */
    fillStyle = "#000"

    /**
     * @property {String} font 当前字体样式的属性
     * @default '10px sans-serif'
     */
    font = "10px sans-serif"

    /**
     * @property {Number} globalAlpha 设置图形和图片透明度的属性
     * @default 1
     */
    globalAlpha  = 1

    /**
     * @property {CanvasRenderingContext2D.globalCompositeOperation} globalCompositeOperation 在绘制新形状时应用的合成操作的类型
     * @default source-over 
     */
    globalCompositeOperation = "source-over"

    /**
     * @property {CanvasRenderingContext2D.lineCap} lineCap 如何绘制每一条线段末端的属性
     * @default butt
     */
    lineCap = 'butt'

    /**
     * @property {CanvasRenderingContext2D.lineJoin} lineJoin 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
     * @default miter 
     */
    lineJoin = "miter"

    /**
     * @property {Number} lineWidth 线段的宽度
     * @default 1 
     */
    lineWidth = 1

     /**
     * @property {Number} miterLimit 斜接面限制比例
     * @default 1 
     */
    miterLimit = 10

    /**
     * @property {CanvasRenderingContext2D.textAlign} textAlign 文本的对齐方式
     * @default start
     */
    textAlign = 'start'

    /**
     * @property {CanvasRenderingContext2D.textBaseline} textBaseline 当前文本基线
     * @default start
     */
    textBaseline = "alphabetic"

    /**
     * @property {String} text 图形的类型
     */
    type = ""

    /**
     *  @property {String} text 图形的唯一标识
     */
    id = "" 

    /**
     * 图形类的基类, 抽象类，不能直接new
     * @param {String} type 图形的类型
     * @param {String} id 图形的唯一标识
     */
    constructor(type, id){
        this.type = type;
        this.id = id || nanoid()
    }

    /**
     * 返回图形的类型
     * @returns {String}
     */
    getType(){
        return this.type
    }

    /**
     * 返回属性的唯一标识
     * @returns {String}
     */
    getId(){
        return this.id
    }
}