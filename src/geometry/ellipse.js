import PointGeometry from "./point";

export default class EllipseGeometry{

    /**
     * @property {PointGeometry} center 椭圆心坐标
     */
    center = null

    /**
     * @property {Number} majorRadius 椭圆的长半径
     */
    majorRadius = 0

    /**
     * @property {Number} shortRadius 椭圆的短半径
     */
    shortRadius = 0


    /**
     * 创建一个椭圆 
     * @param {Number} x 椭圆心x轴坐标
     * @param {Number} y 椭圆心y轴坐标
     * @param {Number} majorRadius 椭圆的长半径
     * @param {Number} shortRadius 椭圆的短半径
     * @param {String} [id] 椭圆的唯一标识
     */
    constructor(x, y, majorRadius, shortRadius) {
        this.center = new PointGeometry(x, y)
        this.majorRadius = majorRadius;
        this.shortRadius = shortRadius
    }

    /**
     * 设置椭圆圆心坐标
     * @param {Nubmer} x 
     * @param {Nubmer} y 
     */
    setCenter(x, y) {
        this.center.setValue(x, y)
    }

    /**
     * 获取椭圆的圆心坐标
     * @returns {PointGeometry}
     */
    getCenter() {
        return this.center;
    }

    /**
     * 设置椭圆的长半轴
     * @param {Number} majorRadius 
     */
    setMajorRadius(majorRadius) {
        this.majorRadius = majorRadius
    }

    /**
     * 获取椭圆的长半径
     * @returns {Number}
     */
    getMarjorRadius() {
        return this.majorRadius
    }

    /**
     * 设置椭圆的短半径
     * @param {Number} shortRadius 
     */
    setShortRadius(shortRadius) {
        this.shortRadius = shortRadius
    }

    /**
     * 获取椭圆的短半径
     * @returns {Number}
     */
    getShortRadius() {
        return this.shortRadius;
    }

    /**
     * 转换为字符串
     * @returns {String}
     */
    toString() {
        return `[type=${this.getType()} center=${this.getCenter().toString()} majorRadius=${this.majorRadius} shortRadius=${this.shortRadius}]`
    }
}