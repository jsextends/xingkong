import { DRAWSTATUS } from "../common/status";

export default class Container{
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
        this._sort = sort
    }

    addGraphics(graphics){
        if(Array.isArray(graphics)){
            graphics.forEach(el => {
                this.addGraphics(el)
            })  
        } else {
            this._graphicsList.push(graphics)
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
            this._graphicsList.splice(index, 1)
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
                el.render(context, true)
            })
        } else {
            if(this.getDrawStatus() === DRAWSTATUS.PROCESS){
                this.getGraphics().filter(el => el.getDrawStatus() === DRAWSTATUS.NONE).map(el => el.render(context, false))
            }
        }
        this.setDrawStatus(DRAWSTATUS.DONE)
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