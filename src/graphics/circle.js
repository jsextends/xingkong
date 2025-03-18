import { Vec2 } from "@jsextends/matrixjs";
import CircleGeometry from "../geometry/circle";
import Base from "./base";
import { DRAWSTATUS } from "../common/status";
import RectGeometry from "../geometry/rect";
import { RECTRELATION } from "../common/relation";

export default class CircleGraphics extends Base {
  /**
   * 创建一个圆形
   * @param {CircleGeometry} circleGeo 圆的几何形状
   * @param {String} [id] 圆的唯一标识
   */
  constructor(circleGeo, id) {
    super("Circle", id);
    this.setGeomerty(circleGeo);
  }

  /**
   * 创建一个圆形
   * @param {Number} x 圆心x轴坐标
   * @param {Number} y 圆心y轴坐标
   * @param {Number} radius 圆的半径
   * @param {String} [id] 圆的唯一标识
   */
  static fromValues() {
    return new CircleGraphics(
      new CircleGeometry(vec2.get("x"), vec2.get("y"), radius),
      id
    );
  }

  /**
   * 创建一个圆形
   * @param {Vec2} vec2
   * @param {Number} radius
   * @param {String} [id] 圆的唯一标识
   * @returns
   */
  static fromVec2(vec2, radius, id) {
    return new CircleGraphics(CircleGeometry.fromVec2(vec2, radius), id);
  }

  /**
   * 设置圆的几何形状
   * @param {CircleGeometry} circleGeo 圆的几何形状
   */
  setGeomerty(circleGeo) {
    this.geom = new CircleGeometry(circleGeo);
    this.setDrawStatus(DRAWSTATUS.NONE);
  }

  getVisible(context) {
    return (
      super.getVisible() &&
      this.getGeomerty().getRectRelation(
        RectGeometry.fromValues(
          0,
          0,
          context.canvas.width,
          context.canvas.height
        )
      ) !== RECTRELATION.SEPARATION
    );
  }

  _render() {}
}
