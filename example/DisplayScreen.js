class DisplayScreen extends DynamicScreen {
    constructor(parent, state) {
        super(parent, state);
        this.updateCount = this.updateCount.bind(this);
    }

    observers() {
        this.createObserver(this.state.countState.addObserver, this.state.countState.removeObserver, this.updateCount)
    }

    updateCount() {
        this.reRender();
    }

    render() {
        return(
            `
            <span> The count is ${this.state.countState.getState()}</span>\
            `
        )
    }

}
