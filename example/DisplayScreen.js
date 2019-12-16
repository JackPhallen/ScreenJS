class DisplayScreen extends Screen {
    constructor(div, state) {
        super(div, state);
    }


    onStateChange(state) {
        if (state.count) {
            this.DOM.innerHTML = getCountString(state.count);
        }
    }


    render() {
        return( getCountString(this.state.getState().count))
    }
}

function getCountString(count) {
    return `<span> The count is ${count}</span>`
}