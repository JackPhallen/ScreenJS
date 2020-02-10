/**
 * Screen class
 */
class Screen {

    /**
     * Get count of Screen instances to ensure unique IDs
     * @returns {number}
     */
    static _getCount() {
        if (this.count === undefined) {
            this.count = 0;
        } else {
            this.count++;
        }
        return this.count;
    };

    /**
     * Get ID to be used for container Element id
     * @param type constructor for subclass of Screen
     * @returns {string} ID value
     */
    static getID() {
        return `${this.name}${this._getCount()}`
    };

    /**
     * Create a new instance of Screen subclass
     * @param parent {Element} HTML Element to append new Screen instance to
     * @param props {Object} Properties to pass to new Screen instance
     * @returns {Screen} new instance of Screen subclass
     */
    static build(parent = null, props = null) {
        const instance = new this(parent, props);
        // Ensures subclass and super class constructors finish before rendering
        instance._mount();
        return instance;
    };

    constructor(parent, props = null) {
        this.reRender = this.reRender.bind(this);
        this.destroy = this.destroy.bind(this);
        this.reRender = this.reRender.bind(this);
        this._getChildren = this._getChildren.bind(this);
        this.parent = parent;
        this.props = props;
        this.id = this.constructor.getID();
        this.container = this.constructor._createContainer(this.id);
        this.DOMbuilder = new DOMBuilder(this.container);
        this.parent.appendChild(this.container);
        this.listenerList = [];
        this.observerList = [];
        this.childList = [];
        this.styleSheet = null;
    }

    /*
        USEFUL FUNCTIONS TO CALL FROM SUBCLASS
     */

    /**
     * Rebuild HTML elements in this.render()
     * Useful variables referenced in this.render() have changed values
     */
    reRender() {
        console.log('rerender');
        this.removeChildren();
        this._destroyListeners();
        this._destroyObservers();
        this._destroyDOM();
        this._destroyStyles();

        this._initObservers();
        this._initStyles();
        this._buildDOM();
        this._initListeners();
        this.onLoad();
        this._initChildren();
    }

    /**
     * Rebuild styles
     * Useful if variables referenced in this.styles() have changed values
     */
    reStyle() {
        console.log('restyle')
        this._destroyStyles();
        this._initStyles();
    }

    /**
     * Creates event listener
     * @param element target Element
     * @param action event to listen for
     * @param callback function to call
     */
    createListener(element, action, callback) {
        this.listenerList.push( new Listener(element, action, callback) );
    }

    /**
     * Observe subject
     * @param add {Function} callback to register observer
     * @param remove {Function} callback to remove observer
     * @param callback {Function} callback to be called on subject update
     */
    createObserver(add, remove, callback) {
        this.observerList.push( new Observer(add, remove, callback) );
    }

    /**
     * Add Screen as child inside of this
     * @param screen {Screen} subclass of Screen
     * @param parent {Element} Element to append screen to
     * @param props {Object} properties to pass to child
     */
    addChild(screen, parent = null, props = null) {
        const appendTo = parent ? parent : this._getContainer();
        const child = screen.build(appendTo, props);
        this.childList.push({
            parent: appendTo,
            screen: child
        });
    }

    /**
     * Remove child appended to this
     * @param parent {Element} Element screen was appended to
     */
    removeChild(parent = null) {
        const toRemove = parent ? parent : this._getContainer();
        this.childList = this.childList.filter(child => {
            if (child.parent === toRemove) {
                child.screen.destroy();
                return false;
            }
            return true
        });
    }

    /**
     * Remove all children from this
     */
    removeChildren() {
        this.childList.forEach( child => child.screen.destroy());
        this.childList = [];
    }



    /*
        FUNCTIONS TO OVERRIDE IN SUBCLASS (optional)
     */

    /**
     * OVERRIDE to return Elements, strings, or array of the two
     * @returns {null}
     */
    render() { return null }

    /**
     * OVERRIDE to return style objects (see example)
     * @returns {null}
     */
    styles() { return null }

    /**
     * OVERRIDE to declare listeners
     */
    listeners() {}

    /**
     * OVERRIDE to declare observers
     */
    observers() {}

    children() {}

    /**
     * OVERRIDE to do work after this._mount is called
     */
    onLoad() {}

    /**
     * OVERRIDE to do work at end of this.destroy()
     */
    onDestroy() {}



    /*
        PRIVATE FUNCTIONS
     */

    /**
     * Create observers, listeners, styles, and DOM Elements declared in subclass
     * @private
     */
    _mount() {
        this._initObservers();
        this._initStyles();
        this._buildDOM();
        this._initListeners();
        this.onLoad();
        this._initChildren();
    }

    /**
     * Destroy observers, listeners, styles, and DOM Elements
     */
    destroy() {
        this.removeChildren();
        this._destroyListeners();
        this._destroyObservers();
        this._destroyDOM();
        this.container.remove();
        this._destroyStyles();
        this.onDestroy();
    }

    /**
     * Retrieve contents of render() and pass to this.DOMbuilder
     * @private
     */
    _buildDOM() {
        const HTML = this.render();
        if (!HTML) { return }
        this.DOMbuilder.build( HTML );
    }

    /**
     * Create listeners defined in subclass
     * @private
     */
    _initListeners() {
        this.listeners();
    }

    /**
     * Create observers defined in subclass
     * @private
     */
    _initObservers() {
        this.observers();
    }

    _initChildren() {
        this.children();
    }

    /**
     * Create styles defined in this.styles() or assigned to this.constructor.styles
     * @private
     */
    _initStyles() {
        const styles = this.constructor.styles !== undefined ? this.constructor.styles : this.styles();
        if (!styles) { return }
        this.styleSheet = new ScreenStyle(styles, this.id);
    }

    /**
     * Destroy listeners defined in subclass
     * @private
     */
    _destroyListeners() {
        this.listenerList.forEach(listener => listener.destroy() );
        this.listenerList = [];
    }

    /**
     * Destroy observers defined in subclass
     * @private
     */
    _destroyObservers() {
        this.observerList.forEach(observer => observer.destroy() );
        this.observerList = [];
    }

    /**
     * Destroy elements created by this.DOMbuilder
     * @private
     */
    _destroyDOM() {
        this.DOMbuilder.destroy();
    }

    /**
     * Destroy styles created by this.styleSheet
     * @private
     */
    _destroyStyles() {
        if (!this.styleSheet) {return}
        this.styleSheet.destroy();
        this.styleSheet = null;
    }



    _getContainer() { return this.container }

    _getChildren() { return this.childList }
    


}

/**
 * Create DIV for this to live in
 * @param id ID of DIV
 * @returns {HTMLDivElement}
 */
Screen._createContainer = id => {
    const container =  document.createElement('div');
    container.id = id;
    return container;
};
