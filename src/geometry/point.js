import { Vec2 } from "@jsextends/matrixjs";

export default class PointGeometry{

  /**
   *  @property {Vec2} _point 点坐标
   */
  _point = null;

  /**
   * 创建一个二维坐标系上的点
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    this._point = new Vec2()
    this.setPoint(x, y);
  }

  static fromVec2(vec2){
    const result = new PointGeometry(1,1);
    result.setWithVec2(vec2)
    return result
  }

  getPoint(){
    return this._point
  }

  /**
   * 设置坐标值
   * @param {Number} x 
   * @param {Number} y 
   */
  setPoint(x, y){
    this._point.set(x, y)
  }

  setWithVec2(vec2){
    this._point.copy(vec2)
  }

  /**
   * 或者某个维度的坐标值
   * @param {String} axis 
   * @returns {Number}
   */
  get(axis){
    switch (axis) {
        case "x":
            return this._point.get("x")
        case "y":
            return this._point.get("y")
        default:
            throw Error("unknow axis")
    }
  }

  /**
   * 复制point的坐标信息
   * @param {PointGeometry|Vec2} point
   */
  copy(point) {
    this.set(point.get("x"), point.get("y"))
  }

  /**
   * 克隆一个Point
   * @returns {PointGeometry}
   */
  clone() {
    return new PointGeometry(this.get("x"), this.get("y"));
  }

  /**
   * 转化为字符串
   * @returns {String}
   */
  toString() {
    return `[PointGeometry (${this.getPoint().toString()})]`;
  }
}
