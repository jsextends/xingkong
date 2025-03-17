import LineGeometry from "../geometry/line";
import Base from "./base";

export default class LineGraphics extends Base {

    /**
     * @property {LineGeometry} geom 图形的几何对象
     */
    geom = null

    /**
     * 
     * @param {Vec2} start 矩形左上角点x轴坐标
     * @param {Vec2} end 矩形左上角点y轴坐标
     * @param {String} [id] 矩形的唯一标识
     */
    constructor(start, end, id) {
        super("rect", id)
        this.geom = new LineGeometry(start, end)
    }
}