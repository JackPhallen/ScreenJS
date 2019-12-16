/**
 * Interface for screen components that have state and listeners
 * 
 *
 * @class Screen
 */
class Screen {
    /**
     * Creates an instance of Screen.
     * @param {string} div String ID of DIV to write screen elements to
     * @param {State Object} state Global app state
     * @memberof Screen
     */
    constructor(div, state) {
        // NOTE: this.state is for global app states
        // NOTE: Declare isolated Screen state variables in constructor
        // EXAMPLE: this.input = "" NOT this.state.input = ""
        this.state = state;
        this.DOM = document.getElementById(div);
        // Render content returned by render()
        this._updateDom(this.render());
        // Initiate event listeners in function createListeners()
        this.createListeners();
        this.children = {};
        this.onStateChange = this.onStateChange.bind(this);
        // Register this as observer so that this.onStateChange is called on state change
        this.state.addObserver(this.onStateChange);
        this.onStateChange(this.state.getState());
    }

    /**
     *  Creates new instance of Screen implementation
     *
     * @static
     * @param {string} div ID of HTMl DIV screen exists within
     * @param {State Object} state State Class instance
     * @returns
     * @memberof Screen
     */
    static getInstance(divID, state) { 
        return new this(divID, state);
    }

    /**
     * calls removeListeners() and clears this.DOM of this and all children
     *
     * @memberof Screen
     */
    destroy() {
        this.removeListeners();
        Object.keys(this.children).forEach( child => this.removeChild(child) );
        this._renderHTMLString("");
        this.state.removeObserver(this.onStateChange);
    }

    /**
     * Must override to return String or HTMLDivElement Object to be rendered
     * 
     * @memberof Screen
     */
    render() {
        throw new TypeError("Must override method");
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
     * Called when this.state changes
     *
     * @param {Object} newState Object containing the new state changes
     * @memberof Screen
     */
    onStateChange(newState) {}

    /**
     * Called by constructor(), override to include event listener bindings 
     *
     * @memberof Screen
     */
    createListeners() {
        /*Example*/
        // document.getElementById('button').addEventListener('click', 
        //     this.onButtonClick.bind(this), false);
    }

    /**
     * Called by destroy(), override to include event listener unbindings
     *
     * @memberof Screen
     */
    removeListeners() {
        /*Example*/
        // document.getElementById('button').removeEventListener('change', this.onButtonClick);
    }

    /**
     *  Add child Screen instance to be displayed in this.DOM
     *
     * @param {string} divID HTML DIV child lives in
     * @param {Screen Class} screen Screen class (unititiated)
     * @memberof Screen
     */
    addChild(divID, screen) {
        // Ensure only one child occupies DIV
        if (Object.keys(this.children).includes(divID)) {
            this.removeChild(divID);
        }
        // invokes Screen.getInstance of class 
        this.children[divID] = screen.getInstance(divID, this.state);
    }

    /**
     * Destroy child and set reference to null to delete instance
     *
     * @param {string} divID HTML DIV child lives in
     * @memberof Screen
     */
    removeChild(divID) {
        if (Object.keys(this.children).includes(divID)) {
            this.children[divID].destroy();
            delete this.children[divID];
        }
    }
    
    /**
     * Render HTML string or HTMLDivElement into this.DOM
     *
     * @param {*} HTML new HTML to render
     * @memberof Screen
     */
    _updateDom(HTML) {
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
     * @param {HTMLElement Object} element element to append
     * @memberof Screen
     */
    _renderHTMLElement(element) {
        this.DOM.appendChild(element);
    }

}



