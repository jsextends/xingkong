/** 
 * Class Matrix2D
 * @description 表示仿射变换矩阵，并提供构造和连接矩阵的工具
*/
export default class Matrix2D {
    /**
     * 表示仿射变换矩阵，并提供构造和连接矩阵的工具
     * 
     * 这个矩阵可以可视化为:
     * 
	 * 	[ a  c  tx
	 * 	  b  d  ty
	 * 	  0  0  1  ]
	 * 
     * @constructor
     * @param {Number} [a=1] 指定新矩阵的a属性
	 * @param {Number} [b=0] 指定新矩阵的b属性
	 * @param {Number} [c=0] 指定新矩阵的c属性
	 * @param {Number} [d=1] 指定新矩阵的d属性
	 * @param {Number} [tx=0] 指定新矩阵的tx属性
	 * @param {Number} [ty=0] 指定新矩阵的y属性
     */
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0){
        this.setValues(a,b,c,d,tx,ty);
    }

    /**
     * @property {Number} a 在3x3仿射变换矩阵中的位置(0,0)。
	 * @default 1
     **/
    a = 1;

    /**
     * @property {Number} b 在3x3仿射变换矩阵中的位置(0,1)
     * @default 0
     **/
    b = 0

    /**
     * @property {Number} c 在3x3仿射变换矩阵中的位置(1,0)
     **/
    c = 0;

    /**
     * @property {Number} d 在3x3仿射变换矩阵中的位置(1,1)
     * @default 1
     **/
    d = 1;

    /**
     * @property {Number} tx 在3x3仿射变换矩阵中的位置(2,0)
     * @default 0
     **/
    tx = 0

    /**
     * @property {Number} ty 在3x3仿射变换矩阵中的位置(2,1)
     * @default 0
     **/ 
    ty = 0; 
    
    /**
	 * @property {Number }DEG_TO_RAD 将度数转换为弧度的乘数。由Matrix2D内部使用
     * @static
	 * @readonly
	 **/
    static DEG_TO_RAD = Math.PI/180;

    /**
	 * @property {Matrix2D} identity 单位矩阵，表示一个零变换
	 * @static
	 * @readonly
	 **/
	static identity = null;

     /**
     * 仿射变换矩阵设置具体的值
     * 
     * @param {Number} a 指定新矩阵的a属性.
	 * @param {Number} b 指定新矩阵的b属性.
	 * @param {Number} c 指定新矩阵的c属性.
	 * @param {Number} d 指定新矩阵的d属性.
	 * @param {Number} tx 指定新矩阵的tx属性.
	 * @param {Number} ty 指定新矩阵的y属性.
     */
    setValues(a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
	};

    /**
	 * 将指定的矩阵属性附加到此矩阵。所有参数都是必需的
	 * 这相当于乘以'当前矩阵A*制定矩阵B'。 
     * 
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} c
	 * @param {Number} d
	 * @param {Number} tx
	 * @param {Number} ty
	 **/
	append(a, b, c, d, tx, ty) {
		let a1 = this.a;
		let b1 = this.b;
		let c1 = this.c;
		let d1 = this.d;
        this.a = a1 * a + c1 * b;
        this.b = b1 * a + d1 * b; 
        this.c = a1 * c + c1 * d; 
        this.d = b1 * c + d1 * d;
        this.tx = a1 * tx + c1 * ty + this.tx * 1;
        this.ty = b1 * tx + d1 * ty + this.ty * 1
	};

    /**
	 * 将指定的矩阵属性添加到此矩阵。
	 * 这相当于乘以'制定矩阵B*当前矩阵A'。
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} c
	 * @param {Number} d
	 * @param {Number} tx
	 * @param {Number} ty
	 **/
	prepend(a, b, c, d, tx, ty) {
		let a1 = this.a;
		let c1 = this.c;
		let tx1 = this.tx;
		this.a  = a * a1 + c * this.b;
		this.b  = b * a1 + d * this.b;
		this.c  = a * c1 +  c * this.d;
		this.d  = b * c1 +  d * this.d;
		this.tx = a * tx1 + c * this.ty + tx;
		this.ty = b * tx1 + d * this.ty + ty;
	};

    appendMatrix(matrix) {
		this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	};

    prependMatrix(matrix) {
		this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	};
    /**
	 * 对矩阵应用顺时针旋转变换。
	 * @param {Number} angle 旋转的角度，以度为单位。要使用以弧度为单位的值，请将其乘以Math.PI/180。
	 **/
    rotate(angle) {
		angle = angle*Matrix2D.DEG_TO_RAD;
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		let a1 = this.a;
		let b1 = this.b;
		this.a = a1*cos+this.c*sin;
		this.b = b1*cos+this.d*sin;
		this.c = -a1*sin+this.c*cos;
		this.d = -b1*sin+this.d*cos;
	};

    /**
	 * 对矩阵应用一个拉伸变换。
	 * @param {Number} skewX 以度为单位水平拉伸的量。要使用以弧度为单位的值，请将其乘以Math.PI/180。
	 * @param {Number} skewY 以度为单位垂直拉伸的量。要使用以弧度为单位的值，请将其乘以Math.PI/180。
	*/
	skew(skewX, skewY) {
		skewX = skewX*Matrix2D.DEG_TO_RAD;
		skewY = skewY*Matrix2D.DEG_TO_RAD;
		this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
	};

    /**
	 * 对矩阵应用缩放变换。
	 * @param {Number} x 水平缩放的量。例如，值2将使X方向上的大小增加一倍，0.5将使其减半。
	 * @param {Number} y 垂直缩放的量。例如，值2将使X方向上的大小增加一倍，0.5将使其减半。
	 **/
	scale(x, y) {
		this.a *= x;
		this.b *= x;
		this.c *= y;
		this.d *= y;
	};

    /**
	 * 在x轴和y轴上平移变换矩阵。
	 * @param {Number} x
	 * @param {Number} y
	 **/
	translate(x, y) {
		this.tx += this.a*x + this.c*y;
		this.ty += this.b*x + this.d*y;
	};

    /**
	 * 从指定的显示对象转换属性生成矩阵属性，并将它们附加到此矩阵
	 * 例如，你可以用它来生成一个矩阵来表示一个显示对象的变换
	 * 
	 * 	let mtx = new createjs.Matrix2D();
	 * 	mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
	 * @method appendTransform
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} scaleX
	 * @param {Number} scaleY
	 * @param {Number} rotation
	 * @param {Number} skewX
	 * @param {Number} skewY
	 * @param {Number} regX .
	 * @param {Number} regY .
	 **/
	appendTransform (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		if (rotation % 360) {
			var r = rotation*Matrix2D.DEG_TO_RAD;
			var cos = Math.cos(r);
			var sin = Math.sin(r);
		} else {
			cos = 1;
			sin = 0;
		}

		if (skewX || skewY) {
			skewX *= Matrix2D.DEG_TO_RAD;
			skewY *= Matrix2D.DEG_TO_RAD;
			this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
			this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
		} else {
			this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
		}
		
		if (regX || regY) {
			this.tx -= regX*this.a+regY*this.c; 
			this.ty -= regX*this.b+regY*this.d;
		}
	};
    /**
	 * 从指定的显示对象转换属性生成矩阵属性，并将它们附加到此矩阵
	 * 例如，你可以用它来生成一个矩阵来表示一个显示对象的变换
	 * 
	 * 	let mtx = new createjs.Matrix2D();
	 * 	mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
	 * @method appendTransform
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} scaleX
	 * @param {Number} scaleY
	 * @param {Number} rotation
	 * @param {Number} skewX
	 * @param {Number} skewY
	 * @param {Number} regX .
	 * @param {Number} regY .
	 **/
    prependTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		if (rotation%360) {
			var r = rotation*Matrix2D.DEG_TO_RAD;
			var cos = Math.cos(r);
			var sin = Math.sin(r);
		} else {
			cos = 1;
			sin = 0;
		}

		if (regX || regY) {
			// prepend the registration offset:
			this.tx -= regX; this.ty -= regY;
		}
		if (skewX || skewY) {
			// TODO: can this be combined into a single prepend operation?
			skewX *= Matrix2D.DEG_TO_RAD;
			skewY *= Matrix2D.DEG_TO_RAD;
			this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
			this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
		} else {
			this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
		}
		return this;
	};

    /**
	 * 将矩阵的属性设置为单位矩阵(应用null变换的矩阵)的属性。
	 **/
	identity () {
		this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
	};

    /**
	 * 逆矩阵，使它做相反的变换。
	 **/
	invert() {
		let a1 = this.a;
		let b1 = this.b;
		let c1 = this.c;
		let d1 = this.d;
		let tx1 = this.tx;
		let n = a1*d1-b1*c1;

		this.a = d1/n;
		this.b = -b1/n;
		this.c = -c1/n;
		this.d = a1/n;
		this.tx = (c1*this.ty-d1*tx1)/n;
		this.ty = -(a1*this.ty-b1*tx1)/n;
	};

    /**
	 * 根据这个矩阵变换一个点
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Point | Object} [pt] 
	 * @return {Point}
	 **/
	transformPoint(x, y, pt) {
		pt = pt||{};
		pt.x = x*this.a+y*this.c+this.tx;
		pt.y = x*this.b+y*this.d+this.ty;
		return pt;
	};


    /**
	 * 将矩阵分解为变换属性(x, y, scaleX, scaleY和rotation)。注意这些值
	 * 可能与您用于生成矩阵的转换属性不匹配，尽管它们将产生相同的视觉效果
	 * @param {Object} target
	 * @return {Object}
	*/
	decompose (target) {
		// 如果能够解决矩阵是否可以分解为仅缩放/旋转，即使缩放是负的，这将是很好的
		if (target == null) { target = {}; }
		target.x = this.tx;
		target.y = this.ty;
		target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
		target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);

		let skewX = Math.atan2(-this.c, this.d);
		let skewY = Math.atan2(this.b, this.a);

		let delta = Math.abs(1-skewX/skewY);
		if (delta < 0.00001) {
			target.rotation = skewY/Matrix2D.DEG_TO_RAD;
			if (this.a < 0 && this.d >= 0) {
				target.rotation += (target.rotation <= 0) ? 180 : -180;
			}
			target.skewX = target.skewY = 0;
		} else {
			target.skewX = skewX/Matrix2D.DEG_TO_RAD;
			target.skewY = skewY/Matrix2D.DEG_TO_RAD;
		}
		return target;
	};

	/**
	 * 如果矩阵是单位矩阵，则返回true。
	 * @return {Boolean}
	 **/
	isIdentity() {
		return this.tx === 0 && this.ty === 0 && this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1;
	};
	
	/**
	 * 如果此矩阵等于指定的矩阵(所有属性值都相等)，则返回true。
	 * @param {Matrix2D} matrix
	 * @return {Boolean}
	 **/
	equals(matrix) {
		return this.tx === matrix.tx && this.ty === matrix.ty && this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d;
	};

	/**
	 * 从matrix复制
	 * @param {Matrix2D} matrix 
	 */
    copy (matrix) {
		this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	};

	/**
	 * 克隆当前的Matrix2D
	 * @param {Matrix2D} matrix 
	 * @returns {Matrix2D}
	 */
    clone() {
		return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
	};  
	
	/**
	 * 转换为字符串
	 * @returns string
	 */
    toString() {
		return "[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]";
	};
}