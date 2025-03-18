(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.xingkong = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 点与其他几何形状的关系
     * @readonly
     * @enum {String}
     * @property {String} DRAWSTATUS.NONE - 未绘制
     * @property {String} DRAWSTATUS.PROCESS - 绘制中
     * @property {String} DRAWSTATUS.DONE - 已会制
     */
    const DRAWSTATUS = {
        NONE: "none",
        PROCESS: "process",
        DONE: "done"
    };

    class Container{
        _sort = 1;

        /**
         * @property {String} _name 容器的名称
         */
        _name = ""

        /**
         * @property {Base[]} _graphicsList 容器中图形集合 
         */
        _graphicsList = [];

        /**
         * @property {DRAWSTATUS} _drawStatus 容器的绘制状态
         */
        _drawStatus = DRAWSTATUS.NONE

        /**
         * 
         * @param {String} name 
         */
        constructor(name){
            this._name = name;
            this.clearGraphics();
        }

        getName(){
            return this._name;
        }

        setSort(sort){
            this._sort = sort;
        }

        addGraphics(graphics){
            if(Array.isArray(graphics)){
                graphics.forEach(el => {
                    this.addGraphics(el);
                });  
            } else {
                this._graphicsList.push(graphics);
                if(this.getDrawStatus() !== DRAWSTATUS.DONE){
                    this.setDrawStatus(DRAWSTATUS.PROCESS);
                }
            }
        }

        getGraphics(){
            return this._graphicsList;
        }

        removeGraphics(graphics){
            const index = this._graphicsList.findIndex(el => el.getId() === graphics.getId());
            if(index !== -1){
                this._graphicsList.splice(index, 1);
            }
        }

        clearGraphics(){
            this.setDrawStatus(DRAWSTATUS.NONE);
            this._graphicsList = [];
        }

        /**
         * 绘制图形
         * @param {CanvasRenderingContext2D} context -绘图上下文
         * @param {Boolean} isRedraw - 是否重新绘制
         */
        render(context, isRedraw = false){
            if(isRedraw){
                this.getGraphics().forEach(el => {
                    el.render(context, true);
                });
            } else {
                if(this.getDrawStatus() === DRAWSTATUS.PROCESS){
                    this.getGraphics().filter(el => el.getDrawStatus() === DRAWSTATUS.NONE).map(el => el.render(context, false));
                }
            }
            this.setDrawStatus(DRAWSTATUS.DONE);
        }

        setDrawStatus(status){
            this._drawStatus = status;
        }

        getDrawStatus(){
            return this._drawStatus;
        }

        toString() {
    		return "[Container (name=" + this.getName() + ")]";
    	}

    }

    let sortBegin = 0;

    class Stage {
      /**
       * @property {HTMLCanvasElement} _element 容器
       */
      _element = null;

      /**
       * @property {CanvasRenderingContext2D} _element 二维渲染上下文
       */
      _context = null;

      /**
       * @property {Object} _containers 容器列表对象
       */
      _containers = {};

      /**
       * @property {Array<String>} _containers 容器名称列表
       */
      _containerNames = [];

      /**
       * @property {Container} _defaultContainer 默认的容器
       */
      _defaultContainer = null;

      /**
       * @property {Number} _width 舞台的宽度
       */
      _width = 0;

      /**
       * @property {Number} _height 舞台的高度
       */
      _height = 0;

      /**
       *
       * @param {string|HTMLCanvasElement} idOrElement
       * @param {String} defaultConainerName
       */
      constructor(idOrElement, defaultConainerName = "default") {
        if (typeof idOrElement === "string") {
          this._element = document.getElementById(idOrElement);
          if (!this._element) {
            throw Error("Unknown attribute id");
          }
        } else if (idOrElement && idOrElement.nodeName === "CANVAS") {
          this._element = idOrElement;
        } else {
          throw Error("unknown element");
        }
        this._context = this._element.getContext("2d");
        this.setSize(this.getElement().clientWidth, this.getElement().clientHeight);
        this._defaultContainer = new Container(defaultConainerName);
        this.addContainer( this._defaultContainer);
      }
      setSize(width = 0, height = 0){
        this._width = width;
        this._height = height;
        this.getElement().width = this._width;
        this.getElement().height = this._height;
        this.clearScreen();
        this.redraw();
      }

      getSize(){
        return [this._width, this._height]
      }

      getElement() {
        return this._element;
      }

      getContext() {
        return this._context;
      }

      addContainer(container) {
        if (container instanceof Container) {
          if (this._containerNames.includes(container.getName())) {
            console.warn("exist container");
          } else {
            container.setSort(++sortBegin);
            this._containers[container.getName()] = container;
            this._containerNames.push(container.getName());
          }
        } else {
          throw Error("unknown container");
        }
      }

      getContainer(name) {
        if (this._containerNames.includes(name)) {
          return this._containers[name];
        } else {
          return this._defaultContainer;
        }
      }

      removeContainer(name){
        if (this._containerNames.includes(name)) {
          this._containerNames = this._containerNames.filter(el => el !== name);
          delete this._containerNames[name];
        }
      }

      setDefaultContainer(name) {
        if (this._containerNames.includes(name)) {
          this._defaultContainer = this._containers[name];
        } else {
          console.warn("set default container error [nonexistent container name]");
        }
      }

      addGraphics(graphics, name) {
        this.getContainer(name).addGraphics(graphics);
      }

      removeGraphics(graphics, name) {
        this.getContainer(name).removeGraphics(graphics);
      }

      clearGraphics(name) {
        this.getContainer(name).clearGraphics();
      }

      clearScreen(){
        this.getContext().clearRect(0,0, this._width, this._height);
      }

      redraw(){
        for (let name of this._containerNames) {
          this._containers[name].render(this.getContext(), true);
        }
      }

      draw() {
        for (let name of this._containerNames) {
          this._containers[name].render(this.getContext(), false);
        }
      }


      toString() {
        return "Stage";
      }
    }

    var matrix$1 = {exports: {}};

    var matrix = matrix$1.exports;

    var hasRequiredMatrix;

    function requireMatrix () {
    	if (hasRequiredMatrix) return matrix$1.exports;
    	hasRequiredMatrix = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  factory(exports) ;
    		})(matrix, (function (exports) {
    		  /**
    		   * EPSILON 判断两个数近似相等的误差范围
    		   */
    		  const EPSILON = 1e-5;

    		  /**
    		   * ARRAY_TYPE 实现矩阵或者向量的内部使用类型
    		   */
    		  const ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;

    		  /**
    		   * 对称四舍五入
    		   * https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
    		   * @param {Number} a
    		   * @returns {Number}
    		   */
    		  function round(a) {
    		    if (a > 0) {
    		      return Math.round(a);
    		    }
    		    return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
    		  }

    		  const degree = Math.PI / 180;

    		  const radian = 180 / Math.PI;

    		  /**
    		   * 弧度转为角度
    		   *
    		   * @param {Number} a
    		   */
    		  function toRadian(a) {
    		    return a * degree;
    		  }

    		  /**
    		   * 角度转为弧度
    		   * @param {Number} a
    		   */
    		  function toDegree(a) {
    		    return a * radian;
    		  }

    		  /**
    		   * 判断2个数是否在允许的误差范围内近似相等
    		   * @param {Number} a 
    		   * @param {Number} b 
    		   * @returns {Boolean}
    		   */
    		  function equals(a, b) {
    		    // Math.max(1.0, Math.abs(a), Math.abs(b)) 是为了动态调整允许的误差范围，确保在不同量级的数值比较中保持合理精度
    		    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
    		  }

    		  var Common = /*#__PURE__*/Object.freeze({
    		    __proto__: null,
    		    ARRAY_TYPE: ARRAY_TYPE,
    		    EPSILON: EPSILON,
    		    equals: equals,
    		    round: round,
    		    toDegree: toDegree,
    		    toRadian: toRadian
    		  });

    		  class Vec3 {
    		    _value = null;
    		    constructor() {
    		      this._value = new ARRAY_TYPE(3);
    		      if (ARRAY_TYPE !== Float32Array) {
    		        this.set(0, 0, 0);
    		      }
    		    }

    		    static fromValues(x, y, z) {
    		      let result = new Vec3();
    		      result.set(x, y, z);
    		      return result;
    		    }

    		    static ceil(vec3) {
    		      return Vec3.fromValues(
    		        Math.ceil(vec3.get("x")),
    		        Math.ceil(vec3.get("y")),
    		        Math.ceil(vec3.get("z"))
    		      );
    		    }

    		    static floor(vec3) {
    		      return Vec3.fromValues(
    		        Math.floor(vec3.get("x")),
    		        Math.floor(vec3.get("y")),
    		        Math.floor(vec3.get("z"))
    		      );
    		    }

    		    static round(vec3) {
    		      return Vec3.fromValues(
    		        round(vec3.get("x")),
    		        round(vec3.get("y")),
    		        round(vec3.get("z"))
    		      );
    		    }

    		    static linerInterpolation(vec3_1, vec3_2, t) {
    		      let result = new Vec3();
    		      const x = vec3_1.get("x") + (vec3_2.get("x") - vec3_1.get("x")) * t;
    		      const y = vec3_1.get("y") + (vec3_2.get("y") - vec3_1.get("y")) * t;
    		      const z = vec3_1.get("z") + (vec3_2.get("z") - vec3_1.get("z")) * t;
    		      result.set(x, y, z);
    		      return result;
    		    }

    		    get(component) {
    		      switch (component) {
    		        case "x":
    		          return this._value[0];
    		        case "y":
    		          return this._value[1];
    		        case "z":
    		          return this._value[2];
    		        default:
    		          throw Error("unknown vector component");
    		      }
    		    }

    		    set(x, y, z) {
    		      this._value[0] = x;
    		      this._value[1] = y;
    		      this._value[2] = z;
    		    }

    		    clone() {
    		      let result = new Vec3();
    		      result.set(this.get("x"), this.get("y"), this.get("z"));
    		      return result;
    		    }

    		    copy(vec3) {
    		      this.set(vec3.get("x"), vec3.get("y"), vec3.get("z"));
    		    }

    		    add(vec3) {
    		      this.set(
    		        this.get("x") + vec3.get("x"),
    		        this.get("y") + vec3.get("y"),
    		        this.get("z") + vec3.get("z")
    		      );
    		    }

    		    subtract(vec3) {
    		      this.set(
    		        this.get("x") - vec3.get("x"),
    		        this.get("y") - vec3.get("y"),
    		        this.get("z") - vec3.get("z")
    		      );
    		    }

    		    multiply(vec3) {
    		      this.set(
    		        this.get("x") * vec3.get("x"),
    		        this.get("y") * vec3.get("y"),
    		        this.get("z") * vec3.get("z")
    		      );
    		    }

    		    divide(vec3) {
    		      this.set(
    		        this.get("x") / vec3.get("x"),
    		        this.get("y") / vec3.get("y"),
    		        this.get("z") / vec3.get("z")
    		      );
    		    }

    		    scale(ratio) {
    		      this.set(
    		        this.get("x") * ratio,
    		        this.get("y") * ratio,
    		        this.get("z") * ratio
    		      );
    		    }

    		    squaredDistance(vec3) {
    		      const x = this.get("x") - vec3.get("x");
    		      const y = this.get("y") - vec3.get("y");
    		      const z = this.get("z") - vec3.get("z");
    		      return x * x + y * y + z * z;
    		    }

    		    distance(vec3) {
    		      return Math.sqrt(this.squaredDistance(vec3));
    		    }

    		    squaredLength() {
    		      const x = this.get("x");
    		      const y = this.get("y");
    		      const z = this.get("z");
    		      return x * x + y * y + z * z;
    		    }

    		    length() {
    		      return Math.sqrt(this.squaredLength());
    		    }

    		    negate() {
    		      this.scale(-1);
    		    }

    		    inverse() {
    		      this.set(1 / this.get("x"), 1 / this.get("y"), 1 / this.get("z"));
    		    }

    		    normalize() {
    		      let length = this.length();
    		      if (length != 0) {
    		        length = 1 / length;
    		      }
    		      this.scale(length);
    		    }

    		    dot(vec3) {
    		      return (
    		        this.get("x") * vec3.get("x") +
    		        this.get("y") * vec3.get("y") +
    		        this.get("z") * vec3.get("z")
    		      );
    		    }

    		    cross(vec3) {
    		      const x = this.get("y") * vec3.get("z") - this.get("z") * vec3.get("y");
    		      const y = this.get("z") * vec3.get("x") - this.get("x") * vec3.get("z");
    		      const z = this.get("x") * vec3.get("y") - this.get("y") * vec3.get("x");
    		      const result = new Vec3();
    		      result.set(x, y, z);
    		      return result;
    		    }

    		    rotateX(vec3, rad) {
    		      let p = [];
    		      let r = [];
    		      p[0] = this.get("x") - vec3.get("x");
    		      p[1] = this.get("y") - vec3.get("y");
    		      p[2] = this.get("z") - vec3.get("z");

    		      r[0] = p[0];
    		      r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    		      r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);

    		      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    		    }

    		    rotateY(vec3, rad) {
    		      let p = [];
    		      let r = [];
    		      p[0] = this.get("x") - vec3.get("x");
    		      p[1] = this.get("y") - vec3.get("y");
    		      p[2] = this.get("z") - vec3.get("z");

    		      r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    		      r[1] = p[1];
    		      r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);

    		      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    		    }

    		    rotateZ(vec3, rad) {
    		      let p = [];
    		      let r = [];
    		      p[0] = this.get("x") - vec3.get("x");
    		      p[1] = this.get("y") - vec3.get("y");
    		      p[2] = this.get("z") - vec3.get("z");

    		      r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    		      r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    		      r[2] = p[2];

    		      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    		    }

    		    angle(vec3) {
    		      const mag = Math.sqrt(this.squaredLength() * vec3.squaredLength());
    		      cosine = mag && this.dot(vec3) / mag;
    		      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    		    }

    		    exactEquals(vec3) {
    		      return (
    		        this.get("x") === vec3.get("x") &&
    		        this.get("y") === vec3.get("y") &&
    		        this.get("z") === vec3.get("z")
    		      );
    		    }

    		    /**
    		     * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
    		     *
    		     * @param {Vec3} vec3
    		     * @returns {Vec3}
    		     */
    		    equals(vec3) {
    		      return (
    		        equals(this.get("x"), vec3.get("x")) &&
    		        equals(this.get("y"), vec3.get("y")) &&
    		        equals(this.get("z"), vec3.get("z"))
    		      );
    		    }

    		    /**
    		     * 返回vec3的字符串描述
    		     *
    		     * @returns {string}
    		     */
    		    toString() {
    		      return (
    		        "vec3(" +
    		        this.get("x") +
    		        ", " +
    		        this.get("y") +
    		        ", " +
    		        this.get("z") +
    		        ")"
    		      );
    		    }
    		  }

    		  class Vec2 {
    		    _value = null;
    		    constructor() {
    		      this._value = new ARRAY_TYPE(2);
    		      if (ARRAY_TYPE !== Float32Array) {
    		        this.set(0,0);
    		      }
    		    }

    		    /**
    		     * 使用2个值创建一个二维向量
    		     * 
    		     * @method fromValues
    		     * @param {Number} x 
    		     * @param {Number} y 
    		     * @returns {Vec2}
    		     */
    		    static fromValues(x, y) {
    		      let result = new Vec2();
    		      result.set(x,y);
    		      return result;
    		    }

    		    /**
    		     * 将二维向量的各个分量取整
    		     * @method ceil
    		     * @param {Vec2} vec2 
    		     * @returns {Vec2}
    		     */
    		    static ceil(vec2) {
    		      return Vec2.fromValues(
    		        Math.ceil(vec2.get("x")),
    		        Math.ceil(vec2.get("y"))
    		      );
    		    }

    		    static floor(vec2) {
    		      return Vec2.fromValues(
    		        Math.floor(vec2.get("x")),
    		        Math.floor(vec2.get("y"))
    		      );
    		    }

    		    static round(vec2) {
    		      return Vec2.fromValues(round(vec2.get("x")), round(vec2.get("y")));
    		    }

    		    static linerInterpolation(vec2_1, vec2_2, t){
    		      let result = new Vec2();
    		      const x = vec2_1.get("x") +  (vec2_2.get("x") - vec2_1.get("x")) * t;
    		      const y = vec2_1.get("y") +  (vec2_2.get("y") - vec2_1.get("y")) * t;
    		      result.set(x,y);
    		      return result
    		    }

    		    clone() {
    		      let result = new Vec2();
    		      result.set(this.get("x"), this.get("y"));
    		      return result;
    		    }

    		    copy(vec2) {
    		      this.set(vec2.get("x"), vec2.get("y"));
    		    }

    		    get(component){
    		      switch(component){
    		        case "x":
    		          return this._value[0];
    		        case "y":
    		          return this._value[1];
    		        default:
    		          throw Error("unknown vector component")
    		      }
    		    }

    		    set(x, y) {
    		      this._value[0] = x;
    		      this._value[1] = y;
    		    }

    		    add(vec2) {
    		      this.set(this.get("x") + vec2.get("x"), this.get("y") + vec2.get("y"));
    		    }

    		    subtract(vec2) {
    		      this.set(this.get("x") - vec2.get("x"), this.get("y") - vec2.get("y"));
    		    }

    		    multiply(vec2) {
    		      this.set(this.get("x") * vec2.get("x"), this.get("y") * vec2.get("y"));
    		    }

    		    divide(vec2) {
    		      this.set(this.get("x") / vec2.get("x"), this.get("y") / vec2.get("y"));
    		    }

    		    scale(ratio) {
    		      this.set(this.get("x") * ratio, this.get("y") * ratio);
    		    }

    		    squaredDistance(vec2) {
    		      const x = this.get("x") - vec2.get("x");
    		      const y = this.get("y") - vec2.get("y");
    		      return x * x + y * y;
    		    }

    		    distance(vec2) {
    		      return Math.sqrt(this.squaredDistance(vec2));
    		    }

    		    squaredLength() {
    		      const x = this.get("x");
    		      const y = this.get("y");
    		      return x * x + y * y;
    		    }

    		    length() {
    		      return Math.sqrt(this.squaredLength);
    		    }

    		    negate() {
    		      this.scale(-1);
    		    }

    		    inverse() {
    		      this.set(1 / this.get("x"),  1 / this.get("y"));
    		    }

    		    normalize() {
    		      let length = this.length();
    		      if (length != 0) {
    		        length = 1 / length;
    		      }
    		      this.scale(length);
    		    }

    		    dot(vec2) {
    		      return this.get("x") * vec2.get("x") + this.get("y") * vec2.get("y");
    		    }

    		    cross(vec2) {
    		      const z = this.get("x") * vec2.get("y") - this.get("y") * vec2.get("x");
    		      const result = new Vec3();
    		      result.set(0, 0, z);
    		      return result;
    		    }

    		    rotate(vec2, rad){
    		      let x = this.get("x") - vec2.get("x");
    		      let y = this.get("y") - vec2.get("y");
    		      const sinC = Math.sin(rad);
    		      const cosC = Math.cos(rad);
    		      x = x * cosC - y * sinC + vec2.get("x");
    		      y  = y * sinC + x * cosC + vec2.get("y");
    		      let result = new Vec2();
    		      result.set(x, y);
    		      return result
    		    }

    		    /**
    		     * 获取两个向量之间的夹角
    		     * 
    		     * @param {Vec2} vec2 
    		     * @returns {Number}
    		     */
    		    angle(vec2){
    		      const mag = Math.sqrt(this.squaredLength() * vec2.squaredLength());
    		      cosine = mag && this.dot(vec2) / mag;
    		      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    		    }

    		    exactEquals(vec2){
    		      return this.get("x") === vec2.get("x") && this.get("y") === vec2.get("y")
    		    }

    		    /**
    		     * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
    		     * 
    		     * @param {Vec2} vec2 
    		     * 
    		     * @returns {vec2}
    		     */
    		    equals(vec2){
    		      return equals(this.get("x"), vec2.get("x")) && equals(this.get("y"), vec2.get("y"))
    		    }

    		    /**
    		     * 返回vec2的字符串描述
    		     * 
    		     * @returns {string}
    		     */
    		    toString(){
    		      return "vec2(" + this.get("x") + ", " + this.get("y")  + ")";
    		    }
    		  }

    		  class Vec4 {
    		    _value = null;
    		    constructor() {
    		      this._value = new ARRAY_TYPE(4);
    		      if (ARRAY_TYPE !== Float32Array) {
    		        this.set(0, 0, 0, 0);
    		      }
    		    }

    		    static fromValues(x, y, z, w) {
    		      let result = new Vec4();
    		      result.set(x, y, z, w);
    		      return result;
    		    }

    		    static ceil(vec4) {
    		      return Vec4.fromValues(
    		        Math.ceil(vec4.get("x")),
    		        Math.ceil(vec4.get("y")),
    		        Math.ceil(vec4.get("z")),
    		        Math.ceil(vec4.get("w"))
    		      );
    		    }

    		    static floor(vec4) {
    		      return Vec4.fromValues(
    		        Math.floor(vec4.get("x")),
    		        Math.floor(vec4.get("y")),
    		        Math.floor(vec4.get("z")),
    		        Math.floor(vec4.get("w"))
    		      );
    		    }

    		    static round(vec4) {
    		      return Vec4.fromValues(
    		        round(vec4.get("x")),
    		        round(vec4.get("y")),
    		        round(vec4.get("z")),
    		        round(vec4.get("w"))
    		      );
    		    }

    		    static linerInterpolation(vec4_1, vec4_2, t) {
    		      let result = new Vec4();
    		      const x = vec4_1.get("x") + (vec4_2.get("x") - vec4_1.get("x")) * t;
    		      const y = vec4_1.get("y") + (vec4_2.get("y") - vec4_1.get("y")) * t;
    		      const z = vec4_1.get("z") + (vec4_2.get("z") - vec4_1.get("z")) * t;
    		      result.set(x, y, z);
    		      return result;
    		    }

    		    get(component) {
    		      switch (component) {
    		        case "x":
    		          return this._value[0];
    		        case "y":
    		          return this._value[1];
    		        case "z":
    		          return this._value[2];
    		        case "4": 
    		          return this._value[3]
    		        default:
    		          throw Error("unknown vector component");
    		      }
    		    }

    		    set(x, y, z, w) {
    		      this._value[0] = x;
    		      this._value[1] = y;
    		      this._value[2] = z;
    		      this._value[4] = w;
    		    }

    		    clone() {
    		      let result = new Vec4();
    		      result.set(this.get("x"), this.get("y"), this.get("z"), this.get("w"));
    		      return result;
    		    }

    		    copy(vec4) {
    		      this.set(vec4.get("x"), vec4.get("y"), vec4.get("z"), vec4.get("w"));
    		    }

    		    add(vec4) {
    		      this.set(
    		        this.get("x") + vec4.get("x"),
    		        this.get("y") + vec4.get("y"),
    		        this.get("z") + vec4.get("z"),
    		        this.get("w") + vec4.get("w")
    		      );
    		    }

    		    subtract(vec4) {
    		      this.set(
    		        this.get("x") - vec4.get("x"),
    		        this.get("y") - vec4.get("y"),
    		        this.get("z") - vec4.get("z"),
    		        this.get("w") - vec4.get("w")
    		      );
    		    }

    		    multiply(vec4) {
    		      this.set(
    		        this.get("x") * vec4.get("x"),
    		        this.get("y") * vec4.get("y"),
    		        this.get("z") * vec4.get("z"),
    		        this.get("w") * vec4.get("w")
    		      );
    		    }

    		    divide(vec4) {
    		      this.set(
    		        this.get("x") / vec4.get("x"),
    		        this.get("y") / vec4.get("y"),
    		        this.get("z") / vec4.get("z"),
    		        this.get("w") / vec4.get("w")
    		      );
    		    }

    		    scale(ratio) {
    		      this.set(
    		        this.get("x") * ratio,
    		        this.get("y") * ratio,
    		        this.get("z") * ratio,
    		        this.get("w") * ratio
    		      );
    		    }

    		    squaredDistance(vec4) {
    		      const x = this.get("x") - vec4.get("x");
    		      const y = this.get("y") - vec4.get("y");
    		      const z = this.get("z") - vec4.get("z");
    		      const w = this.get("w") - vec4.get("w");
    		      return x * x + y * y + z * z + w * w;
    		    }

    		    distance(vec4) {
    		      return Math.sqrt(this.squaredDistance(vec4));
    		    }

    		    squaredLength() {
    		      const x = this.get("x");
    		      const y = this.get("y");
    		      const z = this.get("z");
    		      const w = this.get("w");
    		      return x * x + y * y + z * z + w * w;
    		    }

    		    length() {
    		      return Math.sqrt(this.squaredLength());
    		    }

    		    negate() {
    		      this.scale(-1);
    		    }

    		    inverse() {
    		      this.set(1 / this.get("x"), 1 / this.get("y"), 1 / this.get("z"), 1 / this.get("w"));
    		    }

    		    normalize() {
    		      let length = this.length();
    		      if (length != 0) {
    		        length = 1 / length;
    		      }
    		      this.scale(length);
    		    }

    		    dot(vec4) {
    		      return (
    		        this.get("x") * vec4.get("x") +
    		        this.get("y") * vec4.get("y") +
    		        this.get("z") * vec4.get("z") + 
    		        this.get("w") * vec4.get("w")
    		      );
    		    }

    		    exactEquals(vec4) {
    		      return (
    		        this.get("x") === vec4.get("x") &&
    		        this.get("y") === vec4.get("y") &&
    		        this.get("z") === vec4.get("z") &&
    		        this.get("w") === vec4.get("w")
    		      );
    		    }

    		    /**
    		     * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
    		     *
    		     * @param {Vec4} vec4
    		     * @returns {Vec4}
    		     */
    		    equals(vec4) {
    		      return (
    		        equals(this.get("x"), vec4.get("x")) &&
    		        equals(this.get("y"), vec4.get("y")) &&
    		        equals(this.get("z"), vec4.get("z")) &&
    		        equals(this.get("w"), vec4.get("w"))
    		      );
    		    }

    		    /**
    		     * 返回vec4的字符串描述
    		     *
    		     * @returns {string}
    		     */
    		    toString() {
    		      return (
    		        "vec4(" +
    		        this.get("x") +
    		        ", " +
    		        this.get("y") +
    		        ", " +
    		        this.get("z") +
    		        ", " +
    		        this.get("w") +
    		        ")"
    		      );
    		    }
    		  }

    		  let Mat2$1 = class Mat2 {
    		    _value = [];

    		    /**
    		     * 初始化一个二维矩阵
    		     *
    		     * [1,0
    		     *  0,1]
    		     */
    		    constructor() {
    		      this._value = new ARRAY_TYPE(4);
    		      this.identity();
    		    }

    		    static fromValues(m00, m01, m10, m11) {
    		      const result = new Mat2();
    		      this.set(m00, m01, m10, m11);
    		      return result;
    		    }

    		    set(m00, m01, m10, m11) {
    		      this.set00(m00);
    		      this.set01(m01);
    		      this.set10(m10);
    		      this.set11(m11);
    		    }

    		    set00(val) {
    		      this._value[0] = val;
    		    }

    		    set01(val) {
    		      this._value[1] = val;
    		    }

    		    set10(val) {
    		      this._value[2] = val;
    		    }

    		    set11(val) {
    		      this._value[3] = val;
    		    }

    		    get00() {
    		      return this._value[0];
    		    }

    		    get01() {
    		      return this._value[1];
    		    }

    		    get10() {
    		      return this._value[2];
    		    }

    		    get11() {
    		      return this._value[3];
    		    }

    		    clone() {
    		      const result = new Mat2();
    		      result.set00(this.get00());
    		      result.set01(this.get01());
    		      result.set10(this.get10());
    		      result.set11(this.get11());
    		      return result;
    		    }

    		    copy(mat2) {
    		      this.set00(mat2.get00());
    		      this.set01(mat2.get01());
    		      this.set10(mat2.get10());
    		      this.set11(mat2.get11());
    		    }

    		    identity() {
    		      this.set00(1);
    		      this.set01(0);
    		      this.set10(0);
    		      this.set11(1);
    		    }

    		    transpose() {
    		      const m01 = this.get01();
    		      const m10 = this.get10();
    		      this.set01(m10);
    		      this.set10(m01);
    		    }

    		    invert() {
    		      let det = this.determinant();

    		      if (!det) {
    		        return null;
    		      }
    		      det = 1 / det;
    		      const result = new Mat2();
    		      result.set(
    		        this.get00() / det,
    		        -this.get01() / det,
    		        -this.get10() / det,
    		        this.get11() / det
    		      );
    		      return result;
    		    }

    		    adjugate() {
    		      const result = new Mat2();
    		      result.set(this.get11(), -this.get01(), -this.get10(), this.get00());
    		      return result;
    		    }

    		    determinant() {
    		      return this.get00() * this.get11() - this.get01() * this.get10();
    		    }

    		    multiply(mat2) {
    		      const m00 = this.get00() * mat2.get00() + this.get10() * mat2.get01();
    		      const m01 = this.get00() * mat2.get10() + this.get01() * mat2.get11();
    		      const m02 = this.get10() * mat2.get00() + this.get11() * mat2.get10();
    		      const m03 = this.get10() * mat2.get01() + this.get11() * mat2.get11();
    		      const result = new Mat2();
    		      result.set(m00, m01, m02, m03);
    		      return result;
    		    }

    		    rotate(rad) {
    		      let s = Math.sin(rad);
    		      let c = Math.cos(rad);
    		      const m00 = this.get00() * c + this.get10() * s;
    		      const m01 = this.get01() * c + this.get11() * s;
    		      const m02 = this.get00() * s + this.get10() * c;
    		      const m03 = this.get01() * s + this.get11() * c;
    		      this.set(m00, m01, m02, m03);
    		    }

    		    scale(vec2) {
    		      this.set(
    		        this.get00() * vec2.get("x"),
    		        this.get01() * vec2.get("x"),
    		        this.get10() * vec2.get("y"),
    		        this.get11() * vec2.get("y")
    		      );
    		    }

    		    add(mat2) {
    		      const m00 = this.get00() + mat2.get00();
    		      const m01 = this.get01() + mat2.get01();
    		      const m02 = this.get10() + mat2.get10();
    		      const m03 = this.get11() + mat2.get11();
    		      this.set(m00, m01, m02, m03);
    		    }

    		    subtract(mat2) {
    		      const m00 = this.get00() - mat2.get00();
    		      const m01 = this.get01() - mat2.get01();
    		      const m02 = this.get10() - mat2.get10();
    		      const m03 = this.get11() - mat2.get11();
    		      this.set(m00, m01, m02, m03);
    		    }

    		    exactEquals(mat2) {
    		      return (
    		        this.get00() === mat2.get00() &&
    		        this.get01() === mat2.get01() &&
    		        this.get10() === mat2.get10() &&
    		        this.get11() === mat2.get11()
    		      );
    		    }

    		    equals(mat2) {
    		      return (
    		        equals(this.get00(), mat2.get00()) &&
    		        equals(this.get01(), mat2.get01()) &&
    		        equals(this.get10(), mat2.get10()) &&
    		        equals(this.get11(), mat2.get11())
    		      );
    		    }

    		    toString() {
    		      return `Mat2(${this.get00()},${this.get01()},${this.get10()},${this.get11()})`;
    		    }
    		  };

    		  class Mat3 {
    		    _value = [];

    		    /**
    		     * 初始化一个三维矩阵
    		     *
    		     * [1,0,0
    		     *  0,1,0,
    		     *  0,0,1]
    		     */
    		    constructor() {
    		      this._value = new ARRAY_TYPE(9);
    		      this.identity();
    		    }

    		    static fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    		      const result = new Mat3();
    		      this.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    		      return result;
    		    }

    		    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    		      this.set00(m00);
    		      this.set01(m01);
    		      this.set02(m02);
    		      this.set10(m10);
    		      this.set11(m11);
    		      this.set12(m12);
    		      this.set20(m20);
    		      this.set21(m21);
    		      this.set22(m22);
    		    }

    		    set00(val) {
    		      this._value[0] = val;
    		    }

    		    set01(val) {
    		      this._value[1] = val;
    		    }
    		    set02(val) {
    		      this._value[2] = val;
    		    }

    		    set10(val) {
    		      this._value[3] = val;
    		    }

    		    set11(val) {
    		      this._value[4] = val;
    		    }
    		    set12(val) {
    		      this._value[5] = val;
    		    }
    		    set20(val) {
    		      this._value[6] = val;
    		    }

    		    set21(val) {
    		      this._value[7] = val;
    		    }
    		    set22(val) {
    		      this._value[8] = val;
    		    }

    		    get00() {
    		      return this._value[0];
    		    }
    		    get01() {
    		      return this._value[1];
    		    }
    		    get02() {
    		      return this._value[2];
    		    }
    		    get10() {
    		      return this._value[3];
    		    }
    		    get11() {
    		      return this._value[4];
    		    }
    		    get12() {
    		      return this._value[5];
    		    }
    		    get20() {
    		      return this._value[6];
    		    }
    		    get21() {
    		      return this._value[7];
    		    }
    		    get22() {
    		      return this._value[8];
    		    }

    		    clone() {
    		      const result = new Mat2();
    		      result.set00(this.get00());
    		      result.set01(this.get01());
    		      result.set02(this.get02());
    		      result.set10(this.get10());
    		      result.set11(this.get11());
    		      result.set12(this.get12());
    		      result.set20(this.get20());
    		      result.set21(this.get21());
    		      result.set22(this.get22());
    		      return result;
    		    }

    		    copy(mat2) {
    		      this.set00(mat2.get00());
    		      this.set01(mat2.get01());
    		      this.set02(mat2.get02());
    		      this.set10(mat2.get10());
    		      this.set11(mat2.get11());
    		      this.set12(mat2.get12());
    		      this.set20(mat2.get20());
    		      this.set21(mat2.get21());
    		      this.set22(mat2.get22());
    		    }

    		    identity() {
    		      this.set00(1);
    		      this.set01(0);
    		      this.set02(0);
    		      this.set10(0);
    		      this.set11(1);
    		      this.set12(0);
    		      this.set20(0);
    		      this.set21(0);
    		      this.set22(1);
    		    }

    		    transpose() {
    		      const m01 = this.get01();
    		      const m02 = this.get02();
    		      const m10 = this.get10();
    		      const m12 = this.get12();
    		      const m20 = this.get20();
    		      const m21 = this.get21();
    		      this.set01(m10);
    		      this.set02(m20);
    		      this.set10(m01);
    		      this.set12(m21);
    		      this.set20(m02);
    		      this.set21(m12);
    		    }

    		    invert() {
    		      let det = this.determinant();

    		      if (!det) {
    		        return null;
    		      }
    		      det = 1 / det;
    		      const result = new Mat3();
    		      const m00 = this.get11() * this.get22() - this.get12() * this.get21();
    		      const m01 = this.get12() * this.get20() - this.get10() * this.get22();
    		      const m02 = this.get10() * this.get21() - this.get11() * this.get20();
    		      const m10 = this.get02() * this.get21() - this.get01() * this.get22(); 
    		      const m11 = this.get00() * this.get22() - this.get02() * this.get20();
    		      const m12 = this.get01() * this.get20() - this.get00() * this.get21();
    		      const m20 = this.get01() * this.get12() - this.get11() * this.get02();
    		      const m21 = this.get02() * this.get10() - this.get00() * this.get22();
    		      const m22 = this.get00() * this.get11() - this.get01() * this.get11();
    		      result.set00(m00 * det );
    		      result.set01(m10 * det);
    		      result.set02(m20 * det);
    		      result.set10(m01 * det);
    		      result.set11(m11 * det);
    		      result.set12(m21 * det);
    		      result.set20(m02 * det);
    		      result.set21(m12 * det);
    		      result.set22(m22 * det);
    		      return result;
    		    }

    		    adjugate() {
    		      const result = new Mat3();
    		      const m00 = this.get11() * this.get22() - this.get12() * this.get21();
    		      const m01 = this.get12() * this.get20() - this.get10() * this.get22();
    		      const m02 = this.get10() * this.get21() - this.get11() * this.get20();
    		      const m10 = this.get02() * this.get21() - this.get01() * this.get22(); 
    		      const m11 = this.get00() * this.get22() - this.get02() * this.get20();
    		      const m12 = this.get01() * this.get20() - this.get00() * this.get21();
    		      const m20 = this.get01() * this.get12() - this.get11() * this.get02();
    		      const m21 = this.get02() * this.get10() - this.get00() * this.get22();
    		      const m22 = this.get00() * this.get11() - this.get01() * this.get11();
    		      this.set00(m00);
    		      this.set01(m10);
    		      this.set02(m20);
    		      this.set10(m01);
    		      this.set11(m11);
    		      this.set12(m21);
    		      this.set20(m02);
    		      this.set21(m12);
    		      this.set22(m22);
    		      return result;
    		    }

    		    determinant() {
    		      return (
    		        this.get00() * this.get11() * this.get22() +
    		          this.get01() * this.get12() * this.get20() +
    		          this.get02() * this.get10() * this.get21() -  
    		          this.get02() * this.get11() * this.get20() -
    		          this.get01() * this.get10() * this.get21() -
    		          this.get00() * this.get21() * this.get12()
    		      );
    		    }

    		    multiply(mat3) {
    		      const m00 = this.get00() * mat3.get00() + this.get10() * mat3.get01() + this.get20() * mat3.get02();
    		      const m01 = this.get01() * mat3.get00() + this.get11() * mat3.get01() + this.get21() * mat3.get02();
    		      const m02 = this.get02() * mat2.get00() + this.get12() * mat2.get01() + this.get22() * mat3.get02();
    		      
    		      const m10 = this.get00() * mat3.get10() + this.get10() * mat3.get11() + this.get20() * mat3.get12();
    		      const m11 = this.get01() * mat3.get10() + this.get11() * mat3.get11() + this.get21() * mat3.get12();
    		      const m12 = this.get02() * mat2.get10() + this.get12() * mat2.get11() + this.get22() * mat3.get12();

    		      const m20 = this.get00() * mat3.get20() + this.get10() * mat3.get21() + this.get20() * mat3.get22();
    		      const m21 = this.get01() * mat3.get20() + this.get11() * mat3.get21() + this.get21() * mat3.get22();
    		      const m22 = this.get02() * mat2.get20() + this.get12() * mat2.get21() + this.get22() * mat3.get22();
    		      const result = new Mat3();
    		      result.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    		      return result;
    		    }

    		    add(mat3) {
    		      this.set00(this.get00() + mat3.get00());
    		      this.set01(this.get01() + mat3.get01());
    		      this.set02(this.get02() + mat3.get02());
    		      this.set10(this.get10() + mat3.get10());
    		      this.set11(this.get11() + mat3.get11());
    		      this.set12(this.get12() + mat3.get12());
    		      this.set20(this.get20() + mat3.get20());
    		      this.set21(this.get21() + mat3.get21());
    		      this.set22(this.get22() + mat3.get22());
    		    }

    		    subtract(mat3) {
    		      this.set00(this.get00() - mat3.get00());
    		      this.set01(this.get01() - mat3.get01());
    		      this.set02(this.get02() - mat3.get02());
    		      this.set10(this.get10() - mat3.get10());
    		      this.set11(this.get11() - mat3.get11());
    		      this.set12(this.get12() - mat3.get12());
    		      this.set20(this.get20() - mat3.get20());
    		      this.set21(this.get21() - mat3.get21());
    		      this.set22(this.get22() - mat3.get22());
    		    }

    		    exactEquals(mat3) {
    		      return (
    		        this.get00() === mat3.get00() &&
    		        this.get01() === mat3.get01() &&
    		        this.get02() === mat3.get02() &&
    		        this.get10() === mat3.get10() &&
    		        this.get11() === mat3.get11() &&
    		        this.get12() === mat3.get12() &&
    		        this.get20() === mat3.get20() &&
    		        this.get21() === mat3.get21() &&
    		        this.get22() === mat3.get22()
    		      );
    		    }

    		    equals(mat2) {
    		      return (
    		        equals(this.get00(), mat2.get00()) &&
    		        equals(this.get01(), mat2.get01()) &&
    		        equals(this.get02(), mat2.get02()) &&
    		        equals(this.get10(), mat2.get10()) &&
    		        equals(this.get11(), mat2.get11()) &&
    		        equals(this.get12(), mat2.get12()) &&
    		        equals(this.get20(), mat2.get20()) &&
    		        equals(this.get21(), mat2.get21()) &&
    		        equals(this.get22(), mat2.get22())
    		      );
    		    }

    		    toString() {
    		      return `Mat3(${this.get00()},${this.get01()},${this.get02()},${this.get10()},${this.get11()},${this.get12()},${this.get20()},${this.get21()},${this.get22()}})`;
    		    }
    		  }

    		  class Mat4 {
    		    _value = [];

    		    /**
    		     * 初始化一个三维矩阵
    		     *
    		     * [1,0,0
    		     *  0,1,0,
    		     *  0,0,1]
    		     */
    		    constructor() {
    		      this._value = new ARRAY_TYPE(16);
    		      this.identity();
    		    }

    		    static fromValues(
    		      m00,
    		      m01,
    		      m02,
    		      m03,
    		      m10,
    		      m11,
    		      m12,
    		      m13,
    		      m20,
    		      m21,
    		      m22,
    		      m23,
    		      m30,
    		      m31,
    		      m32,
    		      m33
    		    ) {
    		      const result = new Mat4();
    		      this.set(
    		        m00,
    		        m01,
    		        m02,
    		        m03,
    		        m10,
    		        m11,
    		        m12,
    		        m13,
    		        m20,
    		        m21,
    		        m22,
    		        m23,
    		        m30,
    		        m31,
    		        m32,
    		        m33
    		      );
    		      return result;
    		    }

    		    set(
    		      m00,
    		      m01,
    		      m02,
    		      m03,
    		      m10,
    		      m11,
    		      m12,
    		      m13,
    		      m20,
    		      m21,
    		      m22,
    		      m23,
    		      m30,
    		      m31,
    		      m32,
    		      m33
    		    ) {
    		      this.set00(m00);
    		      this.set01(m01);
    		      this.set02(m02);
    		      this.set03(m03);
    		      this.set10(m10);
    		      this.set11(m11);
    		      this.set12(m12);
    		      this.set13(m13);
    		      this.set20(m20);
    		      this.set21(m21);
    		      this.set22(m22);
    		      this.set23(m23);
    		      this.set30(m30);
    		      this.set31(m31);
    		      this.set32(m32);
    		      this.set33(m33);
    		    }

    		    set00(val) {
    		      this._value[0] = val;
    		    }

    		    set01(val) {
    		      this._value[1] = val;
    		    }
    		    set02(val) {
    		      this._value[2] = val;
    		    }

    		    set03(val) {
    		      this._value[3] = val;
    		    }

    		    set10(val) {
    		      this._value[4] = val;
    		    }

    		    set11(val) {
    		      this._value[5] = val;
    		    }
    		    set12(val) {
    		      this._value[6] = val;
    		    }
    		    set13(val) {
    		      this._value[7] = val;
    		    }
    		    set20(val) {
    		      this._value[8] = val;
    		    }

    		    set21(val) {
    		      this._value[9] = val;
    		    }
    		    set22(val) {
    		      this._value[10] = val;
    		    }

    		    set23(val) {
    		      this._value[11] = val;
    		    }
    		    set30(val) {
    		      this._value[12] = val;
    		    }
    		    set31(val) {
    		      this._value[13] = val;
    		    }
    		    set32(val) {
    		      this._value[14] = val;
    		    }

    		    set33(val) {
    		      this._value[15] = val;
    		    }

    		    get00() {
    		      return this._value[0];
    		    }

    		    get01() {
    		      return this._value[1];
    		    }
    		    get02() {
    		      return this._value[2];
    		    }

    		    get03() {
    		      return this._value[3];
    		    }

    		    get10() {
    		      return this._value[4];
    		    }

    		    get11() {
    		      return this._value[5];
    		    }
    		    get12() {
    		      return this._value[6];
    		    }
    		    get13() {
    		      return this._value[7];
    		    }
    		    get20() {
    		      return this._value[8];
    		    }

    		    get21() {
    		      return this._value[9];
    		    }
    		    get22() {
    		      return this._value[10];
    		    }

    		    get23() {
    		      return this._value[11];
    		    }
    		    get30() {
    		      return this._value[12];
    		    }
    		    get31() {
    		      return this._value[13];
    		    }
    		    get32() {
    		      return this._value[14];
    		    }

    		    get33() {
    		      return this._value[15];
    		    }

    		    clone() {
    		      const result = new Mat4();
    		      result.set00(this.get00());
    		      result.set01(this.get01());
    		      result.set02(this.get02());
    		      result.set03(this.get03());
    		      result.set10(this.get10());
    		      result.set11(this.get11());
    		      result.set12(this.get12());
    		      result.set13(this.get13());
    		      result.set20(this.get20());
    		      result.set21(this.get21());
    		      result.set22(this.get22());
    		      result.set23(this.get23());
    		      result.set30(this.get30());
    		      result.set31(this.get31());
    		      result.set32(this.get32());
    		      result.set33(this.get33());
    		      return result;
    		    }

    		    copy(mat4) {
    		      this.set00(mat4.get00());
    		      this.set01(mat4.get01());
    		      this.set02(mat4.get02());
    		      this.set03(mat4.get03());
    		      this.set10(mat4.get10());
    		      this.set11(mat4.get11());
    		      this.set12(mat4.get12());
    		      this.set13(mat4.get13());
    		      this.set20(mat4.get20());
    		      this.set21(mat4.get21());
    		      this.set22(mat4.get22());
    		      this.set23(mat4.get23());
    		      this.set30(mat4.get30());
    		      this.set31(mat4.get31());
    		      this.set32(mat4.get32());
    		      this.set33(mat4.get33());
    		    }

    		    identity() {
    		      this.set00(1);
    		      this.set01(0);
    		      this.set02(0);
    		      this.set03(0);
    		      this.set10(0);
    		      this.set11(1);
    		      this.set12(0);
    		      this.set13(0);
    		      this.set20(0);
    		      this.set21(0);
    		      this.set22(1);
    		      this.set23(0);
    		      this.set30(0);
    		      this.set31(0);
    		      this.set32(0);
    		      this.set33(1);
    		    }

    		    transpose() {
    		      const m01 = this.get01();
    		      const m02 = this.get02();
    		      const m03 = this.get03();
    		      const m10 = this.get10();
    		      const m12 = this.get12();
    		      const m13 = this.get13();
    		      const m20 = this.get20();
    		      const m21 = this.get21();
    		      const m23 = this.get23();
    		      const m30 = this.get30();
    		      const m31 = this.get31();
    		      const m32 = this.get32();
    		      this.set01(m10);
    		      this.set02(m20);
    		      this.set03(m30);
    		      this.set10(m01);
    		      this.set12(m21);
    		      this.set13(m31);
    		      this.set20(m02);
    		      this.set21(m12);
    		      this.set23(m32);
    		      this.set30(m03);
    		      this.set31(m13);
    		      this.set32(m23);
    		    }

    		    invert() {
    		      let det = this.determinant();

    		      if (!det) {
    		        return null;
    		      }
    		      det = 1 / det;
    		      const result = new Mat4();
    		      const m00 = Mat3.fromValues(this.get11(), this.get12(), this.get13(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant() * det;
    		      const m01 = -Mat3.fromValues(this.get10(), this.get12(), this.get13(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant()* det;
    		      const m02 = Mat3.fromValues(this.get10(), this.get11(), this.get13(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant()* det;
    		      const m03 = -Mat3.fromValues(this.get10(), this.get11(), this.get12(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant()* det;
    		      
    		      const m10 = -Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant()* det;
    		      const m11 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant()* det;
    		      const m12 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant()* det;
    		      const m13 = Mat3.fromValues(this.get00(), this.get02(), this.get13(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant()* det;
    		     
    		      const m20 = Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get11(), this.get12(), this.get13(),this.get31(), this.get32(), this.get33()).determinant()* det;
    		      const m21 = -Mat3.fromValues(this.get00(), this.get12(), this.get13(), this.get10(), this.get12(), this.get13(),this.get30(), this.get32(), this.get33()).determinant()* det;
    		      const m22 = Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get30(), this.get31(), this.get33()).determinant()* det;
    		      const m23 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get00(), this.get31(), this.get32()).determinant()* det;
    		      
    		      const m30 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.ge20(), this.get21(), this.get22()).determinant()* det;
    		      const m31 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get10(), this.get12(), this.get13(),this.get20(), this.get22(), this.get23()).determinant()* det;
    		      const m32 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get20(), this.get21(), this.get23()).determinant()* det;
    		      const m33 = Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get20(), this.get21(), this.get22()).determinant()* det;
    		      result.set( m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    		      result.transpose();
    		      return result;
    		    }

    		    adjugate() {
    		      const result = new Mat4();

    		      const m00 = Mat3.fromValues(this.get11(), this.get12(), this.get13(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant();
    		      const m01 = -Mat3.fromValues(this.get10(), this.get12(), this.get13(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant();
    		      const m02 = Mat3.fromValues(this.get10(), this.get11(), this.get13(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant();
    		      const m03 = -Mat3.fromValues(this.get10(), this.get11(), this.get12(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant();
    		      
    		      const m10 = -Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant();
    		      const m11 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant();
    		      const m12 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant();
    		      const m13 = Mat3.fromValues(this.get00(), this.get02(), this.get13(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant();
    		     
    		      const m20 = Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get11(), this.get12(), this.get13(),this.get31(), this.get32(), this.get33()).determinant();
    		      const m21 = -Mat3.fromValues(this.get00(), this.get12(), this.get13(), this.get10(), this.get12(), this.get13(),this.get30(), this.get32(), this.get33()).determinant();
    		      const m22 = Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get30(), this.get31(), this.get33()).determinant();
    		      const m23 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get00(), this.get31(), this.get32()).determinant();
    		      
    		      const m30 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.ge20(), this.get21(), this.get22()).determinant();
    		      const m31 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get10(), this.get12(), this.get13(),this.get20(), this.get22(), this.get23()).determinant();
    		      const m32 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get20(), this.get21(), this.get23()).determinant();
    		      const m33 = Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get20(), this.get21(), this.get22()).determinant();
    		      result.set( m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    		      return result;
    		    }

    		    determinant() {
    		      return (
    		        (this.get00() * this.get11() +
    		          this.get22() +
    		          this.get01() * this.get12() * this.get20() +
    		          this.get02() * this.get10()) &
    		        (this.get21() -
    		          this.get02() * this.get11() * this.get20() -
    		          this.get01() * this.get10() * this.get21() -
    		          this.get00() * this.get21() * this.get12())
    		      );
    		    }


    		    add(mat4) {
    		      this.set00(this.get00() + mat4.get00());
    		      this.set01(this.get01() + mat4.get01());
    		      this.set02(this.get02() + mat4.get02());
    		      this.set03(this.get03() + mat4.get03());
    		      this.set10(this.get10() + mat4.get10());
    		      this.set11(this.get11() + mat4.get11());
    		      this.set12(this.get12() + mat4.get12());
    		      this.set13(this.get12() + mat4.get13());
    		      this.set20(this.get20() + mat4.get20());
    		      this.set21(this.get21() + mat4.get21());
    		      this.set22(this.get22() + mat4.get22());
    		      this.set23(this.get23() + mat4.get23());
    		      this.set30(this.get30() + mat4.get30());
    		      this.set31(this.get31() + mat4.get31());
    		      this.set32(this.get32() + mat4.get32());
    		      this.set33(this.get33() + mat4.get33());
    		    }

    		    subtract(mat4) {
    		      this.set00(this.get00() - mat4.get00());
    		      this.set01(this.get01() - mat4.get01());
    		      this.set02(this.get02() - mat4.get02());
    		      this.set03(this.get03() - mat4.get03());
    		      this.set10(this.get10() - mat4.get10());
    		      this.set11(this.get11() - mat4.get11());
    		      this.set12(this.get12() - mat4.get12());
    		      this.set13(this.get12() - mat4.get13());
    		      this.set20(this.get20() - mat4.get20());
    		      this.set21(this.get21() - mat4.get21());
    		      this.set22(this.get22() - mat4.get22());
    		      this.set23(this.get23() - mat4.get23());
    		      this.set30(this.get30() - mat4.get30());
    		      this.set31(this.get31() - mat4.get31());
    		      this.set32(this.get32() - mat4.get32());
    		      this.set33(this.get33() - mat4.get33());
    		    }

    		    exactEquals(mat4) {
    		      return (
    		        this.get00() === mat4.get00() &&
    		        this.get01() === mat4.get01() &&
    		        this.get02() === mat4.get02() &&
    		        this.get03() === mat4.get03() &&
    		        this.get10() === mat4.get10() &&
    		        this.get11() === mat4.get11() &&
    		        this.get12() === mat4.get12() &&
    		        this.get13() === mat4.get13() &&
    		        this.get20() === mat4.get20() &&
    		        this.get21() === mat4.get21() &&
    		        this.get22() === mat4.get22() &&
    		        this.get23() === mat4.get23() &&
    		        this.get30() === mat4.get30() &&
    		        this.get31() === mat4.get31() &&
    		        this.get32() === mat4.get32() &&
    		        this.get33() === mat4.get33()
    		      );
    		    }

    		    equals(mat4) {
    		      return (
    		        equals(this.get00(), mat4.get00()) &&
    		        equals(this.get01(), mat4.get01()) &&
    		        equals(this.get02(), mat4.get02()) &&
    		        equals(this.get03(), mat4.get03()) &&
    		        equals(this.get10(), mat4.get10()) &&
    		        equals(this.get11(), mat4.get11()) &&
    		        equals(this.get12(), mat4.get12()) &&
    		        equals(this.get13(), mat4.get13()) &&
    		        equals(this.get20(), mat4.get20()) &&
    		        equals(this.get21(), mat4.get21()) &&
    		        equals(this.get22(), mat4.get22()) &&
    		        equals(this.get23(), mat4.get23()) &&
    		        equals(this.get30(), mat4.get30()) &&
    		        equals(this.get31(), mat4.get31()) &&
    		        equals(this.get32(), mat4.get32()) &&
    		        equals(this.get33(), mat4.get33()) 
    		      );
    		    }

    		    toString() {
    		      return `Mat4(${this.get00()},${this.get01()},${this.get02()},${this.get03()},${this.get10()},${this.get11()},${this.get12()},${this.get13()},${this.get20()},${this.get21()},${this.get22()}${this.get23()},${this.get30()},${this.get31()},${this.get32()}${this.get33()}})`;
    		    }
    		  }

    		  exports.Mat2 = Mat2$1;
    		  exports.Mat3 = Mat3;
    		  exports.Mat4 = Mat4;
    		  exports.Vec2 = Vec2;
    		  exports.Vec3 = Vec3;
    		  exports.Vec4 = Vec4;
    		  exports.Common = Common;

    		})); 
    	} (matrix$1, matrix$1.exports));
    	return matrix$1.exports;
    }

    var matrixExports = requireMatrix();

    class PointGeometry{

      /**
       *  @property {Vec2} _point 点坐标
       */
      _point = null;

      /**
       * 创建一个二维坐标系上的点
       * @param {Number} x
       * @param {Number} y
       */
      constructor(x, y) {
        this._point = new matrixExports.Vec2();
        this.setPoint(x, y);
      }

      static fromVec2(vec2){
        const result = new PointGeometry(1,1);
        result.setWithVec2(vec2);
        return result
      }

      getPoint(){
        return this._point
      }

      /**
       * 设置坐标值
       * @param {Number} x 
       * @param {Number} y 
       */
      setPoint(x, y){
        this._point.set(x, y);
      }

      setWithVec2(vec2){
        this._point.copy(vec2);
      }

      /**
       * 或者某个维度的坐标值
       * @param {String} axis 
       * @returns {Number}
       */
      get(axis){
        switch (axis) {
            case "x":
                return this._point.get("x")
            case "y":
                return this._point.get("y")
            default:
                throw Error("unknow axis")
        }
      }

      /**
       * 复制point的坐标信息
       * @param {PointGeometry|Vec2} point
       */
      copy(point) {
        this.set(point.get("x"), point.get("y"));
      }

      /**
       * 克隆一个Point
       * @returns {PointGeometry}
       */
      clone() {
        return new PointGeometry(this.get("x"), this.get("y"));
      }

      /**
       * 转化为字符串
       * @returns {String}
       */
      toString() {
        return `[PointGeometry (${this.getPoint().toString()})]`;
      }
    }

    /**
     * 点与其他几何形状的关系
     * @readonly
     * @enum {String}
     * @property {String} POINTRELATION.INNER - 在内部
     * @property {String} POINTRELATION.OUTER - 在外部
     * @property {String} POINTRELATION.BORDER - 在边界
     */
    const POINTRELATION = {
        INNER: "inner",  
        OUTER: "outer",
        BORDER: "border",
    };

    /**
     * 矩形与其他几何形状的关系
     * @readonly
     * @enum {String}
     * @property {String} RECTRELATION.INTERSECT - 相交
     * @property {String} RECTRELATION.SEPARATION - 相离
     * @property {String} RECTRELATION.CONTAIN - 包含
     */
    const RECTRELATION = {
        INTERSECT: "intersect",
        SEPARATION: "separation",
        CONTAIN: "contain"
    };

    class RectGeometry {
      /**
       * @property {Vec2} _ltPoint 矩形的左上角点
       */
      _ltPoint = null;

      /**
       * @property {Vec2} _lbPoint 矩形的左下角点
       */
      _lbPoint = null;

      /**
       * @property {Vec2} _rtPoint 矩形的右上角点
       */
      _rtPoint = null;

      /**
       * @property {Vec2} _rbPoint 矩形的右下角点
       */
      _rbPoint = null;

      /**
       * @property {Vec2} _centerPoint 矩形的中心点
       */
      _centerPoint = null;

      /**
       * @property {Number} _width 矩形的宽度
       */
      _width = 0;

      /**
       * @property {Number} _height 矩形的高度
       */
      _height = 0;

      constructor(x, y, width, height) {
        this._ltPoint = matrixExports.Vec2.fromValues(x, y);
        this._lbPoint = new matrixExports.Vec2();
        this._rbPoint = new matrixExports.Vec2();
        this._rtPoint = new matrixExports.Vec2();
        this._centerPoint = new matrixExports.Vec2();
        this.setSize(width, height);
      }

      static fromPointsVec2(leftTopPoint, rightBottomPoint) {
        const w = Math.abs(rightBottomPoint.get("x") - leftTopPoint.get("x"));
        const h = Math.abs(rightBottomPoint.get("y") - leftTopPoint.get("y"));
        return RectGeometry.fromPointVec2(leftTopPoint, w, h);
      }

      static fromPointVec2(leftTopPoint, width, height) {
        const result = new RectGeometry(
          leftTopPoint.get("x"),
          leftTopPoint.get("y"),
          width,
          height
        );
        return result;
      }

      setSize(width, height) {
        this._width = width;
        this._height = height;
        this._lbPoint = this._ltPoint.clone();
        this._lbPoint.add(matrixExports.Vec2.fromValues(0, -this._height));
        this._rtPoint = this._ltPoint.clone();
        this._rtPoint.add(matrixExports.Vec2.fromValues(this._width, 0));
        this._rbPoint = this._ltPoint.clone();
        this._rbPoint.add(matrixExports.Vec2.fromValues(this._width, -this._height));
        this._centerPoint = this._ltPoint.clone();
        this._centerPoint.add(matrixExports.Vec2.fromValues(this._width / 2, -this._height / 2));
      }

      /**
       * 获取矩形的高度
       * @returns {Number}
       */
      getWidth() {
        return this._width;
      }

      setWidth(width) {
        this._width = width;
        this._rtPoint = this._ltPoint.clone().add(matrixExports.Vec2.fromValues(this._width, 0));
        this._rbPoint = this._ltPoint
          .clone()
          .add(matrixExports.Vec2.fromValues(this._width, -this._height));
        this._centerPoint = this._ltPoint
          .clone()
          .add(matrixExports.Vec2.fromValues(this._width / 2, -this._height / 2));
      }

      /**
       * 获取矩形的高度
       * @returns {Number}
       */
      getHeight() {
        return this._height;
      }

      setHeight(height) {
        this._height = height;
        this._lbPoint = this._ltPoint
          .clone()
          .add(matrixExports.Vec2.fromValues(0, -this._height));
        this._rbPoint = this._ltPoint
          .clone()
          .add(matrixExports.Vec2.fromValues(this._width, -this._height));
        this._centerPoint = this._ltPoint
          .clone()
          .add(matrixExports.Vec2.fromValues(this._width / 2, -this._height / 2));
      }

      /**
       * 获取矩形的左上角坐标
       * @returns {Vec2}
       */
      getLeftTopPoint() {
        return this._ltPoint;
      }

      /**
       * 获取矩形的左下角坐标
       * @returns {Vec2}
       */
      getLeftBottomPoint() {
        return this._lbPoint;
      }

      /**
       * 获取矩形的右上角坐标
       * @returns {Vec2}
       */
      getRightTopPoint() {
        return this._rtPoint;
      }

      /**
       * 获取矩形的右下角坐标
       * @returns {Vec2}
       */
      getRightBottomPoint() {
        return this._rbPoint;
      }

      /**
       * 获取矩形的中心坐标
       * @returns {Vec2}
       */
      getCenter() {
        return this._centerPoint;
      }

      getArea() {
        return this.getHeight() * this.getWidth();
      }

      getPerimeter() {
        return 2 * (this.getWidth() + this.getHeight());
      }

      /**
       * 判断2个矩形的位置关系
       * @param {RectGeometry} rect
       * @returns {RECTRELATION}
       */
      getRectRelation(rect) {
        const x1 = this.getLeftTopPoint().get("x");
        const y1 = this.getLeftTopPoint().get("y");
        const x2 = this.getRightBottomPoint().get("x");
        const y2 = this.getRightBottomPoint().get("y");
        const a1 = rect.getLeftTopPoint().get("x");
        const b1 = rect.getLeftTopPoint().get("y");
        const a2 = rect.getRightBottomPoint().get("x");
        const b2 = rect.getRightBottomPoint().get("y");
        if (x2 <= a1 || a2 <= x1 || y2 <= b1 || b2 <= y1) {
          return RECTRELATION.SEPARATION;
        } else if (
          Math.max(x1, a1) < Math.min(x2, a2) &&
          Math.max(y1, b1) < Math.min(y2, b2)
        ) {
          return RECTRELATION.INTERSECT;
        } else if (
          (x1 <= a1 && a2 <= x2 && y1 <= b1 && b2 <= y2) ||
          (a1 <= x1 && x2 <= a2 && b1 <= y1 && y2 <= b2)
        ) {
          return RECTRELATION.CONTAIN;
        }
      }

      /**
       * 从一个矩形复制
       * @param {RectGeometry} rect
       */
      copy(rect) {
        this._ltPoint.copy(rect.getLeftTopPoint());
        this.setSize(rect.getWidth(), rect.getHeight());
      }

      /**
       * 复制一个矩形数据
       * @returns {RectGeometry}
       */
      clone() {
        return RectGeometry.fromPointsVec2(
          this.getLeftTopPoint().clone(),
          this.getRightBottomPoint().clone()
        );
      }

      toString() {
        return "[Rect width=" + this.width + " height=" + this.height + "]";
      }
    }

    class LineGeometry {
      /**
       *  @property {Vec2} _startPoint 起点坐标
       */
      _startPoint = null;

      /**
       *  @property {Vec2} _endPoint 起点坐标
       */
      _endPoint = null;

      /**
       * 创建一个二维坐标系上的线段
       * @param {Vec2} start
       * @param {Vec2} end
       */
      constructor(start, end) {
        this.setStart(start);
        this.setEnd(end);
      }

      /**
       * 设置线段的起点坐标
       * @param {Vec2} point
       */
      setStart(point) {
        this._startPoint = point;
      }

      /**
       * 设置线段的终点坐标
       * @param {Vec2} point
       */
      setEnd(point) {
        this._endPoint = point;
      }

      /**
       * 获取线段的起点坐标
       * @returns {Vec2}
       */
      getStart() {
        return this._startPoint;
      }

      /**
       * 获取线段的终点坐标
       * @returns {Vec2}
       */
      getEnd() {
        return this._endPoint;
      }

      /**
       * 复制point的坐标信息
       * @param {PointGeometry|Vec2} point
       */
      copy(line) {
        this.set(line.getStart(), line.getEnd());
      }

      /**
       * 获取线段的长度
       * @returns {Number}
       */
      getLength() {
        return this.getStart().distance(this.getEnd());
      }

      /**
       * 获取直线的斜截式方程信息
       */
      getSlopeIntercept() {
        let result = { k: NaN, b: NaN, x: NaN, y: NaN };
        if (this.getStart().get("x") === this.getEnd().get("x")) {
          result.x = this.getStart().get("x");
        } else if (this.getStart().get("y") === this.getEnd().get("y")) {
          result.y = this.getStart().get("y");
        } else {
          const determinant = Mat2.fromValues(
            this.getStart().get("x"),
            this.getStart().get("y"),
            this.getEnd().get("x"),
            this.getEnd().get("y")
          ).determinant();
          if (determinant) {
            result.k =
              Mat2.fromValues(
                0,
                this.getStart().get("y"),
                0,
                this.getEnd().get("y")
              ).determinant() / determinant;
            result.b =
              Mat2.fromValues(
                this.getStart().get("x"),
                0,
                this.getEnd().get("x"),
                0
              ).determinant() / determinant;
          }
        }
        return result;
      }

      /**
       * 获取直线方程的一般式
       * @returns {Number[]}
       */
      getNormal() {
        const result = [];
        result.push(this.getStart().get("y") - this.getEnd().get("y"));
        result.push(this.getStart().get("x") - this.getEnd().get("x"));
        result.push(
          Mat2.fromValues(
            this.getStart().get("x"),
            this.getStart().get("y"),
            this.getEnd().get("x"),
            this.getEnd().get("y")
          ).determinant()
        );
        return result;
      }

      /**
       * 克隆一个Point
       * @returns {PointGeometry}
       */
      clone() {
        return new LineGeometry(this.getStart(), this.getEnd());
      }

      /**
       * 转化为字符串
       * @returns {String}
       */
      toString() {
        return `[LineGeometry (${this.getStart().toString()},${this.getEnd.toString()})]`;
      }
    }

    class CircleGeometry {
      /**
       * @property {Vec2} _center 圆心坐标
       */
      _center = null;

      /**
       * @property {Number} _radius 圆的半径
       */
      _radius = 0;

      /**
       * 创建一个圆形
       * @param {Number} x 圆心x轴坐标
       * @param {Number} y 圆心y轴坐标
       * @param {Number} radius 圆的半径
       */
      constructor(x, y, radius) {
        this._center = new matrixExports.Vec2();
        this.setCenter(x, y);
        this.setRadius(radius);
      }

      /**
       * 从一个二维向量和半径创建一个几何圆
       * @param {Vec2} Vec2
       * @param {Number} radius
       * @returns
       */
      static fromVec2(Vec2, radius) {
        const result = new CircleGeometry(1, 1, 1);
        result._center.copy(Vec2);
        result.setRadius(radius);
        return result;
      }

      /**
       * 设置圆心坐标
       * @param {Number} x
       * @param {Number} y
       */
      setCenter(x, y) {
        this._center.set(x, y);
      }

      /**
       * 设置圆心坐标使用二维向量
       * @param {Vec2} vec2
       */
      setCenterWithVec2(vec2) {
        this._center.copy(vec2);
      }

      /**
       * 设置圆半径
       * @param {Nubmer} radius
       */
      setRadius(radius) {
        this._radius = radius;
      }

      /**
       * 获取圆的半径
       * @returns {Number}
       */
      getRadius() {
        return this._radius;
      }

      /**
       * 获取圆心坐标
       * @returns {Vec2}
       */
      getCenter() {
        return this._center;
      }

      /**
       * 获取圆的直接
       * @returns {Number}
       */
      getDiameter() {
        return 2 * this.getRadius();
      }

      /**
       * 获取面积
       * @returns {Number}
       */
      getArea() {
        return Math.PI * this.getRadius() * this.getRadius();
      }

      /**
       * 获取周长
       * @returns {Number}
       */
      getPerimeter() {
        return 2 * Math.PI * this.getRadius();
      }

      /**
       * 获取外接矩形
       * @returns {RectGeometry}
       */
      getExteriorRect() {
        const w = this.getDiameter();
        const point = this.getCenter().clone();
        point.subtract(matrixExports.Vec2.fromValues(this.getRadius(), -this.getRadius()));
        return RectGeometry.fromPointVec2(point, w, w);
      }

      /**
       * 判断点与圆的关系
       * @param {PointGeometry} point
       * @param {Boolean} isabsolute 是绝对相等还是相对相等
       * @returns {POINTRELATION}
       * }
       */
      getPointRelation(point, isAbsolute = true) {
        let distance = this.getCenter().squaredDistance(point.getPoint());
        if (!isAbsolute) {
          distance = matrixExports.Common.equals(distance, 0);
        }
        if (distance > 0) {
          return POINTRELATION.OUTER;
        } else if (distance < 0) {
          return POINTRELATION.INNER;
        } else {
          return POINTRELATION.BORDER;
        }
      }

      /**
       * 判断直线与圆的位置关系
       * @param {LineGeometry} line
       * @param {Boolean} isabsolute 是绝对相等还是相对相等
       * @returns {POINTRELATION}
       */
      getLineRelation(line, isAbsolute = true) {
        const normal = line.getNormal();
        const distance =
          (normal[0] * this.getCenter().get("x") +
            normal[1] * this.getCenter().get("y") +
            normal[2]) /
          Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
        if (!isAbsolute) {
          distance = matrixExports.Common.equals(distance, 0);
        }
        if (distance > 0) {
          return POINTRELATION.OUTER;
        } else if (distance < 0) {
          return POINTRELATION.INNER;
        } else {
          return POINTRELATION.BORDER;
        }
      }
      /**
       * 判断矩形与圆的位置关系
       * @param {RectGeometry} rect
       * @returns {RECTRELATION}
       */
      getRectRelation(rect) {
        return this.getExteriorRect().getRectRelation(rect);
      }

      copy(circleGeometry) {
        this.setCenterWithVec2(circleGeometry.getCenter().clone());
        this.setRadius(circleGeometry.getRadius());
      }

      clone() {
        return CircleGeometry.fromVec2(this.getCenter().clone(), this.getRadius());
      }

      /**
       * 转为字符串
       * @returns {String}
       */
      toString() {
        return `[CircleGeometry center (${this.getCenter().get(
      "x"
    )},${this.getCenter().get("y")}) radius ${this.radius}]`;
      }
    }

    class EllipseGeometry {
      /**
       * @property {Vec2} _center 椭圆心坐标
       */
      _center = null;

      /**
       * @property {Number} _majorRadius 椭圆的长半径
       */
      _majorRadius = 0;

      /**
       * @property {Number} _shortRadius 椭圆的短半径
       */
      _shortRadius = 0;

      /**
       * 创建一个椭圆
       * @param {Number} x 椭圆心x轴坐标
       * @param {Number} y 椭圆心y轴坐标
       * @param {Number} majorRadius 椭圆的长半径
       * @param {Number} shortRadius 椭圆的短半径
       * @param {String} [id] 椭圆的唯一标识
       */
      constructor(x, y, majorRadius, shortRadius) {
        this._center = matrixExports.Vec2.fromValues(x, y);
        this.setMajorRadius(majorRadius);
        this.setShortRadius(shortRadius);
      }

      /**
       *
       * @param {Vec2} vec2 椭圆心的二维坐标
       * @param {Number} majorRadius 椭圆的长半径
       * @param {Number} shortRadius 椭圆的短半径
       * @returns
       */
      static fromVec2(vec2, majorRadius, shortRadius) {
        return new EllipseGeometry(
          vec2.get("x"),
          vec2.get("y"),
          majorRadius,
          shortRadius
        );
      }

      /**
       * 设置椭圆圆心坐标
       * @param {Nubmer} x
       * @param {Nubmer} y
       */
      setCenter(x, y) {
        this._center.set(x, y);
      }

      setCenterWithVec2(vec2) {
        this._center.copy(vec2);
      }

      /**
       * 获取椭圆的圆心坐标
       * @returns {Vec2}
       */
      getCenter() {
        return this._center;
      }

      /**
       * 设置椭圆的长半轴
       * @param {Number} majorRadius
       */
      setMajorRadius(majorRadius) {
        this._majorRadius = majorRadius;
      }

      /**
       * 获取椭圆的长半径
       * @returns {Number}
       */
      getMarjorRadius() {
        return this._majorRadius;
      }

      /**
       * 设置椭圆的短半径
       * @param {Number} shortRadius
       */
      setShortRadius(shortRadius) {
        this._shortRadius = shortRadius;
      }

      /**
       * 获取椭圆的短半径
       * @returns {Number}
       */
      getShortRadius() {
        return this._shortRadius;
      }

      /**
       * 从一个椭圆复制
       * @param {EllipseGeometry} rect
       */
      copy(ellipse) {
        this.setCenterWithVec2(ellipse.getCenter());
        this.setMajorRadius(ellipse.getMarjorRadius());
        this.setShortRadius(ellipse.getShortRadius());
      }

      /**
       * 复制一个椭圆数据
       * @returns {EllipseGeometry}
       */
      clone() {
        return EllipseGeometry.fromVec2(this.getCenter(), this.getMarjorRadius(), this.getShortRadius());
      }

      /**
       * 转换为字符串
       * @returns {String}
       */
      toString() {
        return `EllipseGeometry center=(${this.getCenter().get("x")}, ${this.getCenter().get("y")}) majorRadius=${this.majorRadius} shortRadius=${this.shortRadius}`;
      }
    }

    class SectorGeometry {
      /**
       * @property {Vec2} _center 扇形的圆心坐标
       */
      _center = null;

      /**
       * @property {Number} _radius 扇形的半径
       */
      _radius = 0;

      /**
       * @property {Number} _startAngle 扇形起始弧度值
       */
      _startAngle = 0;

      /**
       * @property {Number} _endAngle 扇形结束弧度值
       */
      _endAngle = 0;

      /**
       * @property {Boolean} _isClockwise 是否沿着顺时针方向绘制
       */
      _isClockwise = false;

      /**
       *
       * @param {Number} x 扇形的圆心x坐标
       * @param {Number} y 扇形的圆心y坐标
       * @param {Number} radius 扇形的半径
       * @param {Number} startAngle 扇形起始弧度值
       * @param {Number} endAngle 扇形结束弧度值
       * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
       */
      constructor(x, y, radius, startAngle, endAngle, isClockwise = false) {
        this._center = matrixExports.Vec2.fromValues(x, y);
        this.setRadius(radius);
        this.setStartAngle(startAngle);
        this.setEndAngle(endAngle);
        this.setClockWise(isClockwise);
      }

      static fromVec2(vec2, radius, startAngle, endAngle, isClockwise = false){
        return new SectorGeometry(vec2.get("x"), vec2.get("y"), radius, startAngle, endAngle, isClockwise)
      }

      /**
       * 设置是否沿着顺时针方向绘制
       * @param {Boolean} isClockwise
       */
      setClockWise(isClockwise) {
        this._isClockwise = !!isClockwise;
      }

      /**
       * 返回是否沿着顺时针方向绘制
       * @returns {Boolean}
       */
      getClockWise() {
        return this._isClockwise;
      }

      /**
       * 设置扇形起始弧度值
       * @param {Nubmer} radius
       */
      setStartAngle(startAngle) {
        this._startAngle = startAngle;
      }

      /**
       * 获取扇形起始弧度值
       * @returns {Number}
       */
      getStartAngle() {
        return this._startAngle;
      }

      /**
       * 设置扇形结束弧度值
       * @param {Nubmer} radius
       */
      setEndAngle(endAngle) {
        this._endAngle = endAngle;
      }

      /**
       * 获取扇形结束弧度值
       * @returns {Number}
       */
      getEndAngle() {
        return this._endAngle;
      }

      /**
       * 设置圆半径
       * @param {Nubmer} radius
       */
      setRadius(radius) {
        this._radius = radius;
      }

      /**
       * 获取圆的半径
       * @returns {Number}
       */
      getRadius() {
        return this._radius;
      }

      /**
       * 获取圆的圆心坐标
       * @returns {Vec2}
       */
      getCenter() {
        return this._center;
      }

      /**
       * 设置圆心坐标
       * @param {Nubmer} x
       * @param {Nubmer} y
       */
      setCenter(x, y) {
        this.center.set(x, y);
      }

      setCenterWithVec2(vec2) {
        this.center.copy(vec2);
      }

      /**
       * 从一个椭圆复制
       * @param {SectorGeometry} sector
       */
      copy(sector) {
        this.setCenterWithVec2(sector.getCenter());
        this.setRadius(sector.getRadius());
        this.setStartAngle(sector.getStartAngle());
        this.setEndAngle(sector.getEndAngle());
        this.setClockWise(sector.getClockWise());
      }

      /**
       * 复制一个椭圆数据
       * @returns {SectorGeometry}
       */
      clone() {
        return SectorGeometry.fromVec2(
          this.getRadius(),
          this.getStartAngle(),
          this.getEndAngle(),
          this.getClockWise()
        );
      }

      /**
       * 转换为字符串
       * @returns {String}
       */
      toString() {
        return `SectorGeometry center=(${this.getCenter().get(
      "x"
    )}, ${this.getCenter().get(
      "y"
    )}) radius=${this.getRadius()} startAngle=${this.getStartAngle()} endAngle=${this.getEndAngle()}`;
      }
    }

    class RingGeometry {
      /**
       * @property {Vec2} _center 圆环圆心坐标
       */
      _center = null;

      /**
       * @property {Number} _innerRadius 圆环的内半径
       */
      _innerRadius = 0;

      /**
       * @property {Number} _outerRadius 圆环的外半径
       */
      _outerRadius = 0;

      /**
       * 创建一个圆环
       * @param {Number} x 圆心x轴坐标
       * @param {Number} y 圆心y轴坐标
       * @param {Number} innerRadius 圆环内半径
       * @param {Number} outerRadius 圆环外半径
       */
      constructor(x, y, innerRadius, outerRadius) {
        this._center = matrixExports.Vec2.fromValues(x, y);
        this.setInnerRadius(innerRadius);
        this.setOuterRadius(outerRadius);
      }

      static fromVec2(vec2, innerRadius, outerRadius){
        return new RingGeometry(vec2.get("x"), vec2.get("y"), innerRadius, outerRadius)
      }

      /**
       * 设置圆环的内半径
       * @param {Nubmer} innerRadius
       */
      setInnerRadius(innerRadius) {
        this._innerRadius = innerRadius;
      }

      /**
       * 设置圆环的外半径
       * @param {Nubmer} outerRadius
       */
      setOuterRadius(outerRadius) {
        this._outerRadius = outerRadius;
      }

      /**
       * 获取圆环的外半径
       * @returns {Number}
       */
      getInnerRadius() {
        return this._innerRadius;
      }

      /**
       * 获取圆环的内半径
       * @returns {Number}
       */
      getOuterRadius() {
        return this._outerRadius;
      }

      /**
       * 获取圆的圆心坐标
       * @returns {Vec2}
       */
      getCenter() {
        return this._center;
      }

      /**
       * 设置圆心坐标
       * @param {Nubmer} x
       * @param {Nubmer} y
       */
      setCenter(x, y) {
        this._center.set(x, y);
      }

      setCenterWithVec2(vec2) {
        this._center.copy(vec2);
      }

       /**
       * 从一个圆环复制
       * @param {RingGeometry} ring
       */
       copy(ring) {
        this.setCenterWithVec2(ring.getCenter());
        this.setInnerRadius(ring.getInnerRadius());
        this.setOuterRadius(ring.getOuterRadius());
      }

      /**
       * 复制一个圆环数据
       * @returns {RingGeometry}
       */
      clone() {
        return RingGeometry.fromVec2(this.getCenter(), this.getInnerRadius(), this.getOuterRadius());
      }

      /**
       * 转为字符串
       * @returns {String}
       */
      toString() {
        return `[RingGeometry center=${this.getCenter().toString()} innerRadius=${this.getInnerRadius()} outerRadius=${this.getOuterRadius()}`;
      }
    }

    let start = 1000000000;
    function uuid(){
        start++;
        const res= start.toString(16).replace(/.{4}/g, $1 => $1 + "_");
        if(res[res.length -1] === "_"){
            return res.slice(0, -1)
        } 
        return res
    }

    class Base {
      /**
       * @property {CanvasRenderingContext2D.direction} direction 属性用来在绘制文本时，描述当前文本方向
       * @default inherit
       */
      direction = "inherit";

      /**
       * @property {String|CanvasGradient|CanvasPattern} fillStyle 填充颜色
       * @default #000
       */
      fillStyle = "#000";

      /**
       * @property {String} font 当前字体样式的属性
       * @default '10px sans-serif'
       */
      font = "10px sans-serif";

      /**
       * @property {String} fontKerning 字体字距调整
       * @default 'auto'
       */
      fontKerning = "auto";

      /**
       * @property {String} fontStretch 字体的伸展值
       * @default 'normal'
       */
      fontStretch = "normal";

      /**
       * @property {String} fontVariantCaps 渲染文本的替代大写形式
       * @default 'normal'
       */
      fontVariantCaps = "normal";

      /**
       * @property {Number} globalAlpha 设置图形和图片透明度的属性
       * @default 1
       */
      globalAlpha = 1;

      /**
       * @property {CanvasRenderingContext2D.globalCompositeOperation} globalCompositeOperation 在绘制新形状时应用的合成操作的类型
       * @default source-over
       */
      globalCompositeOperation = "source-over";

      /**
       * @property {Boolean} imageSmoothingEnabled 对缩放后的图片进行平滑处理
       * @default true
       */
      imageSmoothingEnabled = true;

      /**
       * @property {Boolean} imageSmoothingQuality 设置图像平滑度
       * @default "low"
       */
      imageSmoothingQuality = "low";

      /**
       * @property {String} letterSpacing 字母之间的间距
       * @default "0px"
       */
      letterSpacing = "0px";

      /**
       * @property {CanvasRenderingContext2D.lineCap} lineCap 如何绘制每一条线段末端的属性
       * @default butt
       */
      lineCap = "butt";

      /**
       * @property {CanvasRenderingContext2D.lineJoin} lineJoin 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
       * @default miter
       */
      lineJoin = "miter";

      /**
       * @property {Number} lineWidth 线段的宽度
       * @default 1
       */
      lineWidth = 1;

      /**
       * @property {Number} miterLimit 斜接面限制比例
       * @default 1
       */
      miterLimit = 10;

      /**
       * @property {Number} shadowBlur 模糊效果程度
       * @default 0
       */
      shadowBlur = 0;

      /**
       * @property {String} shadowColor 阴影颜色
       * @default "rgba(0, 0, 0, 0)"
       */
      shadowColor = "rgba(0, 0, 0, 0)";

      /**
       * @property {Number} shadowOffsetX  阴影水平偏移距离
       * @default 0
       */
      shadowOffsetX = 0;

      /**
       * @property {Number} shadowOffsetY  阴影垂直偏移距离
       * @default 0
       */
      shadowOffsetY = 0;

      /**
       * @property {String|CanvasGradient|CanvasPattern} strokeStyle  填充颜色
       * @default #000
       */
      strokeStyle = "#000";

      /**
       * @property {CanvasRenderingContext2D.textAlign} textAlign 文本的对齐方式
       * @default "start"
       */
      textAlign = "start";

      /**
       * @property {CanvasRenderingContext2D.textBaseline} textBaseline 当前文本基线
       * @default "alphabetic"
       */
      textBaseline = "alphabetic";

      /**
       * @property {CanvasRenderingContext2D.textRendering} textRendering 渲染文本时向渲染引擎提供应该如何优化的相关信息
       * @default "auto"
       */
      textRendering = "auto";

      /**
       * @property {String} wordSpacing 绘制文本时单词之间的间距
       * @default "0px"
       */
      wordSpacing = "0px";

      _storeProps = [
        "direction",
        "fillStyle",
        "filter",
        "font",
        "fontKerning",
        "fontStretch",
        "fontVariantCaps",
        "globalAlpha",
        "globalCompositeOperation",
        "imageSmoothingEnabled",
        "imageSmoothingQuality",
        "letterSpacing",
        "lineCap",
        "lineDashOffset",
        "lineJoin",
        "lineWidth",
        "miterLimit",
        "shadowBlur",
        "shadowColor",
        "shadowOffsetX",
        "shadowOffsetY",
        "strokeStyle",
        "textAlign",
        "textBaseline",
        "textRendering",
        "wordSpacing",
      ];

      /**
       * @property {String} text 图形的类型
       */
      type = "";

      /**
       *  @property {String} text 图形的唯一标识
       */
      id = "";

      /**
       * @property {CircleGeometry} 图形的几何形状
       */
      geom = null;

      _drawStatus = DRAWSTATUS.NONE;

      _canvasHeight = 0;

      _canvasWidth = 0;

      /**
       * 图形类的基类, 抽象类，不能直接new
       * @param {String} type 图形的类型
       * @param {String} id 图形的唯一标识
       */
      constructor(type, id) {
        this.type = type;
        this.setId(id);
        this.setDrawStatus(DRAWSTATUS.PROCESS);
      }

      /**
       * 返回图形的类型
       * @returns {String}
       */
      getType() {
        return this.type;
      }

      /**
       * 返回唯一标识
       * @returns {String}
       */
      getId() {
        return this.id;
      }

      /**
       * 返回图形对应的几何形状
       * @returns
       */
      getGeomerty() {
        return this.geom;
      }

      /**
       * 设置唯一表示
       * @param {String} id
       */
      setId(id) {
        this.id = id || uuid();
      }

      getDrawStatus() {
        return this._drawStatus;
      }

      setDrawStatus(status) {
        this._drawStatus = status;
      }

      getVisible() {
        return this.globalAlpha !== 0;
      }

      getCanvasHeight() {
        return this._canvasHeight;
      }

      getCanvasWidth() {
        return this._canvasWidth;
      }

      /**
       * 渲染图形
       * @param {CanvasRenderingContext2D} context
       * @param {Boolean} isRedraw -是否强制渲染
       */
      render(context, isRedraw = false) {
        this._canvasHeight = context.canvas.height;
        this._canvasWidth = context.canvas.width;
        if (this.getVisible(context)) {
          if (isRedraw) {
            this.setDrawStatus(DRAWSTATUS.PROCESS);
            this.save();
            this._updateStyle();
            this._render(context);
            this.restore();
          } else {
            if (this.getDrawStatus() === DRAWSTATUS.NONE) {
              this.setDrawStatus(DRAWSTATUS.PROCESS);
              this.save();
              this._updateStyle();
              this._render(context);
              this.restore();
            }
          }
          this.setDrawStatus(DRAWSTATUS.DONE);
        }
      }

      _updateStyle() {
        for (let prop of this._storeProps) {
          context[prop] = this[prop];
        }
      }

      /**
       * 转为字符串展示
       * @returns {string}
       */
      toString() {
        return `${this.getType()}Graphics geomerty=${this.getGeomerty().toString()}`;
      }
    }

    class CircleGraphics extends Base {
      /**
       * 创建一个圆形
       * @param {CircleGeometry} circleGeo 圆的几何形状
       * @param {String} [id] 圆的唯一标识
       */
      constructor(circleGeo, id) {
        super("Circle", id);
        this.setGeomerty(circleGeo);
      }

      /**
       * 创建一个圆形
       * @param {Number} x 圆心x轴坐标
       * @param {Number} y 圆心y轴坐标
       * @param {Number} radius 圆的半径
       * @param {String} [id] 圆的唯一标识
       */
      static fromValues() {
        return new CircleGraphics(
          new CircleGeometry(vec2.get("x"), vec2.get("y"), radius),
          id
        );
      }

      /**
       * 创建一个圆形
       * @param {Vec2} vec2
       * @param {Number} radius
       * @param {String} [id] 圆的唯一标识
       * @returns
       */
      static fromVec2(vec2, radius, id) {
        return new CircleGraphics(CircleGeometry.fromVec2(vec2, radius), id);
      }

      /**
       * 设置圆的几何形状
       * @param {CircleGeometry} circleGeo 圆的几何形状
       */
      setGeomerty(circleGeo) {
        this.geom = new CircleGeometry(circleGeo);
        this.setDrawStatus(DRAWSTATUS.NONE);
      }

      getVisible() {
        console.log(
          this.getGeomerty().getRectRelation(
            new RectGeometry(0, 0, this.getCanvasWidth(), this.getCanvasHeight())
          )
        );
        return (
          super.getVisible() &&
          this.getGeomerty().getRectRelation(
            new RectGeometry(0, 0, this.getCanvasWidth(), this.getCanvasHeight())
          ) !== RECTRELATION.SEPARATION
        );
      }

      _render(context) {
        context.arc(
          this.getGeomerty().getCenter().get("x"),
          this.getGeomerty().getCenter().get("y"),
          this.getGeomerty().getRadius(),
          0,
          Math.PI * 2,
          false
        );
        context.fill();
        context.stroke();
      }
    }

    class LineGraphics extends Base {

        /**
         * @property {LineGeometry} geom 图形的几何对象
         */
        geom = null

        /**
         * 
         * @param {Vec2} start 矩形左上角点x轴坐标
         * @param {Vec2} end 矩形左上角点y轴坐标
         * @param {String} [id] 矩形的唯一标识
         */
        constructor(start, end, id) {
            super("rect", id);
            this.geom = new LineGeometry(start, end);
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

    class RingGraphics extends Base {

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
    exports.Container = Container;
    exports.EllipseGeometry = EllipseGeometry;
    exports.EllipseGraphics = EllipseGraphics;
    exports.LineGraphics = LineGraphics;
    exports.PointGeometry = PointGeometry;
    exports.RectGeometry = RectGeometry;
    exports.RectGraphics = RectGraphics;
    exports.RingGeometry = RingGeometry;
    exports.RingGraphics = RingGraphics;
    exports.SectorGeometry = SectorGeometry;
    exports.SectorGraphics = SectorGraphics;
    exports.default = Stage;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
