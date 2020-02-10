class ScreenStyle {
    constructor(styleSheet, id) {
        this.id = id;
        this.styleSheet = styleSheet;
        this.styleStr = this._parse(this.styleSheet);
        this.element = this.constructor.getElement(this.styleStr);
        this.init();
    }
    

    init() {
        this.element.innerHTML = this.styleStr;
        document.head.appendChild( this.element );
    }

    destroy() {
        this.element.remove();
    }

    _parse(styleSheet) {
        let styleStr = "";
        Object.keys(styleSheet).forEach( selector => {
            styleStr += this._parseSelector(selector);
            styleStr += `{\n`;
            Object.keys(styleSheet[selector]).forEach( styleKey => {
                styleStr += `${styleKey}: ${styleSheet[selector][styleKey]}; \n`;
            });
            styleStr += "}\n\n";
        });
        return styleStr;
    }

    _parseSelector(selector) {
        if (selector.includes('self')) {
            return `#${this.id}`;
        } else if (selector.includes('global')) {
            return selector.replace('global', '');
        } else {
            return `#${this.id} ${selector}`;
        }
    }
}


ScreenStyle.getElement = (styleString) => {
    const element = document.createElement('style');
    element.innerHTML = styleString;
    return element;
};




