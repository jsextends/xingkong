import Matrix2D from "./Matrix2D";
/**
 * Class DisplayProps
 */
export default class DisplayProps{

	/**
	 * @property {Boolean} visible 表明显示对象的可见值
	 * @default true
	 */
    visible = true;

	/**
	 * @property {Number} alpha 表明显示对象的alpha值
	 * @default true
	 */
    alpha = 1;

	/**
	 * @property {Shadow} shadow 表明显示对象的阴影
	 */
    shadow = null;

	/**
     * @property {CanvasRenderingContext2D.globalCompositeOperation} compositeOperation 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
     * @see  {@link https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation|globalCompositeOperation}
     */
    compositeOperation = null;

	/**
	 * @property {Matrix2D} matrix 应用于显示对象的转换矩阵
	 */
    matrix = null

    /**
	 * 用于计算和封装与显示相关的属性
	 * @param {Number} [visible=true] 表明显示对象的可见值
	 * @param {Number} [alpha=1] 表明显示对象的alpha值
	 * @param {Number} [shadow=null] 表明显示对象的阴影
	 * @param {Number} [compositeOperation=null] 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
	 * @param {Matrix2D} [matrix=null] 应用于显示对象的转换矩阵
	 */
    constructor(visible = true, alpha = 1, shadow = null, compositeOperation = null, matrix = null){
        this.setValues(visible, alpha, shadow, compositeOperation, matrix);
    }
	
	/**
	 * 使用指定的值重新初始化实例
	 * @param {Number} visible 表明显示对象的可见值
	 * @param {Number} alpha 表明显示对象的alpha值
	 * @param {Number} shadow 表明显示对象的阴影
	 * @param {Number} compositeOperation 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
	 * @param {Matrix2D} matrix 应用于显示对象的转换矩阵
	 */
    setValues(visible, alpha, shadow, compositeOperation, matrix) {
		this.visible = visible == null ? true : !!visible;
		this.alpha = alpha == null ? 1 : alpha;
		this.shadow = shadow;
		this.compositeOperation = compositeOperation;
		this.matrix = matrix || (this.matrix&&this.matrix.identity()) || new Matrix2D();
	};
	
	/**
	 * 附加指定的显示属性
	 * @param {Number} visible 表明显示对象的可见值
	 * @param {Number} alpha 表明显示对象的alpha值
	 * @param {Number} shadow 表明显示对象的阴影
	 * @param {Number} compositeOperation 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
	 * @param {Matrix2D} matrix 应用于显示对象的转换矩阵
	 */
    append(visible, alpha, shadow, compositeOperation, matrix) {
		this.alpha *= alpha;
		this.shadow = shadow || this.shadow;
		this.compositeOperation = compositeOperation || this.compositeOperation;
		this.visible = this.visible && visible;
		matrix&&this.matrix.appendMatrix(matrix);
	};
	
	/**
	 * 添加指定的显示属性
	 * @param {Number} visible 表明显示对象的可见值
	 * @param {Number} alpha 表明显示对象的alpha值
	 * @param {Number} shadow 表明显示对象的阴影
	 * @param {Number} compositeOperation 复合操作指示如何将该显示对象的像素与其后面的元素组合在一起
	 * @param {Matrix2D} matrix 应用于显示对象的转换矩阵
	 */
	prepend(visible, alpha, shadow, compositeOperation, matrix) {
		this.alpha *= alpha;
		this.shadow = this.shadow || shadow;
		this.compositeOperation = this.compositeOperation || compositeOperation;
		this.visible = this.visible && visible;
		matrix&&this.matrix.prependMatrix(matrix);
	};
	
	/**
	 * 将此实例及其矩阵重置为默认值
	 */
	identity() {
		this.visible = true;
		this.alpha = 1;
		this.shadow = this.compositeOperation = null;
		this.matrix.identity();
	};
	
	/**
	 * 克隆当前的DisplayProps
	 * @returns {DisplayProps}
	 */
	clone() {
		return new DisplayProps(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone());
	};
}