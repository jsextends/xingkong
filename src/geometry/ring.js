import PointGeometry from "./point";

export default class RingGeometry{
    /**
     * @property {PointGeometry} center 圆环圆心坐标
     */
    center = null

    /**
     * @property {Number} innerRadius 圆环的内半径
     */
    innerRadius = 0

    /**
     * @property {Number} outerRadius 圆环的外半径
     */
    outerRadius = 0

    /**
     * 创建一个圆形
     * @param {Number} x 圆心x轴坐标
     * @param {Number} y 圆心y轴坐标
     * @param {Number} radius 圆的半径
     */
    constructor(x, y, innerRadius, outerRadius) {
        this.center = new PointGeometry(x, y);
        this.setInnerRadius(innerRadius)
        this.setOuterRadius(outerRadius)
    }

    /**
     * 设置圆环的内半径
     * @param {Nubmer} innerRadius 
     */
    setInnerRadius(innerRadius) {
        this.radius = innerRadius;
    }

    /**
     * 设置圆环的外半径
     * @param {Nubmer} outerRadius 
     */
    setOuterRadius(outerRadius) {
        this.outerRadius = outerRadius;
    }

    /**
     * 获取圆环的外半径
     * @returns {Number}
     */
    getInnerRadius(){
        return this.innerRadius
    }

    /**
     * 获取圆环的内半径
     * @returns {Number}
     */
    getOuterRadius(){
        return this.outerRadius
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
        return `[RingGeometry center=${this.getCenter().toString()} radius=${this.radius}]`
    }
}