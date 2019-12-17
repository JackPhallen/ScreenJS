const styleSheet = {
    self: {
        'margin': '20px',
        'background-color': 'green'
    }
};

class ButtonScreen extends DynamicScreen {
    constructor(parent, state) {
        super(parent, state);
        console.log("not loaded yet");
    }

    onIncrement() {
        this.state.countState.updateState(this.state.countState.getState() + 1);
    }

    listeners() {
        this.createListener(document.getElementById('counterButton'),
            "click", this.onIncrement.bind(this));
    }

    onLoad() {
        console.log("now im loaded!");
        console.log("this function is called after the subclass constructor finishes!")
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