
class State {
    //TODO have constructor create nested _subjects to be observered to avoid state change madness
    constructor(initState) {
        this.state = initState;
        this.observers = [];
        this.getState = this.getState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addObserver = this.addObserver.bind(this);
        this.removeObserver = this.removeObserver.bind(this);
    }

    getState() {
        return this.state;
    }

    updateState(newState) {
        this.state = newState;
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