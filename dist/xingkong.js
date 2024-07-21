(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('nanoid')) :
    typeof define === 'function' && define.amd ? define(['exports', 'nanoid'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.xingkong = {}, global.nanoid));
})(this, (function (exports, nanoid) { 'use strict';

    class Layer{
        constructor(){
            
        }
    }

    class xingkong {
        constructor(){
            
        }
    }

    class PointGeometry {
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

    class CircleGeometry {

        /**
         * @property {PointGeometry} center 圆心坐标
         */
        center = null

        /**
         * @property {Number} radius 圆的半径
         */
        radius = 0

        /**
         * 创建一个圆形
         * @param {Number} x 圆心x轴坐标
         * @param {Number} y 圆心y轴坐标
         * @param {Number} radius 圆的半径
         */
        constructor(x, y, radius) {
            this.center = new PointGeometry(x, y);
            this.setRadius(radius);
        }

        /**
         * 设置圆半径
         * @param {Nubmer} radius 
         */
        setRadius(radius) {
            this.radius = radius;
        }

        /**
         * 获取圆的半径
         * @returns {Number}
         */
        getRadius(){
            return this.radius
        }

        /**
         * 获取圆的圆心坐标
         * @returns {PointGeometry}
         */
        getCenter() {
            return this.center;
        }

        /**
         * 设置圆心坐标
         * @param {Nubmer} x 
         * @param {Nubmer} y 
         */
        setCenter(x, y) {
            this.center.setValue(x, y);
        }

        /**
         * 转为字符串
         * @returns {String}
         */
        toString() {
            return `[CircleGeometry center=${this.getCenter().toString()} radius=${this.radius}]`
        }
    }

    class EllipseGeometry{

        /**
         * @property {PointGeometry} center 椭圆心坐标
         */
        center = null

        /**
         * @property {Number} majorRadius 椭圆的长半径
         */
        majorRadius = 0

        /**
         * @property {Number} shortRadius 椭圆的短半径
         */
        shortRadius = 0


        /**
         * 创建一个椭圆 
         * @param {Number} x 椭圆心x轴坐标
         * @param {Number} y 椭圆心y轴坐标
         * @param {Number} majorRadius 椭圆的长半径
         * @param {Number} shortRadius 椭圆的短半径
         * @param {String} [id] 椭圆的唯一标识
         */
        constructor(x, y, majorRadius, shortRadius) {
            this.center = new PointGeometry(x, y);
            this.majorRadius = majorRadius;
            this.shortRadius = shortRadius;
        }

        /**
         * 设置椭圆圆心坐标
         * @param {Nubmer} x 
         * @param {Nubmer} y 
         */
        setCenter(x, y) {
            this.center.setValue(x, y);
        }

        /**
         * 获取椭圆的圆心坐标
         * @returns {PointGeometry}
         */
        getCenter() {
            return this.center;
        }

        /**
         * 设置椭圆的长半轴
         * @param {Number} majorRadius 
         */
        setMajorRadius(majorRadius) {
            this.majorRadius = majorRadius;
        }

        /**
         * 获取椭圆的长半径
         * @returns {Number}
         */
        getMarjorRadius() {
            return this.majorRadius
        }

        /**
         * 设置椭圆的短半径
         * @param {Number} shortRadius 
         */
        setShortRadius(shortRadius) {
            this.shortRadius = shortRadius;
        }

        /**
         * 获取椭圆的短半径
         * @returns {Number}
         */
        getShortRadius() {
            return this.shortRadius;
        }

        /**
         * 转换为字符串
         * @returns {String}
         */
        toString() {
            return `[type=${this.getType()} center=${this.getCenter().toString()} majorRadius=${this.majorRadius} shortRadius=${this.shortRadius}]`
        }
    }

    class RectGeometry {

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
            this.leftTopPoint = new PointGeometry(x, y);
            this.setSize(width, height);
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
            this.leftTopPoint.setValue(rectangle.x, rect.y);
            this.setSize(rect.width, rect.height);
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

    class RingGeometry{
        /**
         * @property {PointGeometry} center 圆环圆心坐标
         */
        center = null

        /**
         * @property {Number} innerRadius 圆环的内半径
         */
        innerRadius = 0

        /**
         * @property {Number} outerRadius 圆环的外半径
         */
        outerRadius = 0

        /**
         * 创建一个圆形
         * @param {Number} x 圆心x轴坐标
         * @param {Number} y 圆心y轴坐标
         * @param {Number} radius 圆的半径
         */
        constructor(x, y, innerRadius, outerRadius) {
            this.center = new PointGeometry(x, y);
            this.setInnerRadius(innerRadius);
            this.setOuterRadius(outerRadius);
        }

        /**
         * 设置圆环的内半径
         * @param {Nubmer} innerRadius 
         */
        setInnerRadius(innerRadius) {
            this.radius = innerRadius;
        }

        /**
         * 设置圆环的外半径
         * @param {Nubmer} outerRadius 
         */
        setOuterRadius(outerRadius) {
            this.outerRadius = outerRadius;
        }

        /**
         * 获取圆环的外半径
         * @returns {Number}
         */
        getInnerRadius(){
            return this.innerRadius
        }

        /**
         * 获取圆环的内半径
         * @returns {Number}
         */
        getOuterRadius(){
            return this.outerRadius
        }

        /**
         * 获取圆的圆心坐标
         * @returns {PointGeometry}
         */
        getCenter() {
            return this.center;
        }

        /**
         * 设置圆心坐标
         * @param {Nubmer} x 
         * @param {Nubmer} y 
         */
        setCenter(x, y) {
            this.center.setValue(x, y);
        }

        /**
         * 转为字符串
         * @returns {String}
         */
        toString() {
            return `[RingGeometry center=${this.getCenter().toString()} radius=${this.radius}]`
        }
    }

    class SectorGeometry{

        /**
         * @property {PointGeometry} center 扇形的圆心坐标
         */
        center = null

        /**
         * @property {Number} radius 扇形的半径
         */
        radius = 0

        /**
         * @property {Number} radius 扇形起始弧度值
         */
        startAngle = 0;

        /**
         * @property {Number} radius 扇形结束弧度值
         */
        endAngle = 0;

        /**
         * @property {Number} radius 是否沿着顺时针方向绘制
         */
        isClockwise = false;

        /**
         * 
         * @param {Number} x 扇形的圆心x坐标
         * @param {Number} y 扇形的圆心y坐标
         * @param {Number} radius 扇形的半径
         * @param {Number} startAngle 扇形起始弧度值
         * @param {Number} endAngle 扇形结束弧度值
         * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
         */
        constructor(x, y , radius, startAngle, endAngle, isClockwise = false){
            this.center = new PointGeometry(x,y);
            this.setRadius(radius);
            this.setStartAngle(startAngle);
            this.setEndAngle(endAngle);
            this.setClockWise(isClockwise);
        }

        /**
         * 设置是否沿着顺时针方向绘制
         * @param {Boolean} isClockwise 
         */
        setClockWise(isClockwise){
            this.isClockwise = isClockwise;
        }

        /**
         * 返回是否沿着顺时针方向绘制
         * @returns {Boolean}
         */
        getClockWise(){
            return this.isClockwise
        }

        /**
         * 设置扇形起始弧度值
         * @param {Nubmer} radius 
         */
         setStartAngle(startAngle) {
            this.startAngle = startAngle;
        }

        /**
         * 获取扇形起始弧度值
         * @returns {Number}
         */
        getStartAngle(){
            return this.startAngle
        }

         /**
         * 设置扇形结束弧度值
         * @param {Nubmer} radius 
         */
         setEndAngle(endAngle) {
            this.endAngle = endAngle;
        }

        /**
         * 获取扇形结束弧度值
         * @returns {Number}
         */
        getEndAngle(){
            return this.endAngle
        }

        /**
         * 设置圆半径
         * @param {Nubmer} radius 
         */
        setRadius(radius) {
            this.radius = radius;
        }

        /**
         * 获取圆的半径
         * @returns {Number}
         */
        getRadius(){
            return this.radius
        }

        /**
         * 获取圆的圆心坐标
         * @returns {PointGeometry}
         */
        getCenter() {
            return this.center;
        }

        /**
         * 设置圆心坐标
         * @param {Nubmer} x 
         * @param {Nubmer} y 
         */
        setCenter(x, y) {
            this.center.setValue(x, y);
        }
    }

    class Base {
        /**
         * @property {CanvasRenderingContext2D.direction} direction 属性用来在绘制文本时，描述当前文本方向
         * @default inherit
         */
        direction = "inherit"

        /**
         * @property {String|CanvasGradient|CanvasPattern} fillStyle 填充颜色
         * @default #000
         */
        fillStyle = "#000"

        /**
         * @property {String} font 当前字体样式的属性
         * @default '10px sans-serif'
         */
        font = "10px sans-serif"

        /**
         * @property {Number} globalAlpha 设置图形和图片透明度的属性
         * @default 1
         */
        globalAlpha  = 1

        /**
         * @property {CanvasRenderingContext2D.globalCompositeOperation} globalCompositeOperation 在绘制新形状时应用的合成操作的类型
         * @default source-over 
         */
        globalCompositeOperation = "source-over"

        /**
         * @property {CanvasRenderingContext2D.lineCap} lineCap 如何绘制每一条线段末端的属性
         * @default butt
         */
        lineCap = 'butt'

        /**
         * @property {CanvasRenderingContext2D.lineJoin} lineJoin 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
         * @default miter 
         */
        lineJoin = "miter"

        /**
         * @property {Number} lineWidth 线段的宽度
         * @default 1 
         */
        lineWidth = 1

         /**
         * @property {Number} miterLimit 斜接面限制比例
         * @default 1 
         */
        miterLimit = 10

        /**
         * @property {CanvasRenderingContext2D.textAlign} textAlign 文本的对齐方式
         * @default start
         */
        textAlign = 'start'

        /**
         * @property {CanvasRenderingContext2D.textBaseline} textBaseline 当前文本基线
         * @default start
         */
        textBaseline = "alphabetic"

        /**
         * @property {String} text 图形的类型
         */
        type = ""

        /**
         *  @property {String} text 图形的唯一标识
         */
        id = "" 

        /**
         * 图形类的基类, 抽象类，不能直接new
         * @param {String} type 图形的类型
         * @param {String} id 图形的唯一标识
         */
        constructor(type, id){
            this.type = type;
            this.id = id || nanoid.nanoid();
        }

        /**
         * 返回图形的类型
         * @returns {String}
         */
        getType(){
            return this.type
        }

        /**
         * 返回属性的唯一标识
         * @returns {String}
         */
        getId(){
            return this.id
        }
    }

    class CircleGraphics extends Base {

        /**
         * @property {CircleGeometry} 图形的几何对象
         */
        geom = null

        /**
         * 创建一个圆形
         * @param {Number} x 圆心x轴坐标
         * @param {Number} y 圆心y轴坐标
         * @param {Number} radius 圆的半径
         * @param {String} [id] 椭圆的唯一标识
         */
        constructor(x, y, radius) {
            super("Circle", id);
            this.geom = new CircleGeometry(x, y, radius);
        }
    }

    class EllipseGraphics extends Base {

        /**
         * @property {EllipseGeometry} geom 图形的几何对象
         */
        geom = null

        /**
         * 创建一个椭圆 
         * @param {Number} x 椭圆心x轴坐标
         * @param {Number} y 椭圆心y轴坐标
         * @param {Number} majorRadius 椭圆的长半径
         * @param {Number} shortRadius 椭圆的短半径
         * @param {String} [id] 椭圆的唯一标识
         */
        constructor(x, y, majorRadius, shortRadius, id) {
            super("ellipse", id);
            this.geom = new EllipseGeometry(x, y, majorRadius, shortRadius);
        }
    }

    class RectGraphics extends Base {

        /**
         * @property {RectGeometry} geom 图形的几何对象
         */
        geom = null

        /**
         * 
         * @param {Number} x 矩形左上角点x轴坐标
         * @param {Number} y 矩形左上角点y轴坐标
         * @param {Number} width 矩形的宽度
         * @param {Number} height 矩形的高度
         * @param {String} [id] 矩形的唯一标识
         */
        constructor(x, y, width, height, id) {
            super("rect", id);
            this.geom = new RectGeometry(x, y, width, height);
        }
    }

    class Ring extends Base {

        /**
         * @property {RingGeometry} geom 图形的几何对象
         */
        geom = null

        /**
         * 
         * @param {Number} x 矩形左上角点x轴坐标
         * @param {Number} y 矩形左上角点y轴坐标
         * @param {Number} width 矩形的宽度
         * @param {Number} height 矩形的高度
         * @param {String} [id] 矩形的唯一标识
         */
        constructor(x, y , radius, startAngle, endAngle, isClockwise, id) {
            super("Sector", id);
            this.geom = new RingGeometry(x, y , radius, startAngle, endAngle, isClockwise);
        }
    }

    class SectorGraphics extends Base {

        /**
         * @property {SectorGeometry} geom 图形的几何对象
         */
        geom = null

        /**
         * 构建一个扇形
         * @param {Number} x 扇形的圆心x坐标
         * @param {Number} y 扇形的圆心y坐标
         * @param {Number} radius 扇形的半径
         * @param {Number} startAngle 扇形起始弧度值
         * @param {Number} endAngle 扇形结束弧度值
         * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
         * @param {String} [id] 矩形的唯一标识
         */
        constructor(x, y, radius, startAngle, endAngle, isClockwise, id) {
            super("rect", id);
            this.geom = new SectorGeometry(x, y, radius, startAngle, endAngle, isClockwise);
        }
    }

    exports.CircleGeometry = CircleGeometry;
    exports.CircleGraphics = CircleGraphics;
    exports.EllipseGeometry = EllipseGeometry;
    exports.EllipseGraphics = EllipseGraphics;
    exports.Layer = Layer;
    exports.RectGeometry = RectGeometry;
    exports.RectGraphics = RectGraphics;
    exports.RingGeometry = RingGeometry;
    exports.RingGraphics = Ring;
    exports.SectorGeometry = SectorGeometry;
    exports.SectorGraphics = SectorGraphics;
    exports.default = xingkong;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
