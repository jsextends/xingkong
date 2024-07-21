
import RingGeometry from "../geometry/ring";
import Base from "./base";

export default class Ring extends Base {

    /**
     * @property {RingGeometry} geom 图形的几何对象
     */
    geom = null

    /**
     * 
     * @param {Number} x 矩形左上角点x轴坐标
     * @param {Number} y 矩形左上角点y轴坐标
     * @param {Number} width 矩形的宽度
     * @param {Number} height 矩形的高度
     * @param {String} [id] 矩形的唯一标识
     */
    constructor(x, y , radius, startAngle, endAngle, isClockwise, id) {
        super("Sector", id)
        this.geom = new RingGeometry(x, y , radius, startAngle, endAngle, isClockwise)
    }
}