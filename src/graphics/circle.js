import CircleGeometry from "../geometry/circle";
import Base from "./base";

export default class CircleGraphics extends Base {

    /**
     * @property {CircleGeometry} 图形的几何对象
     */
    geom = null

    /**
     * 创建一个圆形
     * @param {Number} x 圆心x轴坐标
     * @param {Number} y 圆心y轴坐标
     * @param {Number} radius 圆的半径
     * @param {String} [id] 椭圆的唯一标识
     */
    constructor(x, y, radius) {
        super("Circle", id);
        this.geom = new CircleGeometry(x, y, radius)
    }
}