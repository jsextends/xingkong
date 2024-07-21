import PointGeometry from "./point";

export default class CircleGeometry {

    /**
     * @property {PointGeometry} center 圆心坐标
     */
    center = null

    /**
     * @property {Number} radius 圆的半径
     */
    radius = 0

    /**
     * 创建一个圆形
     * @param {Number} x 圆心x轴坐标
     * @param {Number} y 圆心y轴坐标
     * @param {Number} radius 圆的半径
     */
    constructor(x, y, radius) {
        this.center = new PointGeometry(x, y);
        this.setRadius(radius)
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

    /**
     * 转为字符串
     * @returns {String}
     */
    toString() {
        return `[CircleGeometry center=${this.getCenter().toString()} radius=${this.radius}]`
    }
}