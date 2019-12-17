class DisplayScreen extends Screen {
    constructor(div, state) {
        super(div, state);
    }


    onStateChange(state) {
        if (state.count >= 0) {
            this.DOM.innerHTML = getCountString(state.count);
        }
    }

}

function getCountString(count) {
    return `<span> The count is ${count}</span>`
}