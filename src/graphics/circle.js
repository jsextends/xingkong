import CircleGeometry from "../geometry/circle";
import Base from "./base";

export default class CircleGraphics extends Base {

    /**
     * 创建一个圆形
     * @param {Number} x 圆心x轴坐标
     * @param {Number} y 圆心y轴坐标
     * @param {Number} radius 圆的半径
     * @param {String} [id] 椭圆的唯一标识
     */
    constructor(x, y, radius, id) {
        super("Circle", id);
        this.setGeomerty(x, y, radius);
    }

    static fromVec2(vec2, radius, id){
        return new CircleGraphics(vec2.get("x"), vec2.get("y"), radius, id)
    }

    setGeomerty(x, y, radius){
        this.geom = new CircleGeometry(x, y, radius)
    }

    setGeomertyWithVec2(vec2, radius){
        this.geom = CircleGeometry.fromVec2(vec2, radius)
    }

    render(context){
        console.log(context)
    }
}