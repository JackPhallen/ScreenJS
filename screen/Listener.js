/**
 * Event listener for Screen
 */
class Listener {
    /**
     *
     * @param element target element
     * @param action action event
     * @param callback function to call on action
     */
    constructor(element, action, callback) {
        this.element = element;
        this.action = action;
        this.callback = callback;
        this._init();
    }

    /**
     * Add event listener to element
     * @private
     */
    _init() {
        this.element.addEventListener(this.action, this.callback);
    }

    /**
     * Remove event listener from element
     */
    destroy() {
        this.element.removeEventListener(this.action, this.callback);
    }
}