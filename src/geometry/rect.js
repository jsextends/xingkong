import { Vec2 } from "@jsextends/matrixjs";

export default class RectGeometry {
  /**
   * @property {Vec2} _ltPoint 矩形的左上角点
   */
  _ltPoint = null;

  /**
   * @property {Vec2} _lbPoint 矩形的左下角点
   */
  _lbPoint = null;

  /**
   * @property {Vec2} _rtPoint 矩形的右上角点
   */
  _rtPoint = null;

  /**
   * @property {Vec2} _rbPoint 矩形的右下角点
   */
  _rbPoint = null;

  /**
   * @property {Vec2} _centerPoint 矩形的中心点
   */
  _centerPoint = null;

  /**
   * @property {Number} _width 矩形的宽度
   */
  _width = 0;

  /**
   * @property {Number} _height 矩形的高度
   */
  _height = 0;

  constructor(x, y, width, height) {
    this._ltPoint = Vec2.fromValues(x, y);
    this._lbPoint = new Vec2();
    this._rbPoint = new Vec2();
    this._rtPoint = new Vec2();
    this._centerPoint = new Vec2();
    this.setSize(width, height);
  }

  static fromPointsVec2(leftTopPoint, rightBottomPoint){
    const w = Math.abs(rightBottomPoint.get("x") - leftTopPoint.get("x"))
    const h = Math.abs(rightBottomPoint.get("y") - leftTopPoint.get("y"))
    return RectGeometry.fromPointVec2(leftTopPoint, w, h)
  }

  static fromPointVec2(leftTopPoint, width, height){
    const result = new RectGeometry(leftTopPoint.get("x"), leftTopPoint.get("y"), width, height);
    return result
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
    this._lbPoint = this._ltPoint.clone().add(Vec2.fromValues(0, -this._height));
    this._rtPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width, 0));
    this._rbPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width, -this._height));
    this._centerPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width / 2, -this._height / 2));
  }

  /**
   * 获取矩形的高度
   * @returns {Number}
   */
  getWidth() {
    return this._width;
  }
  
  setWidth(width){
    this._width = width;
    this._rtPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width, 0));
    this._rbPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width, -this._height));
    this._centerPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width / 2, -this._height / 2));
  }

  /**
   * 获取矩形的高度
   * @returns {Number}
   */
  getHeight() {
    return this._height;
  }

  setHeight(height){
    this._height = height;
    this._lbPoint = this._ltPoint.clone().add(Vec2.fromValues(0, -this._height));
    this._rbPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width, -this._height));
    this._centerPoint = this._ltPoint.clone().add(Vec2.fromValues(this._width / 2, -this._height / 2));
  }

  /**
   * 获取矩形的左上角坐标
   * @returns {Vec2}
   */
  getLeftTopPoint() {
    return this._ltPoint;
  }

  /**
   * 获取矩形的左下角坐标
   * @returns {Vec2}
   */
  getLeftBottomPoint() {
    return this._lbPoint;
  }

  /**
   * 获取矩形的右上角坐标
   * @returns {Vec2}
   */
  getRightTopPoint() {
    return this._rtPoint;
  }

  /**
   * 获取矩形的右下角坐标
   * @returns {Vec2}
   */
  getRightBottomPoint() {
    return this._rbPoint;
  }

  /**
   * 获取矩形的中心坐标
   * @returns {Vec2}
   */
  getCenter() {
    return this._centerPoint;
  }

  getArea(){
    return this.getHeight() * this.getWidth();
  }

  getPerimeter(){
    return 2 * (this.getWidth() + this.getHeight())
  }

  /**
   * 从一个矩形复制
   * @param {RectGeometry} rect
   */
  copy(rect) {
    this._ltPoint.copy(rect.getLeftTopPoint())
    this.setSize(rect.getWidth(), rect.getHeight());
  }

  /**
   * 复制一个矩形数据
   * @returns {RectGeometry}
   */
  clone() {
    return RectGeometry.fromPointsVec2(this.getLeftTopPoint().clone(), this.getRightBottomPoint().clone())
  }

  toString() {
    return "[Rect width=" + this.width + " height=" + this.height + "]";
  }
}
