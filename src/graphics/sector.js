
import SectorGeometry from "../geometry/sector";
import Base from "./base";

export default class SectorGraphics extends Base {

    /**
     * @property {SectorGeometry} geom 图形的几何对象
     */
    geom = null

    /**
     * 构建一个扇形
     * @param {Number} x 扇形的圆心x坐标
     * @param {Number} y 扇形的圆心y坐标
     * @param {Number} radius 扇形的半径
     * @param {Number} startAngle 扇形起始弧度值
     * @param {Number} endAngle 扇形结束弧度值
     * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
     * @param {String} [id] 矩形的唯一标识
     */
    constructor(x, y, radius, startAngle, endAngle, isClockwise, id) {
        super("rect", id)
        this.geom = new SectorGeometry(x, y, radius, startAngle, endAngle, isClockwise)
    }
}