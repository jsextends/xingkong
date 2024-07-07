/** Class Rectangle */
export default class Rectangle {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        this.setValues(x, y, width, height);
    }

    setValues(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };

    /**
     * 扩展矩形的边界以包含所描述的点或矩形。
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
	extend(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        if (x + width > this.x + this.width) { this.width = x + width - this.x; }
        if (y + height > this.y + this.height) { this.height = y + height - this.y; }
        if (x < this.x) { this.width += this.x - x; this.x = x; }
        if (y < this.y) { this.height += this.y - y; this.y = y; }
    };

	/** 
	 * 将指定的内边距添加到矩形的边界。
	 * @param {Number} top
	 * @param {Number} left
	 * @param {Number} bottom
	 * @param {Number} right
	*/
	pad(top, left, bottom, right) {
        this.x -= left;
        this.y -= top;
        this.width += left + right;
        this.height += top + bottom;
    };

	copy(rectangle) {
        return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };

	/** 
	 * 如果此矩形完全包含所描述的点或矩形，则返回true。
	 * @param {Number} x 
	 * @param {Number} y
	 * @param {Number} [width=0] 
	 * @param {Number} [height=0] 
	 * @return {Boolean} 
	*/
	contains(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        return (x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height);
    };

	/** 
	 * 返回一个包含此矩形和指定矩形的新矩形。
	 * @param {Rectangle} rect 
	 * @return {Rectangle}
	*/
	union(rect) {
        return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
    };

	/** 
	 * 返回一个新矩形，该矩形描述该矩形与指定矩形的交点(重叠)
	 * @param {Rectangle} rect
	 * @return {Rectangle}
	*/
	intersection(rect) {
        var x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height;
        if (this.x > x1) { x1 = this.x; }
        if (this.y > y1) { y1 = this.y; }
        if (this.x + this.width < x2) { x2 = this.x + this.width; }
        if (this.y + this.height < y2) { y2 = this.y + this.height; }
        return (x2 <= x1 || y2 <= y1) ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
    };

	/** 
	 * 如果指定的矩形与此矩形相交(有任何重叠)，则返回true。
	 * @param {Rectangle} rect
	 * @return {Boolean}
	*/
	intersects(rect) {
        return (rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height);
    };

	isEmpty() {
        return this.width <= 0 || this.height <= 0;
    };

	clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    
	toString() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
    };
}