import { Vec2 } from "@jsextends/matrixjs";

export default class RingGeometry {
  /**
   * @property {Vec2} _center 圆环圆心坐标
   */
  _center = null;

  /**
   * @property {Number} _innerRadius 圆环的内半径
   */
  _innerRadius = 0;

  /**
   * @property {Number} _outerRadius 圆环的外半径
   */
  _outerRadius = 0;

  /**
   * 创建一个圆环
   * @param {Number} x 圆心x轴坐标
   * @param {Number} y 圆心y轴坐标
   * @param {Number} innerRadius 圆环内半径
   * @param {Number} outerRadius 圆环外半径
   */
  constructor(x, y, innerRadius, outerRadius) {
    this._center = Vec2.fromValues(x, y);
    this.setInnerRadius(innerRadius);
    this.setOuterRadius(outerRadius);
  }

  static fromVec2(vec2, innerRadius, outerRadius){
    return new RingGeometry(vec2.get("x"), vec2.get("y"), innerRadius, outerRadius)
  }

  /**
   * 设置圆环的内半径
   * @param {Nubmer} innerRadius
   */
  setInnerRadius(innerRadius) {
    this._innerRadius = innerRadius;
  }

  /**
   * 设置圆环的外半径
   * @param {Nubmer} outerRadius
   */
  setOuterRadius(outerRadius) {
    this._outerRadius = outerRadius;
  }

  /**
   * 获取圆环的外半径
   * @returns {Number}
   */
  getInnerRadius() {
    return this._innerRadius;
  }

  /**
   * 获取圆环的内半径
   * @returns {Number}
   */
  getOuterRadius() {
    return this._outerRadius;
  }

  /**
   * 获取圆的圆心坐标
   * @returns {Vec2}
   */
  getCenter() {
    return this._center;
  }

  /**
   * 设置圆心坐标
   * @param {Nubmer} x
   * @param {Nubmer} y
   */
  setCenter(x, y) {
    this._center.set(x, y);
  }

  setCenterWithVec2(vec2) {
    this._center.copy(vec2);
  }

   /**
   * 从一个圆环复制
   * @param {RingGeometry} ring
   */
   copy(ring) {
    this.setCenterWithVec2(ring.getCenter())
    this.setInnerRadius(ring.getInnerRadius())
    this.setOuterRadius(ring.getOuterRadius())
  }

  /**
   * 复制一个圆环数据
   * @returns {RingGeometry}
   */
  clone() {
    return RingGeometry.fromVec2(this.getCenter(), this.getInnerRadius(), this.getOuterRadius());
  }

  /**
   * 转为字符串
   * @returns {String}
   */
  toString() {
    return `[RingGeometry center=${this.getCenter().toString()} innerRadius=${this.getInnerRadius()} outerRadius=${this.getOuterRadius()}`;
  }
}
