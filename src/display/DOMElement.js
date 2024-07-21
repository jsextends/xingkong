import DisplayObject from "./DisplayObject";

export default class DOMElement extends DisplayObject {
    _oldProps = null;


    _oldStage = null;

    _drawAction = null;

    constructor(htmlElement) {
        super();
        if (typeof (htmlElement) == "string") { htmlElement = document.getElementById(htmlElement); }
        this.mouseEnabled = false;
        var style = htmlElement.style;
        style.position = "absolute";
        style.transformOrigin = style.WebkitTransformOrigin = style.msTransformOrigin = style.MozTransformOrigin = style.OTransformOrigin = "0% 0%";
        this.htmlElement = htmlElement;
    }

    isVisible() {
        return this.htmlElement != null;
    };

    draw(ctx, ignoreCache) {
        return true;
    };

    cache() { };
    uncache() { };

    updateCache() { };

    hitTest() { };

    localToGlobal() { };

    globalToLocal() { };

    localToLocal() { };
    clone() {
        throw ("DOMElement cannot be cloned.")
    };

    toString() {
        return "[DOMElement (name=" + this.name + ")]";
    };

    _tick(evtObj) {
        var stage = this.stage;
        if (stage && stage !== this._oldStage) {
            this._drawAction && stage.off("drawend", this._drawAction);
            this._drawAction = stage.on("drawend", this._handleDrawEnd, this);
            this._oldStage = stage;
        }
        super._tick(evtObj);
    };


    _handleDrawEnd(evt) {
        var o = this.htmlElement;
        if (!o) { return; }
        var style = o.style;

        var props = this.getConcatenatedDisplayProps(this._props), mtx = props.matrix;

        var visibility = props.visible ? "visible" : "hidden";
        if (visibility != style.visibility) { style.visibility = visibility; }
        if (!props.visible) { return; }

        var oldProps = this._oldProps, oldMtx = oldProps && oldProps.matrix;
        var n = 10000; // precision

        if (!oldMtx || !oldMtx.equals(mtx)) {
            var str = "matrix(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + "," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + "," + (mtx.tx + 0.5 | 0);
            style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str + "," + (mtx.ty + 0.5 | 0) + ")";
            style.MozTransform = str + "px," + (mtx.ty + 0.5 | 0) + "px)";
            if (!oldProps) { oldProps = this._oldProps = new DisplayProps(true, null); }
            oldProps.matrix.copy(mtx);
        }

        if (oldProps.alpha != props.alpha) {
            style.opacity = "" + (props.alpha * n | 0) / n;
            oldProps.alpha = props.alpha;
        }
    };
}