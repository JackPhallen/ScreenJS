class ButtonScreen extends Screen {
    constructor(div, state) {
        super(div, state);
        this.onIncrement = this.onIncrement.bind(this);
    }

    onIncrement() {
        this.state.updateState({count: this.state.getState().count + 1})
    }

    createListeners() {
        document.getElementById('counterButton').addEventListener("click", () => this.onIncrement());
    }

    removeListeners() {
        document.getElementById('counterButton').removeEventListener("click", () => this.onIncrement())
    }

    render() {
        return(
            renderButton()
        )
    }
}

function renderButton() {
    let button = document.createElement('button');
    button.id = 'counterButton';
    button.innerHTML = "Increment";
    return button;
}