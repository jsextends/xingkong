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
    this._defaultContainer = new Container(defaultConainerName);
    this.addContainer( this._defaultContainer);
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

  render() {
    for (let name of this._containerNames) {
      this._containers[name].render(this.getContext());
    }
  }

  toString() {
    return "Stage";
  }
}
