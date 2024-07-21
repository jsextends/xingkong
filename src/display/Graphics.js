export default class Graphics {

    command = null;

    _stroke = null;

    _strokeStyle = null;

    _oldStrokeStyle = null;

    _strokeDash = null;

    _oldStrokeDash = null;

    _strokeIgnoreScale = false;

    _fill = null;

    _instructions = [];

    _commitIndex = 0;

    _activeInstructions = [];

    _dirty = false;

    _storeIndex = 0;

    static _ctx;

    static BASE_64 = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25, "a": 26, "b": 27, "c": 28, "d": 29, "e": 30, "f": 31, "g": 32, "h": 33, "i": 34, "j": 35, "k": 36, "l": 37, "m": 38, "n": 39, "o": 40, "p": 41, "q": 42, "r": 43, "s": 44, "t": 45, "u": 46, "v": 47, "w": 48, "x": 49, "y": 50, "z": 51, "0": 52, "1": 53, "2": 54, "3": 55, "4": 56, "5": 57, "6": 58, "7": 59, "8": 60, "9": 61, "+": 62, "/": 63 };

    static STROKE_CAPS_MAP = ["butt", "round", "square"];

    static STROKE_JOINTS_MAP = ["miter", "round", "bevel"];

    static beginCmd = new Graphics.BeginPath()

    constructor() {
        this.clear()
        const canvas = document.createElement("canvas");
        if (canvas.getContext) {
            Graphics._ctx = canvas.getContext("2d");
            canvas.width = canvas.height = 1;
        }
    }

    static getRGB(r, g, b, alpha) {
        if (r != null && b == null) {
            alpha = g;
            b = r & 0xFF;
            g = r >> 8 & 0xFF;
            r = r >> 16 & 0xFF;
        }
        if (alpha == null) {
            return "rgb(" + r + "," + g + "," + b + ")";
        } else {
            return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
        }
    }

    static getHSL(hue, saturation, lightness, alpha) {
        if (alpha == null) {
            return "hsl(" + (hue % 360) + "," + saturation + "%," + lightness + "%)";
        } else {
            return "hsla(" + (hue % 360) + "," + saturation + "%," + lightness + "%," + alpha + ")";
        }
    }

    getInstructions() {
		this._updateInstructions();
		return this._instructions;
	}

    isEmpty() {
		return !(this._instructions.length || this._activeInstructions.length);
	};

	draw(ctx, data) {
		this._updateInstructions();
		var instr = this._instructions;
		for (var i=this._storeIndex, l=instr.length; i<l; i++) {
			instr[i].exec(ctx, data);
		}
	};

	drawAsPath(ctx) {
		this._updateInstructions();
		var instr, instrs = this._instructions;
		for (var i=this._storeIndex, l=instrs.length; i<l; i++) {
			if ((instr = instrs[i]).path !== false) { instr.exec(ctx); }
		}
	};

	moveTo(x, y) {
		return this.append(new G.MoveTo(x,y), true);
	};

	lineTo(x, y) {
		return this.append(new G.LineTo(x,y));
	};

	arcTo(x1, y1, x2, y2, radius) {
		return this.append(new G.ArcTo(x1, y1, x2, y2, radius));
	};


	arc(x, y, radius, startAngle, endAngle, anticlockwise) {
		return this.append(new G.Arc(x, y, radius, startAngle, endAngle, anticlockwise));
	};

	/**
	 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
	 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
	 * whatwg spec</a>. A tiny API method "qt" also exists.
	 * @method quadraticCurveTo
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	quadraticCurveTo(cpx, cpy, x, y) {
		return this.append(new G.QuadraticCurveTo(cpx, cpy, x, y));
	};

	/**
	 * Draws a bezier curve from the current drawing point to (x, y) using the control points (cp1x, cp1y) and (cp2x,
	 * cp2y). For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto">
	 * whatwg spec</a>. A tiny API method "bt" also exists.
	 * @method bezierCurveTo
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
		return this.append(new G.BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
	};

	/**
	 * Draws a rectangle at (x, y) with the specified width and height using the current fill and/or stroke.
	 * For detailed information, read the
	 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect">
	 * whatwg spec</a>. A tiny API method "r" also exists.
	 * @method rect
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	rect(x, y, w, h) {
		return this.append(new G.Rect(x, y, w, h));
	};

	/**
	 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
	 * since the fill or stroke was last set. A tiny API method "cp" also exists.
	 * @method closePath
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	closePath() {
		return this._activeInstructions.length ? this.append(new G.ClosePath()) : this;
	};


// public methods that roughly map to Adobe Flash/Animate graphics APIs:
	/**
	 * Clears all drawing instructions, effectively resetting this Graphics instance. Any line and fill styles will need
	 * to be redefined to draw shapes following a clear call. A tiny API method "c" also exists.
	 * @method clear
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	clear() {
		this._instructions.length = this._activeInstructions.length = this._commitIndex = 0;
		this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null;
		this._dirty = this._strokeIgnoreScale = false;
		return this;
	};

	/**
	 * Begins a fill with the specified color. This ends the current sub-path. A tiny API method "f" also exists.
	 * @method beginFill
	 * @param {String} color A CSS compatible color value (ex. "red", "#FF0000", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no fill.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginFill(color) {
		return this._setFill(color ? new G.Fill(color) : null);
	};

	/**
	 * Begins a linear gradient fill defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
	 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
	 * square to display it:
	 *
	 *      myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
	 *
	 * A tiny API method "lf" also exists.
	 * @method beginLinearGradientFill
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient
	 * drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw
	 * the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginLinearGradientFill(colors, ratios, x0, y0, x1, y1) {
		return this._setFill(new G.Fill().linearGradient(colors, ratios, x0, y0, x1, y1));
	};

	/**
	 * Begins a radial gradient fill. This ends the current sub-path. For example, the following code defines a red to
	 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a circle to display it:
	 *
	 *      myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
	 *
	 * A tiny API method "rf" also exists.
	 * @method beginRadialGradientFill
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginRadialGradientFill(colors, ratios, x0, y0, r0, x1, y1, r1) {
		return this._setFill(new G.Fill().radialGradient(colors, ratios, x0, y0, r0, x1, y1, r1));
	};

	/**
	 * Begins a pattern fill using the specified image. This ends the current sub-path. A tiny API method "bf" also
	 * exists.
	 * @method beginBitmapFill
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern. Must be loaded prior to creating a bitmap fill, or the fill will be empty.
	 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat",
	 * "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat". Note that Firefox does not support "repeat-x" or
	 * "repeat-y" (latest tests were in FF 20.0), and will default to "repeat".
	 * @param {Matrix2D} matrix Optional. Specifies a transformation matrix for the bitmap fill. This transformation
	 * will be applied relative to the parent transform.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginBitmapFill(image, repetition, matrix) {
		return this._setFill(new G.Fill(null,matrix).bitmap(image, repetition));
	};

	/**
	 * Ends the current sub-path, and begins a new one with no fill. Functionally identical to <code>beginFill(null)</code>.
	 * A tiny API method "ef" also exists.
	 * @method endFill
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	endFill() {
		return this.beginFill();
	};

	/**
	 * Sets the stroke style. Like all drawing methods, this can be chained, so you can define
	 * the stroke style and color in a single line of code like so:
	 *
	 * 	myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
	 *
	 * A tiny API method "ss" also exists.
	 * @method setStrokeStyle
	 * @param {Number} thickness The width of the stroke.
	 * @param {String | Number} [caps=0] Indicates the type of caps to use at the end of lines. One of butt,
	 * round, or square. Defaults to "butt". Also accepts the values 0 (butt), 1 (round), and 2 (square) for use with
	 * the tiny API.
	 * @param {String | Number} [joints=0] Specifies the type of joints that should be used where two lines meet.
	 * One of bevel, round, or miter. Defaults to "miter". Also accepts the values 0 (miter), 1 (round), and 2 (bevel)
	 * for use with the tiny API.
	 * @param {Number} [miterLimit=10] If joints is set to "miter", then you can specify a miter limit ratio which
	 * controls at what point a mitered joint will be clipped.
	 * @param {Boolean} [ignoreScale=false] If true, the stroke will be drawn at the specified thickness regardless
	 * of active transformations.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale) {
		this._updateInstructions(true);
		this._strokeStyle = this.command = new G.StrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);

		// ignoreScale lives on Stroke, not StrokeStyle, so we do a little trickery:
		if (this._stroke) { this._stroke.ignoreScale = ignoreScale; }
		this._strokeIgnoreScale = ignoreScale;
		return this;
	};
	
	/**
	 * Sets or clears the stroke dash pattern.
	 *
	 * 	myGraphics.setStrokeDash([20, 10], 0);
	 *
	 * A tiny API method `sd` also exists.
	 * @method setStrokeDash
	 * @param {Array} [segments] An array specifying the dash pattern, alternating between line and ga
	 * For example, `[20,10]` would create a pattern of 20 pixel lines with 10 pixel gaps between them.
	 * Passing null or an empty array will clear the existing stroke dash.
	 * @param {Number} [offset=0] The offset of the dash pattern. For example, you could increment this value to create a "marching ants" effect.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	setStrokeDash(segments, offset) {
		this._updateInstructions(true);
		this._strokeDash = this.command = new G.StrokeDash(segments, offset);
		return this;
	};

	/**
	 * Begins a stroke with the specified color. This ends the current sub-path. A tiny API method "s" also exists.
	 * @method beginStroke
	 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no stroke.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginStroke(color) {
		return this._setStroke(color ? new G.Stroke(color) : null);
	};

	/**
	 * Begins a linear gradient stroke defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
	 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
	 * square to display it:
	 *
	 *      myGraphics.setStrokeStyle(10).
	 *          beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
	 *
	 * A tiny API method "ls" also exists.
	 * @method beginLinearGradientStroke
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginLinearGradientStroke(colors, ratios, x0, y0, x1, y1) {
		return this._setStroke(new G.Stroke().linearGradient(colors, ratios, x0, y0, x1, y1));
	};

	/**
	 * Begins a radial gradient stroke. This ends the current sub-path. For example, the following code defines a red to
	 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a rectangle to display it:
	 *
	 *      myGraphics.setStrokeStyle(10)
	 *          .beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50)
	 *          .drawRect(50, 90, 150, 110);
	 *
	 * A tiny API method "rs" also exists.
	 * @method beginRadialGradientStroke
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%, then draw the second color
	 * to 100%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginRadialGradientStroke(colors, ratios, x0, y0, r0, x1, y1, r1) {
		return this._setStroke(new G.Stroke().radialGradient(colors, ratios, x0, y0, r0, x1, y1, r1));
	};

	/**
	 * Begins a pattern fill using the specified image. This ends the current sub-path. Note that unlike bitmap fills,
	 * strokes do not currently support a matrix parameter due to limitations in the canvas API. A tiny API method "bs"
	 * also exists.
	 * @method beginBitmapStroke
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern. Must be loaded prior to creating a bitmap fill, or the fill will be empty.
	 * @param {String} [repetition=repeat] Optional. Indicates whether to repeat the image in the fill area. One of
	 * "repeat", "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat".
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	beginBitmapStroke(image, repetition) {
		// NOTE: matrix is not supported for stroke because transforms on strokes also affect the drawn stroke width.
		return this._setStroke(new G.Stroke().bitmap(image, repetition));
	};

	/**
	 * Ends the current sub-path, and begins a new one with no stroke. Functionally identical to <code>beginStroke(null)</code>.
	 * A tiny API method "es" also exists.
	 * @method endStroke
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	endStroke() {
		return this.beginStroke();
	};

	/**
	 * Maps the familiar ActionScript <code>curveTo()</code> method to the functionally similar {{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}}
	 * method.
	 * @method curveTo
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	curveTo = quadraticCurveTo;

	/**
	 *
	 * Maps the familiar ActionScript <code>drawRect()</code> method to the functionally similar {{#crossLink "Graphics/rect"}}{{/crossLink}}
	 * method.
	 * @method drawRect
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawRect = rect;

	/**
	 * Draws a rounded rectangle with all corners with the specified radius.
	 * @method drawRoundRect
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w
	 * @param {Number} h
	 * @param {Number} radius Corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawRoundRect(x, y, w, h, radius) {
		return this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius);
	};

	/**
	 * Draws a rounded rectangle with different corner radii. Supports positive and negative corner radii. A tiny API
	 * method "rc" also exists.
	 * @method drawRoundRectComplex
	 * @param {Number} x The horizontal coordinate to draw the round rect.
	 * @param {Number} y The vertical coordinate to draw the round rect.
	 * @param {Number} w The width of the round rect.
	 * @param {Number} h The height of the round rect.
	 * @param {Number} radiusTL Top left corner radius.
	 * @param {Number} radiusTR Top right corner radius.
	 * @param {Number} radiusBR Bottom right corner radius.
	 * @param {Number} radiusBL Bottom left corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawRoundRectComplex(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
		return this.append(new G.RoundRect(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL));
	};

	/**
	 * Draws a circle with the specified radius at (x, y).
	 *
	 *      var g = new createjs.Graphics();
	 *	    g.setStrokeStyle(1);
	 *	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
	 *	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
	 *	    g.drawCircle(0,0,3);
	 *
	 *	    var s = new createjs.Shape(g);
	 *		s.x = 100;
	 *		s.y = 100;
	 *
	 *	    stage.addChild(s);
	 *	    stage.update();
	 *
	 * A tiny API method "dc" also exists.
	 * @method drawCircle
	 * @param {Number} x x coordinate center point of circle.
	 * @param {Number} y y coordinate center point of circle.
	 * @param {Number} radius Radius of circle.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawCircle(x, y, radius) {
		return this.append(new G.Circle(x, y, radius));
	};

	/**
	 * Draws an ellipse (oval) with a specified width (w) and height (h). Similar to {{#crossLink "Graphics/drawCircle"}}{{/crossLink}},
	 * except the width and height can be different. A tiny API method "de" also exists.
	 * @method drawEllipse
	 * @param {Number} x The left coordinate point of the ellipse. Note that this is different from {{#crossLink "Graphics/drawCircle"}}{{/crossLink}}
	 * which draws from center.
	 * @param {Number} y The top coordinate point of the ellipse. Note that this is different from {{#crossLink "Graphics/drawCircle"}}{{/crossLink}}
	 * which draws from the center.
	 * @param {Number} w The height (horizontal diameter) of the ellipse. The horizontal radius will be half of this
	 * number.
	 * @param {Number} h The width (vertical diameter) of the ellipse. The vertical radius will be half of this number.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawEllipse(x, y, w, h) {
		return this.append(new G.Ellipse(x, y, w, h));
	};

	/**
	 * Draws a star if pointSize is greater than 0, or a regular polygon if pointSize is 0 with the specified number of
	 * points. For example, the following code will draw a familiar 5 pointed star shape centered at 100, 100 and with a
	 * radius of 50:
	 *
	 *      myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90);
	 *      // Note: -90 makes the first point vertical
	 *
	 * A tiny API method "dp" also exists.
	 *
	 * @method drawPolyStar
	 * @param {Number} x Position of the center of the shape.
	 * @param {Number} y Position of the center of the shape.
	 * @param {Number} radius The outer radius of the shape.
	 * @param {Number} sides The number of points on the star or sides on the polygon.
	 * @param {Number} pointSize The depth or "pointy-ness" of the star points. A pointSize of 0 will draw a regular
	 * polygon (no points), a pointSize of 1 will draw nothing because the points are infinitely pointy.
	 * @param {Number} angle The angle of the first point / corner. For example a value of 0 will draw the first point
	 * directly to the right of the center.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	drawPolyStar(x, y, radius, sides, pointSize, angle) {
		return this.append(new G.PolyStar(x, y, radius, sides, pointSize, angle));
	};
	
	/**
	* Draws a polygon from array of point arrays.
	*
	*      myGraphics.beginFill("#FF0").drawPolygon([100, 100], [150, 50], [200,100], [200,200], [100,200]);
	*      // makes a house shape
	*
	* A tiny API method "pg" also exists.
	*
	* @method drawPolygon
	* @param {Array} points An array of [x,y] points.
	* @param {Boolean} close Whether to close the polygon - default is true.
	* @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	* @chainable
	**/

	drawPolygon(points, close) { // Dan Zen 4/2/21
		return this.append(new G.Polygon(points, close));
	};

	/**
	 * Appends a graphics command object to the graphics queue. Command objects expose an "exec" method
	 * that accepts two parameters: the Context2D to operate on, and an arbitrary data object passed into
	 * {{#crossLink "Graphics/draw"}}{{/crossLink}}. The latter will usually be the Shape instance that called draw.
	 *
	 * This method is used internally by Graphics methods, such as drawCircle, but can also be used directly to insert
	 * built-in or custom graphics commands. For example:
	 *
	 * 		// attach data to our shape, so we can access it during the draw:
	 * 		myShape.color = "red";
	 *
	 * 		// append a Circle command object:
	 * 		myShape.graphics.append(new createjs.Graphics.Circle(50, 50, 30));
	 *
	 * 		// append a custom command object with an exec method that sets the fill style
	 * 		// based on the shape's data, and then fills the circle.
	 * 		myShape.graphics.append({exec:function(ctx, shape) {
	 * 			ctx.fillStyle = shape.color;
	 * 			ctx.fill();
	 * 		}});
	 *
	 * @method append
	 * @param {Object} command A graphics command object exposing an "exec" method.
	 * @param {boolean} clean The clean param is primarily for internal use. A value of true indicates that a command does not generate a path that should be stroked or filled.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	append(command, clean) {
		this._activeInstructions.push(command);
		this.command = command;
		if (!clean) { this._dirty = true; }
		return this;
	};

	/**
	 * Decodes a compact encoded path string into a series of draw instructions.
	 * This format is not intended to be human readable, and is meant for use by authoring tools.
	 * The format uses a base64 character set, with each character representing 6 bits, to define a series of draw
	 * commands.
	 *
	 * Each command is comprised of a single "header" character followed by a variable number of alternating x and y
	 * position values. Reading the header bits from left to right (most to least significant): bits 1 to 3 specify the
	 * type of operation (0-moveTo, 1-lineTo, 2-quadraticCurveTo, 3-bezierCurveTo, 4-closePath, 5-7 unused). Bit 4
	 * indicates whether position values use 12 bits (2 characters) or 18 bits (3 characters), with a one indicating the
	 * latter. Bits 5 and 6 are currently unused.
	 *
	 * Following the header is a series of 0 (closePath), 2 (moveTo, lineTo), 4 (quadraticCurveTo), or 6 (bezierCurveTo)
	 * parameters. These parameters are alternating x/y positions represented by 2 or 3 characters (as indicated by the
	 * 4th bit in the command char). These characters consist of a 1 bit sign (1 is negative, 0 is positive), followed
	 * by an 11 (2 char) or 17 (3 char) bit integer value. All position values are in tenths of a pixel. Except in the
	 * case of move operations which are absolute, this value is a delta from the previous x or y position (as
	 * appropriate).
	 *
	 * For example, the string "A3cAAMAu4AAA" represents a line starting at -150,0 and ending at 150,0.
	 * <br />A - bits 000000. First 3 bits (000) indicate a moveTo operation. 4th bit (0) indicates 2 chars per
	 * parameter.
	 * <br />n0 - 110111011100. Absolute x position of -150.0px. First bit indicates a negative value, remaining bits
	 * indicate 1500 tenths of a pixel.
	 * <br />AA - 000000000000. Absolute y position of 0.
	 * <br />I - 001100. First 3 bits (001) indicate a lineTo operation. 4th bit (1) indicates 3 chars per parameter.
	 * <br />Au4 - 000000101110111000. An x delta of 300.0px, which is added to the previous x value of -150.0px to
	 * provide an absolute position of +150.0px.
	 * <br />AAA - 000000000000000000. A y delta value of 0.
	 *
	 * A tiny API method "p" also exists.
	 * @method decodePath
	 * @param {String} str The path string to decode.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	decodePath(str) {
		var instructions = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath];
		var paramCount = [2, 2, 4, 6, 0];
		var i=0, l=str.length;
		var params = [];
		var x=0, y=0;
		var base64 = Graphics.BASE_64;

		while (i<l) {
			var c = str.charAt(i);
			var n = base64[c];
			var fi = n>>3; // highest order bits 1-3 code for operation.
			var f = instructions[fi];
			// check that we have a valid instruction & that the unused bits are empty:
			if (!f || (n&3)) { throw("bad path data (@"+i+"): "+c); }
			var pl = paramCount[fi];
			if (!fi) { x=y=0; } // move operations reset the position.
			params.length = 0;
			i++;
			var charCount = (n>>2&1)+2;  // 4th header bit indicates number size for this operation.
			for (var p=0; p<pl; p++) {
				var num = base64[str.charAt(i)];
				var sign = (num>>5) ? -1 : 1;
				num = ((num&31)<<6)|(base64[str.charAt(i+1)]);
				if (charCount == 3) { num = (num<<6)|(base64[str.charAt(i+2)]); }
				num = sign*num/10;
				if (p%2) { x = (num += x); }
				else { y = (num += y); }
				params[p] = num;
				i += charCount;
			}
			f.apply(this,params);
		}
		return this;
	};

	/**
	 * Stores all graphics commands so they won't be executed in future draws. Calling store() a second time adds to
	 * the existing store. This also affects `drawAsPath()`.
	 *
	 * This is useful in cases where you are creating vector graphics in an iterative manner (ex. generative art), so
	 * that only new graphics need to be drawn (which can provide huge performance benefits), but you wish to retain all
	 * of the vector instructions for later use (ex. scaling, modifying, or exporting).
	 *
	 * Note that calling store() will force the active path (if any) to be ended in a manner similar to changing
	 * the fill or stroke.
	 *
	 * For example, consider a application where the user draws lines with the mouse. As each line segment (or collection of
	 * segments) are added to a Shape, it can be rasterized using {{#crossLink "DisplayObject/updateCache"}}{{/crossLink}},
	 * and then stored, so that it can be redrawn at a different scale when the application is resized, or exported to SVG.
	 *
	 * 	// set up cache:
	 * 	myShape.cache(0,0,500,500,scale);
	 *
	 * 	// when the user drags, draw a new line:
	 * 	myShape.graphics.moveTo(oldX,oldY).lineTo(newX,newY);
	 * 	// then draw it into the existing cache:
	 * 	myShape.updateCache("source-over");
	 * 	// store the new line, so it isn't redrawn next time:
	 * 	myShape.store();
	 *
	 * 	// then, when the window resizes, we can re-render at a different scale:
	 * 	// first, unstore all our lines:
	 * 	myShape.unstore();
	 * 	// then cache using the new scale:
	 * 	myShape.cache(0,0,500,500,newScale);
	 * 	// finally, store the existing commands again:
	 * 	myShape.store();
	 *
	 * @method store
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	store() {
		this._updateInstructions(true);
		this._storeIndex = this._instructions.length;
		return this;
	};

	/**
	 * Unstores any graphics commands that were previously stored using {{#crossLink "Graphics/store"}}{{/crossLink}}
	 * so that they will be executed in subsequent draw calls.
	 *
	 * @method unstore
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 **/
	unstore() {
		this._storeIndex = 0;
		return this;
	};

	/**
	 * Returns a clone of this Graphics instance. Note that the individual command objects are not cloned.
	 * @method clone
	 * @return {Graphics} A clone of the current Graphics instance.
	 **/
	clone() {
		var o = new Graphics();
		o.command = this.command;
		o._stroke = this._stroke;
		o._strokeStyle = this._strokeStyle;
		o._strokeDash = this._strokeDash;
		o._strokeIgnoreScale = this._strokeIgnoreScale;
		o._fill = this._fill;
		o._instructions = this._instructions.slice();
		o._commitIndex = this._commitIndex;
		o._activeInstructions = this._activeInstructions.slice();
		o._dirty = this._dirty;
		o._storeIndex = this._storeIndex;
		return o;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	toString() {
		return "[Graphics]";
	};


// tiny API:
	/**
	 * Shortcut to moveTo.
	 * @method mt
	 * @param {Number} x The x coordinate the drawing point should move to.
	 * @param {Number} y The y coordinate the drawing point should move to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
	 * @chainable
	 * @protected
	 **/
	mt = moveTo;

	/**
	 * Shortcut to lineTo.
	 * @method lt
	 * @param {Number} x The x coordinate the drawing point should draw to.
	 * @param {Number} y The y coordinate the drawing point should draw to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	lt = lineTo;

	/**
	 * Shortcut to arcTo.
	 * @method at
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @param {Number} radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	at = arcTo;

	/**
	 * Shortcut to bezierCurveTo.
	 * @method bt
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	bt = bezierCurveTo;

	/**
	 * Shortcut to quadraticCurveTo / curveTo.
	 * @method qt
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @protected
	 * @chainable
	 **/
	qt = quadraticCurveTo;

	/**
	 * Shortcut to arc.
	 * @method a
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 * @param {Number} startAngle Measured in radians.
	 * @param {Number} endAngle Measured in radians.
	 * @param {Boolean} anticlockwise
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @protected
	 * @chainable
	 **/
	a = arc;

	/**
	 * Shortcut to rect.
	 * @method r
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	r = rect;

	/**
	 * Shortcut to closePath.
	 * @method cp
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	cp = closePath;

	/**
	 * Shortcut to clear.
	 * @method c
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	c = clear;

	/**
	 * Shortcut to beginFill.
	 * @method f
	 * @param {String} color A CSS compatible color value (ex. "red", "#FF0000", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no fill.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	f = beginFill;

	/**
	 * Shortcut to beginLinearGradientFill.
	 * @method lf
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient
	 * drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw
	 * the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	lf = beginLinearGradientFill;

	/**
	 * Shortcut to beginRadialGradientFill.
	 * @method rf
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	rf = beginRadialGradientFill;

	/**
	 * Shortcut to beginBitmapFill.
	 * @method bf
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern.
	 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat",
	 * "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat". Note that Firefox does not support "repeat-x" or
	 * "repeat-y" (latest tests were in FF 20.0), and will default to "repeat".
	 * @param {Matrix2D} matrix Optional. Specifies a transformation matrix for the bitmap fill. This transformation
	 * will be applied relative to the parent transform.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	bf = beginBitmapFill;

	/**
	 * Shortcut to endFill.
	 * @method ef
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	ef = endFill;

	/**
	 * Shortcut to setStrokeStyle.
	 * @method ss
	 * @param {Number} thickness The width of the stroke.
	 * @param {String | Number} [caps=0] Indicates the type of caps to use at the end of lines. One of butt,
	 * round, or square. Defaults to "butt". Also accepts the values 0 (butt), 1 (round), and 2 (square) for use with
	 * the tiny API.
	 * @param {String | Number} [joints=0] Specifies the type of joints that should be used where two lines meet.
	 * One of bevel, round, or miter. Defaults to "miter". Also accepts the values 0 (miter), 1 (round), and 2 (bevel)
	 * for use with the tiny API.
	 * @param {Number} [miterLimit=10] If joints is set to "miter", then you can specify a miter limit ratio which
	 * controls at what point a mitered joint will be clipped.
	 * @param {Boolean} [ignoreScale=false] If true, the stroke will be drawn at the specified thickness regardless
	 * of active transformations.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	ss = setStrokeStyle;
	
	/**
	 * Shortcut to setStrokeDash.
	 * @method sd
	 * @param {Array} [segments] An array specifying the dash pattern, alternating between line and ga
	 * For example, [20,10] would create a pattern of 20 pixel lines with 10 pixel gaps between them.
	 * Passing null or an empty array will clear any existing dash.
	 * @param {Number} [offset=0] The offset of the dash pattern. For example, you could increment this value to create a "marching ants" effect.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	sd = setStrokeDash;

	/**
	 * Shortcut to beginStroke.
	 * @method s
	 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no stroke.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	s = beginStroke;

	/**
	 * Shortcut to beginLinearGradientStroke.
	 * @method ls
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
	 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
	 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
	 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	ls = beginLinearGradientStroke;

	/**
	 * Shortcut to beginRadialGradientStroke.
	 * @method rs
	 * @param {Array} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define
	 * a gradient drawing from red to blue.
	 * @param {Array} ratios An array of gradient positions which correspond to the colors. For example, [0.1,
	 * 0.9] would draw the first color to 10% then interpolating to the second color at 90%, then draw the second color
	 * to 100%.
	 * @param {Number} x0 Center position of the inner circle that defines the gradient.
	 * @param {Number} y0 Center position of the inner circle that defines the gradient.
	 * @param {Number} r0 Radius of the inner circle that defines the gradient.
	 * @param {Number} x1 Center position of the outer circle that defines the gradient.
	 * @param {Number} y1 Center position of the outer circle that defines the gradient.
	 * @param {Number} r1 Radius of the outer circle that defines the gradient.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	rs = beginRadialGradientStroke;

	/**
	 * Shortcut to beginBitmapStroke.
	 * @method bs
	 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use
	 * as the pattern.
	 * @param {String} [repetition=repeat] Optional. Indicates whether to repeat the image in the fill area. One of
	 * "repeat", "repeat-x", "repeat-y", or "no-repeat". Defaults to "repeat".
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	bs = beginBitmapStroke;

	/**
	 * Shortcut to endStroke.
	 * @method es
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	es = endStroke;

	/**
	 * Shortcut to drawRect.
	 * @method dr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	dr = drawRect;

	/**
	 * Shortcut to drawRoundRect.
	 * @method rr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w
	 * @param {Number} h
	 * @param {Number} radius Corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	rr = drawRoundRect;

	/**
	 * Shortcut to drawRoundRectComplex.
	 * @method rc
	 * @param {Number} x The horizontal coordinate to draw the round rect.
	 * @param {Number} y The vertical coordinate to draw the round rect.
	 * @param {Number} w The width of the round rect.
	 * @param {Number} h The height of the round rect.
	 * @param {Number} radiusTL Top left corner radius.
	 * @param {Number} radiusTR Top right corner radius.
	 * @param {Number} radiusBR Bottom right corner radius.
	 * @param {Number} radiusBL Bottom left corner radius.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	rc = drawRoundRectComplex;

	/**
	 * Shortcut to drawCircle.
	 * @method dc
	 * @param {Number} x x coordinate center point of circle.
	 * @param {Number} y y coordinate center point of circle.
	 * @param {Number} radius Radius of circle.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	dc = drawCircle;

	/**
	 * Shortcut to drawEllipse.
	 * @method de
	 * @param {Number} x The left coordinate point of the ellipse. Note that this is different from {{#crossLink "Graphics/drawCircle"}}{{/crossLink}}
	 * which draws from center.
	 * @param {Number} y The top coordinate point of the ellipse. Note that this is different from {{#crossLink "Graphics/drawCircle"}}{{/crossLink}}
	 * which draws from the center.
	 * @param {Number} w The height (horizontal diameter) of the ellipse. The horizontal radius will be half of this
	 * number.
	 * @param {Number} h The width (vertical diameter) of the ellipse. The vertical radius will be half of this number.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	de = drawEllipse;

	/**
	 * Shortcut to drawPolyStar.
	 * @method dp
	 * @param {Number} x Position of the center of the shape.
	 * @param {Number} y Position of the center of the shape.
	 * @param {Number} radius The outer radius of the shape.
	 * @param {Number} sides The number of points on the star or sides on the polygon.
	 * @param {Number} pointSize The depth or "pointy-ness" of the star points. A pointSize of 0 will draw a regular
	 * polygon (no points), a pointSize of 1 will draw nothing because the points are infinitely pointy.
	 * @param {Number} angle The angle of the first point / corner. For example a value of 0 will draw the first point
	 * directly to the right of the center.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	dp = drawPolyStar;
	
	 /**
	 * Shortcut to drawPolygon.
	 * @method pg
	 * @param {Array} points An array of [x,y] points.
	 * @param {Boolean} close Whether to close the polygon - default is true.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	pg = drawPolygon;


	/**
	 * Shortcut to decodePath.
	 * @method p
	 * @param {String} str The path string to decode.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 * @chainable
	 * @protected
	 **/
	p = decodePath;


	_updateInstructions(commit) {
		var instr = this._instructions, active = this._activeInstructions, commitIndex = this._commitIndex;

		if (this._dirty && active.length) {
			instr.length = commitIndex; // remove old, uncommitted commands
			instr.push(Graphics.beginCmd);

			var l = active.length, ll = instr.length;
			instr.length = ll+l;
			for (var i=0; i<l; i++) { instr[i+ll] = active[i]; }

			if (this._fill) { instr.push(this._fill); }
			if (this._stroke) {
				// doesn't need to be re-applied if it hasn't changed.
				if (this._strokeDash !== this._oldStrokeDash) {
					instr.push(this._strokeDash);
				}
				if (this._strokeStyle !== this._oldStrokeStyle) {
					instr.push(this._strokeStyle);
				}
				if (commit) {
					this._oldStrokeStyle = this._strokeStyle;
					this._oldStrokeDash = this._strokeDash;
				}
				instr.push(this._stroke);
			}

			this._dirty = false;
		}

		if (commit) {
			active.length = 0;
			this._commitIndex = instr.length;
		}
	};

	/**
	 * @method _setFill
	 * @param fill
	 * @protected
	 **/
	_setFill(fill) {
		this._updateInstructions(true);
		this.command = this._fill = fill;
		return this;
	};

	/**
	 * @method _setStroke
	 * @param stroke
	 * @protected
	 **/
	_setStroke(stroke) {
		this._updateInstructions(true);
		if (this.command = this._stroke = stroke) {
			stroke.ignoreScale = this._strokeIgnoreScale;
		}
		return this;
	};
}