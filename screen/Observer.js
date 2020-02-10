/**
 *  Screen observer
 */
class Observer {
    /**
     *
     * @param add function to add this as an observer
     * @param remove function to remove this as an observer
     * @param callback function to call when subject is updated
     */
    constructor(add, remove, callback) {
        this.add = add;
        this.remove = remove;
        this.callback = callback;
        this._init();
    }

    /**
     * Add callback as observer to subject
     * @private
     */
    _init() {
        this.add(this.callback);
    }

    /**
     *  Remove callback as an observer to subject
     */
    destroy() {
        this.remove(this.callback);
    }
}