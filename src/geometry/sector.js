import PointGeometry from "./point";

export default class SectorGeometry{

    /**
     * @property {PointGeometry} center 扇形的圆心坐标
     */
    center = null

    /**
     * @property {Number} radius 扇形的半径
     */
    radius = 0

    /**
     * @property {Number} radius 扇形起始弧度值
     */
    startAngle = 0;

    /**
     * @property {Number} radius 扇形结束弧度值
     */
    endAngle = 0;

    /**
     * @property {Number} radius 是否沿着顺时针方向绘制
     */
    isClockwise = false;

    /**
     * 
     * @param {Number} x 扇形的圆心x坐标
     * @param {Number} y 扇形的圆心y坐标
     * @param {Number} radius 扇形的半径
     * @param {Number} startAngle 扇形起始弧度值
     * @param {Number} endAngle 扇形结束弧度值
     * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
     */
    constructor(x, y , radius, startAngle, endAngle, isClockwise = false){
        this.center = new PointGeometry(x,y);
        this.setRadius(radius);
        this.setStartAngle(startAngle);
        this.setEndAngle(endAngle)
        this.setClockWise(isClockwise)
    }

    /**
     * 设置是否沿着顺时针方向绘制
     * @param {Boolean} isClockwise 
     */
    setClockWise(isClockwise){
        this.isClockwise = isClockwise;
    }

    /**
     * 返回是否沿着顺时针方向绘制
     * @returns {Boolean}
     */
    getClockWise(){
        return this.isClockwise
    }

    /**
     * 设置扇形起始弧度值
     * @param {Nubmer} radius 
     */
     setStartAngle(startAngle) {
        this.startAngle = startAngle;
    }

    /**
     * 获取扇形起始弧度值
     * @returns {Number}
     */
    getStartAngle(){
        return this.startAngle
    }

     /**
     * 设置扇形结束弧度值
     * @param {Nubmer} radius 
     */
     setEndAngle(endAngle) {
        this.endAngle = endAngle;
    }

    /**
     * 获取扇形结束弧度值
     * @returns {Number}
     */
    getEndAngle(){
        return this.endAngle
    }

    /**
     * 设置圆半径
     * @param {Nubmer} radius 
     */
    setRadius(radius) {
        this.radius = radius;
    }

    /**
     * 获取圆的半径
     * @returns {Number}
     */
    getRadius(){
        return this.radius
    }

    /**
     * 获取圆的圆心坐标
     * @returns {PointGeometry}
     */
    getCenter() {
        return this.center;
    }

    /**
     * 设置圆心坐标
     * @param {Nubmer} x 
     * @param {Nubmer} y 
     */
    setCenter(x, y) {
        this.center.setValue(x, y);
    }
}