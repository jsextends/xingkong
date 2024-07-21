import PointGeometry from "./point";

export default class RectGeometry {

    /**
     * @property {PointGeometry} leftTopPoint 矩形的左上角点
     */
    leftTopPoint = null

    /**
     * @property {Number} width 矩形的宽度
     */
    width = 0;

    /**
     * @property {Number} width 矩形的高度
     */
    height = 0;

    constructor(x, y, width, height) {
        this.leftTopPoint = new PointGeometry(x, y)
        this.setSize(width, height)
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * 获取矩形的高度
     * @returns {Number}
     */
    getWidth() {
        return this.width
    }

    /**
     * 获取矩形的高度
     * @returns {Number}
     */
    getHeight() {
        return this.height
    }

    /**
     * 获取矩形的左上角坐标
     * @returns {PointGeometry}
     */
    getLTPoint() {
        return this.leftTopPoint;
    }

    /**
     * 获取矩形的左下角坐标
     * @returns {PointGeometry}
     */
    getLBPoint() {
        return this.leftTopPoint.clone().offset(0, this.getHeight())
    }

    /**
     * 获取矩形的右上角坐标
     * @returns {PointGeometry}
     */
    getRTPoint() {
        return this.leftTopPoint.clone().offset(this.getWidth(), 0)
    }

    /**
     * 获取矩形的右下角坐标
     * @returns {PointGeometry}
     */
    getRBPoint() {
        return this.leftTopPoint.clone().offset(this.getWidth(), this.getHeight())
    }

    /**
     * 获取矩形的中心坐标
     * @returns {PointGeometry}
     */
    getCenter() {
        return this.leftTopPoint.clone().offset(this.getWidth() / 2, this.getHeight() / 2)
    }

    /**
     * 从一个矩形复制
     * @param {RectGeometry} rect 
     */
    copy(rect) {
        this.leftTopPoint.setValue(rectangle.x, rect.y)
        this.setSize(rect.width, rect.height)
    };

    /**
     * 复制一个矩形数据
     * @returns {RectGeometry}
     */
    clone() {
        return new RectGeometry(this.x, this.y, this.width, this.height);
    };

    toString() {
        return "[Rect width=" + this.width + " height=" + this.height + "]";
    };
}