export default class PointGeometry {
    /**
     * @property {Number} x 点的x位置
     * @default 0
     */
    x = 0;

    /**
     * @property {Number} y 点的y位置
     * @default 0
     */
    y = 0;

    /**
     * 创建一个二维坐标系上的点
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.setValue(x, y);
    }

    /**
     * 给点位设置坐标信息
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    setValue(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    };

    /**
     * 给坐标设置偏移值
     * @param {Number} dx 
     * @param {Number} dy 
     */
    offset(dx, dy) {
        this.x += dx;
        this.y += dy;
    };

    /** 
     * 将一对极坐标转换为笛卡尔点坐标。
     * @param {Number} len 极坐标对的长度坐标
     * @param {Number} angle 以弧度为单位的极对的角度
     * @return {Point}
     * @static
    */
    static polar(len, angle) {
        const pt = new Point();
        pt.x = len * Math.cos(angle);
        pt.y = len * Math.sin(angle);
        return pt;
    };

    /**
     * 在两个指定点之间确定一个点
     *
     * 参数' f '决定了新插值点相对于指定的两个端点的位置
     * @param {Point | Object} pt1 
     * @param {Point | Object} pt2 
     * @param {Number} f 参数' f '决定了新插值点相对于指定的两个端点的位置
     * @return {Point}
     * @static
    */
    static interpolate(pt1, pt2, f) {
        const pt = new Point();
        pt.x = pt2.x + f * (pt1.x - pt2.x);
        pt.y = pt2.y + f * (pt1.y - pt2.y);
        return pt;
    };

    /**
     * 复制point的坐标信息
     * @param {Point|Object} point 
     */
    copy(point) {
        this.x = point.x;
        this.y = point.y;
    };

    /**
     * 克隆一个Point
     * @returns {Point}
     */
    clone() {
        return new Point(this.x, this.y);
    };

    /**
     * 转化为字符串
     * @returns {String}
     */
    toString() {
        return "[PointGeometry (x=" + this.x + " y=" + this.y + ")]";
    };
}