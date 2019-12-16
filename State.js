
class State {
    constructor(initState) {
        this.state = initState;
        this.observers = [];
        this.getState = this.getState.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    getState() {
        return this.state;
    }

    updateState(newState) {
        this.state = Object.assign({}, this.state, newState);
        this.updateObservers(newState);
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(toRemove) {
        this.observers = this.observers.filter( observer => observer !== toRemove);
    }

    updateObservers(newState) {
        this.observers.forEach( updateFunction => updateFunction(newState) );
    }
}