

class Screen extends Frame {


    constructor(parent, props) {
        super(parent, props);
        this._children = [];
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
    }


    destroy() {
        this._destroyChildren();
        super.destroy();
    }


    addChild(screen, parent = null, props = null) {
        const appendTo = parent ? parent : this.DOM;
        this._children.push({
            parent: appendTo,
            screen: screen.getInstance(appendTo, props)
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
        this._children.forEach(child => child.screen.destroy() );
        this._children = [];
    }


}




