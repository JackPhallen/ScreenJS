/**
 * Class to parse and append HTML to DOM
 */
class DOMBuilder {
    /**
     *
     * @param root Instance of Element to append HTML to
     */
    constructor(root) {
        this.root = root;
        this.parser = new DOMParser();
    }

    /**
     * Determine type of HTML and call functions to parse and append
     * @param HTML Element, string, or array of the two
     */
    build(HTML) {
        if (Array.isArray(HTML)) {
            HTML.forEach( element => this.build(element) );
        } else if ( this.constructor.isString(HTML) ) {
            this._appendString(HTML);
        } else if ( this.constructor.isElement(HTML) ) {
            this._appendElement(HTML);
        } else {
            this._appendElement(HTML);
        }
    }

    /**
     * Handle string HTML
     * @param str string of HTML
     * @private
     */
    _appendString(str) {
        const elements = this.parseString(str);
        this.build( Array.from(elements) );
    }

    /**
     * Handle Element
     * @param HTML Element to append to root
     * @private
     */
    _appendElement(HTML) {
        this.root.appendChild(HTML);
    }

    /**
     * Parse string to Element or NodeList
     * @param str string of HTML
     * @returns {NodeListOf<ChildNode> | ActiveX.IXMLDOMNodeList}
     */
    parseString(str) {
        const doc = this.parser.parseFromString(str, 'text/html');
        const htmlNode = this.constructor.getRoot(doc);
        return htmlNode.childNodes;
    }

    /**
     * Remove all Elements from this.root
     */
    destroy() {
        while (this.root.lastChild) {
            this.root.removeChild(this.root.lastChild);
        }
    }


}

/**
 * Check if HTML is of type string
 * @param HTML
 * @returns {boolean}
 */
DOMBuilder.isString = (HTML) => {
    return typeof HTML === "string";
};

/**
 * Get <body> Element of HTMLBodyElement
 * @param doc
 * @returns Element
 */
DOMBuilder.getRoot = (doc) => {
  return doc.querySelector('body');
};

/**
 * Check if element is an Element
 * @param element
 * @returns {boolean}
 */
DOMBuilder.isElement = (element) => {
    return element instanceof Element;
};

