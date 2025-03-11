import { Vec2 } from "@jsextends/matrixjs";

export default class SectorGeometry {
  /**
   * @property {Vec2} _center 扇形的圆心坐标
   */
  _center = null;

  /**
   * @property {Number} _radius 扇形的半径
   */
  _radius = 0;

  /**
   * @property {Number} _startAngle 扇形起始弧度值
   */
  _startAngle = 0;

  /**
   * @property {Number} _endAngle 扇形结束弧度值
   */
  _endAngle = 0;

  /**
   * @property {Boolean} _isClockwise 是否沿着顺时针方向绘制
   */
  _isClockwise = false;

  /**
   *
   * @param {Number} x 扇形的圆心x坐标
   * @param {Number} y 扇形的圆心y坐标
   * @param {Number} radius 扇形的半径
   * @param {Number} startAngle 扇形起始弧度值
   * @param {Number} endAngle 扇形结束弧度值
   * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
   */
  constructor(x, y, radius, startAngle, endAngle, isClockwise = false) {
    this._center = Vec2.fromValues(x, y);
    this.setRadius(radius);
    this.setStartAngle(startAngle);
    this.setEndAngle(endAngle);
    this.setClockWise(isClockwise);
  }

  static fromVec2(vec2, radius, startAngle, endAngle, isClockwise = false){
    return new SectorGeometry(vec2.get("x"), vec2.get("y"), radius, startAngle, endAngle, isClockwise)
  }

  /**
   * 设置是否沿着顺时针方向绘制
   * @param {Boolean} isClockwise
   */
  setClockWise(isClockwise) {
    this._isClockwise = !!isClockwise;
  }

  /**
   * 返回是否沿着顺时针方向绘制
   * @returns {Boolean}
   */
  getClockWise() {
    return this._isClockwise;
  }

  /**
   * 设置扇形起始弧度值
   * @param {Nubmer} radius
   */
  setStartAngle(startAngle) {
    this._startAngle = startAngle;
  }

  /**
   * 获取扇形起始弧度值
   * @returns {Number}
   */
  getStartAngle() {
    return this._startAngle;
  }

  /**
   * 设置扇形结束弧度值
   * @param {Nubmer} radius
   */
  setEndAngle(endAngle) {
    this._endAngle = endAngle;
  }

  /**
   * 获取扇形结束弧度值
   * @returns {Number}
   */
  getEndAngle() {
    return this._endAngle;
  }

  /**
   * 设置圆半径
   * @param {Nubmer} radius
   */
  setRadius(radius) {
    this._radius = radius;
  }

  /**
   * 获取圆的半径
   * @returns {Number}
   */
  getRadius() {
    return this._radius;
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
    this.center.set(x, y);
  }

  setCenterWithVec2(vec2) {
    this.center.copy(vec2);
  }

  /**
   * 从一个椭圆复制
   * @param {SectorGeometry} sector
   */
  copy(sector) {
    this.setCenterWithVec2(sector.getCenter());
    this.setRadius(sector.getRadius());
    this.setStartAngle(sector.getStartAngle());
    this.setEndAngle(sector.getEndAngle());
    this.setClockWise(sector.getClockWise());
  }

  /**
   * 复制一个椭圆数据
   * @returns {SectorGeometry}
   */
  clone() {
    return SectorGeometry.fromVec2(
      this.getRadius(),
      this.getStartAngle(),
      this.getEndAngle(),
      this.getClockWise()
    );
  }

  /**
   * 转换为字符串
   * @returns {String}
   */
  toString() {
    return `SectorGeometry center=(${this.getCenter().get(
      "x"
    )}, ${this.getCenter().get(
      "y"
    )}) radius=${this.getRadius()} startAngle=${this.getStartAngle()} endAngle=${this.getEndAngle()}`;
  }
}
