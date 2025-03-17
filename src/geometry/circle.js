import { Vec2, Common } from "@jsextends/matrixjs";
import RectGeometry from "./rect";
import { POINTPOSITION } from "../common/relation";
import LineGeometry from "./line";

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
  static fromVec2(Vec2, radius) {
    const result = new CircleGeometry(1, 1, 1);
    result._center.copy(Vec2);
    result.setRadius(radius);
    return result;
  }

  /**
   * 设置圆心坐标
   * @param {Number} x
   * @param {Number} y
   */
  setCenter(x, y) {
    this._center.set(x, y);
  }

  /**
   * 设置圆心坐标使用二维向量
   * @param {Vec2} vec2
   */
  setCenterWithVec2(vec2) {
    this._center.copy(vec2);
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
   * 获取圆心坐标
   * @returns {Vec2}
   */
  getCenter() {
    return this._center;
  }

  /**
   * 获取圆的直接
   * @returns {Number}
   */
  getDiameter() {
    return 2 * this.getRadius();
  }

  /**
   * 获取面积
   * @returns {Number}
   */
  getArea() {
    return Math.PI * this.getRadius() * this.getRadius();
  }

  /**
   * 获取周长
   * @returns {Number}
   */
  getPerimeter() {
    return 2 * Math.PI * this.getRadius();
  }

  /**
   * 获取外接矩形
   * @returns {RectGeometry}
   */
  getExteriorRect() {
    const w = this.getDiameter();
    return RectGeometry.fromPointVec2(
      this.getCenter().subtract(
        Vec2.fromValues(this.getRadius(), -this.getRadius())
      ),
      w,
      w
    );
  }

  /**
   * 判断点与圆的关系
   * @param {PointGeometry} point
   * @param {Boolean} isabsolute 是绝对相等还是相对相等
   * @returns {POINTPOSITION}
   * }
   */
  getPointPosition(point, isAbsolute = true) {
    let distance = this.getCenter().squaredDistance(point.getPoint());
    if (!isAbsolute) {
      distance = Common.equals(distance, 0);
    }
    if (distance > 0) {
      return POINTPOSITION.OUTER;
    } else if (distance < 0) {
      return POINTPOSITION.INNER;
    } else {
      return POINTPOSITION.BORDER;
    }
  }

  /**
   * 判断直线与圆的位置关系
   * @param {LineGeometry} line
   * @param {Boolean} isabsolute 是绝对相等还是相对相等
   * @returns {POINTPOSITION}
   */
  getLinePosition(line, isAbsolute = true) {
    const normal = line.getNormal();
    const distance =
      (normal[0] * this.getCenter().get("x") +
        normal[1] * this.getCenter().get("y") +
        normal[2]) /
      Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    if (!isAbsolute) {
      distance = Common.equals(distance, 0);
    }
    if (distance > 0) {
      return POINTPOSITION.OUTER;
    } else if (distance < 0) {
      return POINTPOSITION.INNER;
    } else {
      return POINTPOSITION.BORDER;
    }
  }

  copy(circleGeometry) {
    this.setCenterWithVec2(circleGeometry.getCenter().clone());
    this.setRadius(circleGeometry.getRadius());
  }

  clone() {
    return CircleGeometry.fromVec2(this.getCenter().clone(), this.getRadius());
  }

  /**
   * 转为字符串
   * @returns {String}
   */
  toString() {
    return `[CircleGeometry center (${this.getCenter().get(
      "x"
    )},${this.getCenter().get("y")}) radius ${this.radius}]`;
  }
}
