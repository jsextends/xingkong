import { Vec2 } from "@jsextends/matrixjs";

export default class LineGeometry {
  /**
   *  @property {Vec2} _startPoint 起点坐标
   */
  _startPoint = null;

  /**
   *  @property {Vec2} _endPoint 起点坐标
   */
  _endPoint = null;

  /**
   * 创建一个二维坐标系上的线段
   * @param {Vec2} start
   * @param {Vec2} end
   */
  constructor(start, end) {
    this.setStart(start);
    this.setEnd(end);
  }

  /**
   * 设置线段的起点坐标
   * @param {Vec2} point
   */
  setStart(point) {
    this._startPoint = point;
  }

  /**
   * 设置线段的终点坐标
   * @param {Vec2} point
   */
  setEnd(point) {
    this._endPoint = point;
  }

  /**
   * 获取线段的起点坐标
   * @returns {Vec2}
   */
  getStart() {
    return this._startPoint;
  }

  /**
   * 获取线段的终点坐标
   * @returns {Vec2}
   */
  getEnd() {
    return this._endPoint;
  }

  /**
   * 复制point的坐标信息
   * @param {PointGeometry|Vec2} point
   */
  copy(line) {
    this.set(line.getStart(), line.getEnd());
  }

  /**
   * 获取线段的长度
   * @returns {Number}
   */
  getLength() {
    return this.getStart().distance(this.getEnd());
  }

  /**
   * 获取直线的斜截式方程信息
   */
  getSlopeIntercept() {
    let result = { k: NaN, b: NaN, x: NaN, y: NaN };
    if (this.getStart().get("x") === this.getEnd().get("x")) {
      result.x = this.getStart().get("x");
    } else if (this.getStart().get("y") === this.getEnd().get("y")) {
      result.y = this.getStart().get("y");
    } else {
      const determinant = Mat2.fromValues(
        this.getStart().get("x"),
        this.getStart().get("y"),
        this.getEnd().get("x"),
        this.getEnd().get("y")
      ).determinant();
      if (determinant) {
        result.k =
          Mat2.fromValues(
            0,
            this.getStart().get("y"),
            0,
            this.getEnd().get("y")
          ).determinant() / determinant;
        result.b =
          Mat2.fromValues(
            this.getStart().get("x"),
            0,
            this.getEnd().get("x"),
            0
          ).determinant() / determinant;
      }
    }
    return result
  }

  /**
   * 克隆一个Point
   * @returns {PointGeometry}
   */
  clone() {
    return new LineGeometry(this.getStart(), this.getEnd());
  }

  /**
   * 转化为字符串
   * @returns {String}
   */
  toString() {
    return `[LineGeometry (${this.getStart().toString()},${this.getEnd.toString()})]`;
  }
}
