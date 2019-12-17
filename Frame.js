

class Frame {

    static getID(instance) {
        if (!instance.count) {
            instance.count = 0;
        } else {
            instance.count++;
        }
        return`${instance.name}${instance.count}`

    }

    static getInstance(parent) {
        const instance =  new this(parent);
        instance.mount();
        return instance;
    }

    static _createContainer(instance) {
        const element = document.createElement('div');
        element.id = instance.ID;
        return element;
    }


    constructor(parent) {
        this._bindMembers();
        this.parent = parent;
        this.ID = this.constructor.getID(this.constructor);
        this._eventListeners = [];
        this._styleSheet = null;
        this.DOM = this.constructor._createContainer(this);
        parent.appendChild(this.DOM);
    }

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

    styles() {return null}

    reRender() {
        this._updateDom(this.render());
    }


    /**
     * calls removeListeners() and clears this.DOM of this and all _children
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
        // document.getElementById('button').addEventListener('click',
        //     this.onButtonClick.bind(this), false);
    }

    onLoad() {}

    onDestroy() {}


    /**
     * Adds event listener to this._eventListeners to be initiated and removed with life of this
     *
     * @param element
     * @param action
     * @param callback
     */
    createListener(element, action, callback) {
        this._eventListeners.push({
            element: element,
            action: action,
            callback: callback
        });
    }

    _initStyles() {
        const _styleObj = this.styles();
        if (_styleObj) {
            console.log(_styleObj);
            this._setStyle(_styleObj);
        }
    }

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

    _bindMembers() {
        //console.log(this);
    }

    static compareClass(firstClass, secondClass) {
        return (Object.getPrototypeOf(Object.getPrototypeOf(firstClass)).constructor.name
            === Object.getPrototypeOf(secondClass).name);
    }


}




