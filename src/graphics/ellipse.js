import EllipseGeometry from "../geometry/ellipse";
import Base from "./base";

export default class EllipseGraphics extends Base {

    /**
     * @property {EllipseGeometry} geom 图形的几何对象
     */
    geom = null

    /**
     * 创建一个椭圆 
     * @param {Number} x 椭圆心x轴坐标
     * @param {Number} y 椭圆心y轴坐标
     * @param {Number} majorRadius 椭圆的长半径
     * @param {Number} shortRadius 椭圆的短半径
     * @param {String} [id] 椭圆的唯一标识
     */
    constructor(x, y, majorRadius, shortRadius, id) {
        super("ellipse", id)
        this.geom = new EllipseGeometry(x, y, majorRadius, shortRadius)
    }
}