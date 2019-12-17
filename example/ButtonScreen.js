class ButtonScreen extends Screen {
    constructor(div, state) {
        super(div, state);
    }

    onIncrement() {
        this.state.updateState({count: this.state.getState().count + 1})
    }

    listeners() {
        this.createListener(document.getElementById('counterButton'),
            "click", this.onIncrement.bind(this));
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