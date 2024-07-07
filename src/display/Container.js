import DisplayObject from "./DisplayObject";
import { JEvent, JErrorEvent } from "@jsextends/jevent"
/**
 * Class Container
 * @extends DisplayObject
 */
export default class Container extends DisplayObject {
	children = [];

	mouseChildren = true;

	tickChildren = true;

	constructor() {
		super();
	}

	getNumChildren() {
		return this.children.length;
	};

	isVisible() {
		var hasContent = this.cacheCanvas || this.children.length;
		return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
	};

	draw(ctx, ignoreCache) {
		if (super.draw(ctx, ignoreCache)) {
			return true;
		}
		let list = this.children.slice();
		for (let i = 0, l = list.length; i < l; i++) {
			var child = list[i];
			if (child.isVisible()) {
				ctx.save();
				child.updateContext(ctx);
				child.draw(ctx);
				ctx.restore();
			}
		}
		return true;
	};

	addChildren(child) {
		if (child) {
			let parent = child.parent;
			if (parent) { parent.removeChildren(child) }
			parent = this;
			this.children.push(child);
			child.dispatchEvent(new JEvent("added"));
		}
	};
	addChildrenAt(child, index) {
		if (index >= 0 && index < this.children.length) {
			let parent = child.parent;
			if (parent) { parent.removeChildren(child) }
			parent = this;
			this.children.splice(index, 0, child);
			child.dispatchEvent("added");
		} else {
			child.dispatchEvent(new JErrorEvent("参数index异常"));
		}
	};
	removeChildren(child) {
		this.removeChildAt(this.getChildIndex(child));
	};

	/**
	 * 移除某个子节点
	 * @param {Number} index 
	 */
	removeChildAt(index) {
		if (index >= 0 && index < this.children.length) {
			let child = this.children[index];
			if (child) { child.parent = null; }
			this.children.splice(index, 1);
			child.dispatchEvent(new JEvent("removed"));
		} else {
			child.dispatchEvent(new JErrorEvent("参数index异常"));
		}
	};

	removeAllChildren() {
		var kids = this.children;
		while (kids.length) { this._removeChildAt(0); }
	}
	getChildAt(index) {
		return this.children[index];
	}

	getChildByName(name) {
		var kids = this.children;
		for (var i = 0, l = kids.length; i < l; i++) {
			if (kids[i].name == name) { return kids[i]; }
		}
		return null;
	};

	getChildIndex(child) {
		return this.children.findIndex(el => el === child)
	};

 	contains(child) {
		while (child) {
			if (child == this) { return true; }
			child = child.parent;
		}
		return false;
	};

	hitTest(x, y) {
		return (this.getObjectUnderPoint(x, y) != null);
	};

	getObjectsUnderPoint(x, y, mode) {
		let arr = [];
		let pt = this.localToGlobal(x, y);
		this._getObjectsUnderPoint(pt.x, pt.y, arr, mode > 0, mode == 1);
		return arr;
	};

	getObjectUnderPoint(x, y, mode) {
		var pt = this.localToGlobal(x, y);
		return this._getObjectsUnderPoint(pt.x, pt.y, null, mode > 0, mode == 1);
	};

	getBounds() {
		return this._getBounds(null, true);
	};


	getTransformedBounds() {
		return this._getBounds();
	};

	clone(recursive) {
		var o = this._cloneProps(new Container());
		if (recursive) { this._cloneChildren(o); }
		return o;
	};

	toString() {
		return "[Container (name=" + this.name + ")]";
	};


	_tick(evtObj) {
		if (this.tickChildren) {
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
				if (child.tickEnabled && child._tick) { child._tick(evtObj); }
			}
		}
		super._tick(evtObj);
	};

	_cloneChildren(o) {
		if (o.children.length) { o.removeAllChildren(); }
		var arr = o.children;
		for (var i = 0, l = this.children.length; i < l; i++) {
			var clone = this.children[i].clone(true);
			clone.parent = o;
			arr.push(clone);
		}
	};

	_getObjectsUnderPoint(x, y, arr, mouse, activeListener, currentDepth) {
		currentDepth = currentDepth || 0;
		if (!currentDepth && !this._testMask(this, x, y)) { return null; }
		var mtx, ctx = createjs.DisplayObject._hitTestContext;
		activeListener = activeListener || (mouse && this._hasMouseEventListener());

		var children = this.children, l = children.length;
		for (var i = l - 1; i >= 0; i--) {
			var child = children[i];
			var hitArea = child.hitArea;
			if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) { continue; }
			if (!hitArea && !this._testMask(child, x, y)) { continue; }

			// if a child container has a hitArea then we only need to check its hitAre2a, so we can treat it as a normal DO:
			if (!hitArea && child instanceof Container) {
				var result = child._getObjectsUnderPoint(x, y, arr, mouse, activeListener, currentDepth + 1);
				if (!arr && result) { return (mouse && !this.mouseChildren) ? this : result; }
			} else {
				if (mouse && !activeListener && !child._hasMouseEventListener()) { continue; }

				// TODO: can we pass displayProps forward, to avoid having to calculate this backwards every time? It's kind of a mixed bag. When we're only hunting for DOs with event listeners, it may not make sense.
				var props = child.getConcatenatedDisplayProps(child._props);
				mtx = props.matrix;

				if (hitArea) {
					mtx.appendMatrix(hitArea.getMatrix(hitArea._props.matrix));
					props.alpha = hitArea.alpha;
				}

				ctx.globalAlpha = props.alpha;
				ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);
				(hitArea || child).draw(ctx);
				if (!this._testHit(ctx)) { continue; }
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, 2, 2);
				if (arr) { arr.push(child); }
				else { return (mouse && !this.mouseChildren) ? this : child; }
			}
		}
		return null;
	};

	_testMask(target, x, y) {
		var mask = target.mask;
		if (!mask || !mask.graphics || mask.graphics.isEmpty()) { return true; }

		var mtx = this._props.matrix, parent = target.parent;
		mtx = parent ? parent.getConcatenatedMatrix(mtx) : mtx.identity();
		mtx = mask.getMatrix(mask._props.matrix).prependMatrix(mtx);

		var ctx = createjs.DisplayObject._hitTestContext;
		ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);

		// draw the mask as a solid fill:
		mask.graphics.drawAsPath(ctx);
		ctx.fillStyle = "#000";
		ctx.fill();

		if (!this._testHit(ctx)) { return false; }
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, 2, 2);

		return true;
	};

	_getBounds(matrix, ignoreTransform) {
		var bounds = super.getBounds();
		if (bounds) { return this._transformBounds(bounds, matrix, ignoreTransform); }

		var mtx = this._props.matrix;
		mtx = ignoreTransform ? mtx.identity() : this.getMatrix(mtx);
		if (matrix) { mtx.prependMatrix(matrix); }

		var l = this.children.length, rect = null;
		for (var i = 0; i < l; i++) {
			var child = this.children[i];
			if (!child.visible || !(bounds = child._getBounds(mtx))) { continue; }
			if (rect) { rect.extend(bounds.x, bounds.y, bounds.width, bounds.height); }
			else { rect = bounds.clone(); }
		}
		return rect;
	};

}