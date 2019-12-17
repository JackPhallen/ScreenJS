

class Screen extends Frame {


    constructor(parent) {
        super(parent);
        this._children = [];
    }


    destroy() {
        this._destroyChildren();
        super.destroy();
    }


    addChild(screen, parent = null) {
        const appendTo = parent ? parent : this.DOM;
        this._children.push({
            parent: appendTo,
            screen: screen.getInstance(appendTo)
        });
    }


    removeChild(parent) {
        this._children = this._children.filter(child => {
            if (child.parent === parent) {
                child.screen.destroy();
                return false;
            }
            return true
        })
    }


    _destroyChildren() {
        Object.keys(this._children).forEach(child => child.screen.destroy );
        this._children = [];
    }


}




