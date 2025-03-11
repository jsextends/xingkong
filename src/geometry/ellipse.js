import { Vec2 } from "@jsextends/matrixjs";

export default class EllipseGeometry {
  /**
   * @property {Vec2} _center 椭圆心坐标
   */
  _center = null;

  /**
   * @property {Number} _majorRadius 椭圆的长半径
   */
  _majorRadius = 0;

  /**
   * @property {Number} _shortRadius 椭圆的短半径
   */
  _shortRadius = 0;

  /**
   * 创建一个椭圆
   * @param {Number} x 椭圆心x轴坐标
   * @param {Number} y 椭圆心y轴坐标
   * @param {Number} majorRadius 椭圆的长半径
   * @param {Number} shortRadius 椭圆的短半径
   * @param {String} [id] 椭圆的唯一标识
   */
  constructor(x, y, majorRadius, shortRadius) {
    this._center = Vec2.fromValues(x, y);
    this.setMajorRadius(majorRadius);
    this.setShortRadius(shortRadius);
  }

  /**
   *
   * @param {Vec2} vec2 椭圆心的二维坐标
   * @param {Number} majorRadius 椭圆的长半径
   * @param {Number} shortRadius 椭圆的短半径
   * @returns
   */
  static fromVec2(vec2, majorRadius, shortRadius) {
    return new EllipseGeometry(
      vec2.get("x"),
      vec2.get("y"),
      majorRadius,
      shortRadius
    );
  }

  /**
   * 设置椭圆圆心坐标
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
   * 获取椭圆的圆心坐标
   * @returns {Vec2}
   */
  getCenter() {
    return this._center;
  }

  /**
   * 设置椭圆的长半轴
   * @param {Number} majorRadius
   */
  setMajorRadius(majorRadius) {
    this._majorRadius = majorRadius;
  }

  /**
   * 获取椭圆的长半径
   * @returns {Number}
   */
  getMarjorRadius() {
    return this._majorRadius;
  }

  /**
   * 设置椭圆的短半径
   * @param {Number} shortRadius
   */
  setShortRadius(shortRadius) {
    this._shortRadius = shortRadius;
  }

  /**
   * 获取椭圆的短半径
   * @returns {Number}
   */
  getShortRadius() {
    return this._shortRadius;
  }

  /**
   * 从一个椭圆复制
   * @param {EllipseGeometry} rect
   */
  copy(ellipse) {
    this.setCenterWithVec2(ellipse.getCenter())
    this.setMajorRadius(ellipse.getMarjorRadius())
    this.setShortRadius(ellipse.getShortRadius())
  }

  /**
   * 复制一个椭圆数据
   * @returns {EllipseGeometry}
   */
  clone() {
    return EllipseGeometry.fromVec2(this.getCenter(), this.getMarjorRadius(), this.getShortRadius());
  }

  /**
   * 转换为字符串
   * @returns {String}
   */
  toString() {
    return `EllipseGeometry center=(${this.getCenter().get("x")}, ${this.getCenter().get("y")}) majorRadius=${this.majorRadius} shortRadius=${this.shortRadius}`;
  }
}
