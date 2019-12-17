
class DynamicScreen extends Screen {



    static getInstance(parent, state) {
        const instance =  new this(parent, state);
        instance.mount();
        return instance;
    }

    constructor(parent, state) {
        super(parent);
        this.state = state;
        this._subscriptions = [];
        console.log(this.state);
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

    addChild(screen, parent = null) {
        if (Frame.compareClass(this, screen)) {
            parent = parent ? parent : this.DOM;
            this._children.push({
                parent: parent,
                screen: screen.getInstance(parent, this.state)
            });
        } else {
            console.log('wroong');
            super.addChild(screen, parent);
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