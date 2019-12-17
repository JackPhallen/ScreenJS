/**
 * Basic GUI frame with listeners, styles, and props from parent
 *
 * @class Frame
 */
class Frame {

    /**
     * Get unique ID for instance
     *
     * @static
     * @param {Frame} instance subclass of Frame
     * @returns ID string
     * @memberof Frame
     */
    static getID(instance) {
        if (instance.count === undefined) {
            instance.count = 0;
        } else {
            instance.count++;
        }
        return `${instance.name}${instance.count}`

    }

    /**
     * Get new instance of this.
     *
     * @static
     * @param {Element} parent HTML element
     * @param {Object} [props=null] props to be passed to new instance
     * @returns new instance of this
     * @memberof Frame
     */
    static getInstance(parent, props = null) {
        const instance =  new this(parent, props);
        instance.mount();
        return instance;
    }

    /**
     * Render DIV for instance to live in
     *
     * @static
     * @param {Frame} instance - instance of Frame subclass
     * @returns HTML element
     * @memberof Frame
     */
    static _createContainer(instance) {
        const element = document.createElement('div');
        element.id = instance.ID;
        return element;
    }


    constructor(parent, props) {
        this.createListener = this.createListener.bind(this);
        this.props = props;
        this.parent = parent;
        this.ID = this.constructor.getID(this.constructor);
        this._eventListeners = [];
        this._styleSheet = null;
        this.DOM = this.constructor._createContainer(this);
        parent.appendChild(this.DOM);
    }

    /**
     * Called after constructor. Allows for member variables to be used when initiating this
     *
     * @memberof Frame
     */
    mount() {
        this._initStyles();
        this._updateDom(this.render());
        this._initListeners();
        this.onLoad();
    }

    /**
     * Must override to return String or HTMLDivElement Object to be rendered
     *
     * @memberof Screen
     */
    render() {
        // throw new TypeError("Must override method");
        /* Example of String render*/
        // return (
        //     `
        //     <div id="EXAMPLE"></div>
        //     `
        // )
        /* Example of HTMLDivElement Object render */
        // return (
        //     document.createElement('div')
        // )

    }

    /**
     * Override to return Object with styles for classes
     *
     * @returns
     * @memberof Frame
     */
    styles() {
        // NOTE: 'self' resolves to ID of this.DOM
        // return {
        //     self: {
        //         'background-color': 'red'
        //     },
        //     text: {
        //         'padding': '10px'
        //     }
        // }
        return null;
    }

    /**
     * Render contents of this.render() again
     *
     * @memberof Frame
     */
    reRender() {
        this._updateDom(this.render());
    }


    /**
     * Destroy all members of this
     *
     * @memberof Screen
     */
    destroy() {
        this._removeListeners();
        this._destroyDOM();
        this._destroyStyleSheet();
        this.onDestroy();
    }

    /**
     * Called by constructor(), override to include event listener bindings
     *
     * @memberof Screen
     */
    listeners() {
        /*Example*/
        // this.createListener(document.getElementsById('button'), 'click', this.onButtonClick);
    }

    /**
     * Called after this is mounted
     *
     * @memberof Frame
     */
    onLoad() {}

    /**
     * Called at the end of destroy()
     *
     * @memberof Frame
     */
    onDestroy() {}


    /**
     * Adds event listener to this._eventListeners to be initiated and removed with life of this
     *
     * @param {HTMLElement} element - element to bind event listener to
     * @param {string} action - action type
     * @param {Function} callback - callback function on event
     * @memberof Frame
     */
    createListener(element, action, callback) {
        this._eventListeners.push({
            element: element,
            action: action,
            callback: callback
        });
    }

    /**
     * Called by mount() to set styles specified in this.styles()
     *
     * @memberof Frame
     */
    _initStyles() {
        const _styleObj = this.styles();
        if (_styleObj) {
            console.log(_styleObj);
            this._setStyle(_styleObj);
        }
    }

    /**
     * Append styles to <head>
     *
     * @param {Object} style - Object containing styles from this.styles()
     * @memberof Frame
     */
    _setStyle(style) {
        let styleStr = "";
        Object.keys(style).forEach( className => {
            let classStr = `#${this.ID} `;
            if (className !== "self") {
                classStr += `.${className} `;
            }
            classStr += `{\n`;
            Object.keys(style[className]).forEach( styleKey => {
                classStr += `${styleKey}: ${style[className][styleKey]}; \n`;
            });
            styleStr += classStr;
            styleStr += "}\n\n";
        });
        this._styleSheet = document.createElement('style');
        this._styleSheet.innerHTML = styleStr;
        document.head.appendChild(this._styleSheet);
    }


    /**
     * Creates event listeners from listeners()
     * @private
     */
    _initListeners() {
        this.listeners();
        this._eventListeners.forEach(listener => {
            listener.element.addEventListener(listener.action, listener.callback);
        });
    }

    /**
     * Called by destroy(), removes event listeners
     *
     * @memberof Screen
     */
    _removeListeners() {
        this._eventListeners.forEach(listener => {
            listener.element.removeEventListener(listener.action, listener.callback);
        });
        this._eventListeners = [];
    }

    /**
     * Removes elements of this
     *
     * @memberof Frame
     */
    _destroyDOM() {
        if (this.DOM) {
            this.DOM.remove();
            this.DOM = null;
        }
    }

    /**
     * Render HTML string or HTMLDivElement into this.DOM
     *
     * @param {*} HTML new HTML to render
     * @memberof Screen
     */
    _updateDom(HTML) {
        if (HTML === undefined) {return;}
        if (typeof HTML === "string") {
            this._renderHTMLString(HTML);
        } else {
            this._renderHTMLElement(HTML);
        }
    }


    /**
     * Render HTML string inside this.dom
     *
     * @param {string} HTML string of HTML
     * @memberof Screen
     */
    _renderHTMLString(HTML) {
        this.DOM.innerHTML = HTML;
    }

    /**
     * Append HTML Element Object to this.DOM
     *
     * @param {HTMLElement} element element to append
     * @memberof Screen
     */
    _renderHTMLElement(element) {
        this.DOM.appendChild(element);
    }

    _destroyStyleSheet() {
        if (this._styleSheet) {
            this._styleSheet.remove();
            this._styleSheet = null;
        }
    }

    static compareClass(firstClass, secondClass) {
        return (Object.getPrototypeOf(Object.getPrototypeOf(firstClass)).constructor.name
            === Object.getPrototypeOf(secondClass).name);
    }


}
