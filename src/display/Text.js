import DisplayObject from "./DisplayObject"
export default class Text extends DisplayObject {
    textAlign = "left";

    textBaseline = "top";

    maxWidth = null;

    ineHeight = 0;

    lineWidth = null;

    static H_OFFSETS = { start: 0, left: 0, center: -0.5, end: -1, right: -1 };

    static V_OFFSETS = { top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1 };

    static _workingContext

    constructor(text, font, color) {
        super();
        this.text = text;
        this.font = font;
        this.color = color;
        var canvas = document.createElement("canvas");
        if (canvas.getContext) {
            Text._workingContext = canvas.getContext("2d");
            canvas.width = canvas.height = 1;
        }
    }

    isVisible() {
        const hasContent = this.cacheCanvas || (this.text != null && this.text !== "");
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
    };

    draw(ctx, ignoreCache) {
        if (super.draw(ctx, ignoreCache)) {
            const col = this.color || "#000";
            if (this.outline) {
                ctx.strokeStyle = col;
                ctx.lineWidth = this.outline * 1;
            } else {
                ctx.fillStyle = col;
            }
            this._drawText(this._prepContext(ctx));
        }
    };

    getMeasuredWidth() {
        return this._getMeasuredWidth(this.text);
    };

    /**
     * “M”字符的宽度乘以1.2，这为大多数字体提供了近似的行高。
     * @return {Number}
     **/
    getMeasuredLineHeight() {
        return this._getMeasuredWidth("M") * 1.2;
    };

    getMeasuredHeight() {
        return this._drawText(null, {}).height;
    };

    getBounds() {
        let rect = super.getBounds();
        if (rect) { return rect; }
        if (this.text == null || this.text === "") { return null; }
        var o = this._drawText(null, {});
        var w = (this.maxWidth && this.maxWidth < o.width) ? this.maxWidth : o.width;
        var x = w * Text.H_OFFSETS[this.textAlign || "left"];
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        var y = lineHeight * Text.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(x, y, w, o.height);
    };

    getMetrics() {
        var o = { lines: [] };
        o.lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        o.vOffset = o.lineHeight * Text.V_OFFSETS[this.textBaseline || "top"];
        return this._drawText(null, o, o.lines);
    };

    clone() {
        return this._cloneProps(new Text(this.text, this.font, this.color));
    };

    toString() {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]";
    };

    _cloneProps(o) {
        super._cloneProps(o);
        o.textAlign = this.textAlign;
        o.textBaseline = this.textBaseline;
        o.maxWidth = this.maxWidth;
        o.outline = this.outline;
        o.lineHeight = this.lineHeight;
        o.lineWidth = this.lineWidth;
        return o;
    };

    _prepContext(ctx) {
        ctx.font = this.font || "10px sans-serif";
        ctx.textAlign = this.textAlign || "left";
        ctx.textBaseline = this.textBaseline || "top";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 2.5;
        return ctx;
    };

    _drawText(ctx, o, lines) {
        var paint = !!ctx;
        if (!paint) {
            ctx = Text._workingContext;
            ctx.save();
            this._prepContext(ctx);
        }
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();

        var maxW = 0, count = 0;
        var hardLines = String(this.text).split(/(?:\r\n|\r|\n)/);
        for (var i = 0, l = hardLines.length; i < l; i++) {
            var str = hardLines[i];
            var w = null;

            if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {

                var words = str.split(/(\s)/);
                str = words[0];
                w = ctx.measureText(str).width;

                for (var j = 1, jl = words.length; j < jl; j += 2) {
                    var wordW = ctx.measureText(words[j] + words[j + 1]).width;
                    if (w + wordW > this.lineWidth) {
                        if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
                        if (lines) { lines.push(str); }
                        if (w > maxW) { maxW = w; }
                        str = words[j + 1];
                        w = ctx.measureText(str).width;
                        count++;
                    } else {
                        str += words[j] + words[j + 1];
                        w += wordW;
                    }
                }
            }

            if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
            if (lines) { lines.push(str); }
            if (o && w == null) { w = ctx.measureText(str).width; }
            if (w > maxW) { maxW = w; }
            count++;
        }

        if (o) {
            o.width = maxW;
            o.height = count * lineHeight;
        }
        if (!paint) { ctx.restore(); }
        return o;
    };

    _drawTextLine(ctx, text, y) {
        if (this.outline) { ctx.strokeText(text, 0, y, this.maxWidth || 0xFFFF); }
        else { ctx.fillText(text, 0, y, this.maxWidth || 0xFFFF); }
    };


    _getMeasuredWidth(text) {
        var ctx = Text._workingContext;
        ctx.save();
        var w = this._prepContext(ctx).measureText(text).width;
        ctx.restore();
        return w;
    };

}