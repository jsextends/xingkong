import { Vec2 } from "@jsextends/matrixjs";

export default class CircleGeometry {
  /**
   * @property {Vec2} _center 圆心坐标
   */
  _center = null;

  /**
   * @property {Number} _radius 圆的半径
   */
  _radius = 0;

  /**
   * 创建一个圆形
   * @param {Number} x 圆心x轴坐标
   * @param {Number} y 圆心y轴坐标
   * @param {Number} radius 圆的半径
   */
  constructor(x, y, radius) {
    this._center = new Vec2();
    this.setCenter(x, y);
    this.setRadius(radius);
  }

  /**
   * 从一个二维向量和半径创建一个几何圆
   * @param {Vec2} Vec2 
   * @param {Number} radius 
   * @returns 
   */
  static fromVec2AndValue(Vec2, radius){
    const result = new CircleGeometry(1,1,1)
    result._center.copy(Vec2);
    result.setRadius(radius);
    return result;
  }

  /**
   * 设置圆心坐标
   * @param {Number} x 
   * @param {Number} y 
   */
  setCenter(x, y){
    this._center.set(x,y)
  }

  /**
   * 设置圆心坐标使用二维向量
   * @param {Vec2} vec2 
   */
  setCenterWithVec2(vec2){
    this._center.copy(vec2)
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
  getRadius() {
    return this.radius;
  }

  /**
   * 获取圆的圆心坐标
   * @returns {Vec2}
   */
  getCenter() {
    return this._center;
  }

  copy(circleGeometry){
    this.setCenterWithVec2(circleGeometry.getCenter().clone())
    this.setRadius(circleGeometry.getRadius())
  }

  clone(){
    return CircleGeometry.fromVec2AndValue(this.getCenter().clone(), this.getRadius())
  }

  /**
   * 转为字符串
   * @returns {String}
   */
  toString() {
    return `[CircleGeometry center (${this.getCenter().get("x")},${this.getCenter().get("y")}) radius ${this.radius}]`;
  }
}
