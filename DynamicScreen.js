
class DynamicScreen extends Screen {

    static getInstance(parent, props, state) {
        const instance =  new this(parent, props, state);
        instance.mount();
        return instance;
    }

    constructor(parent, props, state) {
        super(parent, props);
        this.state = state;
        this._subscriptions = [];
    }


    observers() {}


    createObserver(add, remove,  callback) {
        this._subscriptions.push({
            add: add,
            remove: remove,
            callback: callback
        });
    }


    mount() {
        this._initObservers();
        super.mount()
    }


    destroy() {
        this._destroyObservers();
        super.destroy();
    }

    addChild(screen, parent = null, props = null) {
        if (Frame.compareClass(this, screen)) {
            parent = parent ? parent : this.DOM;
            this._children.push({
                parent: parent,
                screen: screen.getInstance(parent, props, this.state)
            });
        } else {
            super.addChild(screen, parent, props);
        }
    }


    _initObservers() {
        this.observers();
        this._subscriptions.forEach(observer => {
            observer.add(observer.callback);
        });
    }


    _destroyObservers() {
        this._subscriptions.forEach(observer => {
            observer.remove(observer.callback);
        });
        this._subscriptions = [];
    }

}
