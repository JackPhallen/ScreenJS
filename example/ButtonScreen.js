class ButtonScreen extends Screen {
    constructor(parent, props) {
        super(parent, props);
        this.onIncrement = this.onIncrement.bind(this);
    }

    onIncrement() {
        console.log('Updating count state...')
        App.globalState.count.updateState(App.globalState.count.getState() + 1);
        this.updateTip();
    }

    listeners() {
        this.createListener(document.getElementById(ButtonScreen.buttonID),
            "click", this.onIncrement);
    }

    onLoad() {
        console.log('onLoad() is called after both superclass and subclass constructors finish');
    }

    onDestroy() {
        console.log('onDestroy() is called after a screens DOM, listeners, and observers are destroyed');
    }

    updateTip() {
        const tipMessage = ButtonScreen.getTip();
        App.globalState.tip.updateState(tipMessage);
    }


    render() {
        // Element instances can be rendered...
        return(
            ButtonScreen.buildButton()
        )
    }
}

ButtonScreen.buttonID = 'counterbutton';

// Styles declared statically
ButtonScreen.styles = {
    [`#${ButtonScreen.buttonID}`]: {
        'margin': '10px'
    }
    // NOTE: Computed property names such as [`#${ButtonScreen.buttonID}`] might not be fully supported
};

ButtonScreen.buildButton = () => {
    let button = document.createElement('button');
    button.id = ButtonScreen.buttonID;
    button.innerHTML = "Increment";
    return button;
};


ButtonScreen.getTip = () => {
    if (ButtonScreen.tipCount === undefined) {
        ButtonScreen.tipCount = 0;
    }

    if (ButtonScreen.tipCount === ButtonScreen.tips.length) {
        ButtonScreen.tipCount = 0;
    }

    const tipMessage =  ButtonScreen.tips[ButtonScreen.tipCount];
    ButtonScreen.tipCount++;
    return tipMessage;
};

ButtonScreen.tips = [
    'Check this examples source for comments and tips',
    'Use observers to dynamically update screens',
    'Pass data to a child Screen with props',
    'render() can return HTML strings, an Element instance, or an array',
    'style objects can be declared as a static variable or inside of styles()',
    'reRender() is called each increment to reflect new state',
    'Open the console for helpful messages',
];