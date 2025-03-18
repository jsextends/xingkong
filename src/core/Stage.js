import Container from "./container";

let sortBegin = 0;

export default class Stage {
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
    this.setSize(this.getElement().clientWidth, this.getElement().clientHeight)
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
      delete this._containerNames[name]
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
