/**
 * State / subject to be observed by Observer class
 */
class State {

    /**
     *
     * @param initState initial state
     */
    constructor(initState) {
        this.getState = this.getState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addObserver = this.addObserver.bind(this);
        this.removeObserver = this.removeObserver.bind(this);
        this.state = initState;
        this.observers = [];
    }

    /**
     * Get value of state
     * @returns {*}
     */
    getState() {
        return this.state;
    }

    /**
     * Set value of state
     * @param newState
     */
    updateState(newState) {
        this.state = newState;
        this.updateObservers(newState);
    }

    /**
     * Add observer function to be called on state update
     * @param observer {Function}
     */
    addObserver(observer) {
        this.observers.push(observer);
    }

    /**
     * Remove
     * @param toRemove {Function}
     */
    removeObserver(toRemove) {
        this.observers = this.observers.filter( observer => observer !== toRemove);
    }


    /**
     * Pass new state value to each observer callback
     * @param newState
     */
    updateObservers(newState) {
        this.observers.forEach( updateFunction => updateFunction(newState) );
    }
}