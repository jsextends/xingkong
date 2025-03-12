export default class Container{
    _sort = 1;

    _name = ""

    _graphicsList = [];
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
        }
    }

    removeGraphics(graphics){
        const index = this._graphicsList.findIndex(el => el.getId() === graphics.getId());
        if(index !== -1){
            this._graphicsList.splice(index, 1)
        }
    }

    clearGraphics(){
        this._graphicsList = [];
    }

    render(context){
        this._graphicsList.forEach(el => {
            el.render(context)
        })
    }

    toString() {
		return "[Container (name=" + this.getName() + ")]";
	}

}