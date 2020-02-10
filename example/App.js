

class App extends Screen {
    constructor(parent, props) {
        super(parent, props);
        App.initState();
        // Be sure to bind this to call back functions
        this.onShowToggle = this.onShowToggle.bind(this);
        this.renderTip = this.renderTip.bind(this);
        this.doShow = true;
        this.firstTip = "Open the console for helpful messages";
        this.colorIndex = 0;
        this.colors = ['black', 'blue', 'green', 'red'];

    }

    onLoad() {
        this.updateView();
    }

    observers() {
        // Observers the tip state and called this.renderTip when state is changed
        this.createObserver(App.globalState.tip.addObserver,
            App.globalState.tip.removeObserver, this.renderTip);
    }

    listeners() {
        // Appends a click event listener to the button element
        this.createListener(document.getElementById(App.showToggle),
            "click", this.onShowToggle);
    }

    renderTip() {
        const element = document.getElementById(App.tipText);
        element.innerText = App.globalState.tip.getState();
    }

    onShowToggle() {
        // Callback for event listener...
        this.doShow = !this.doShow;
        this.updateView();
    }

    updateView() {
        this.updateButton();
        if (this.doShow) {
            this.showChildren();
        } else {
            this.hideChildren();
        }
        // reStyle() reloads the style of the Screen
        this.reStyle();
    }


    updateButton() {
        const button = document.getElementById(App.showToggle);
        button.innerText = this.doShow ? "Hide" : "Show";
    }

    showChildren() {
        // App.globalState is passed to children unless overridden like below
        // This does nothing as stateToPass is identical to App.globalState .. just as example :)
        const stateToPass = {
            tip: App.globalState.tip,
            count: App.globalState.count
        };

        this.addChild(
            ButtonScreen,
            document.getElementById(App.buttonScreen),
              null, // No props are passed
            stateToPass // if left undefined, App.globalState will be passed to child
        );

        // If no root element is passed, the child Screen will be appended to this
        // message is a prop and will be accessible by the child screen
        this.addChild(DisplayScreen, null, {
            message: 'The count is: ',
        });
    }


    hideChildren() {
        if (App.alternate()) {
            // Child screens can be removed all at once...
            this.removeChildren();
        } else {
            // Or one at a time
            this.removeChild();
            this.removeChild(document.getElementById(App.buttonScreen))
        }
    }

    getColor() {
        if (this.colorIndex === this.colors.length) {
            this.colorIndex = 0;
        }
        const color = this.colors[this.colorIndex];
        this.colorIndex++;
        return color;
    }

    render() {
        console.log('render() is called after both super class and subclass constructors finish...');
        console.log(`... so class members can be accessed `);
        // Arrays can be returned by render()
        return([
                `
                <h2 id="${App.titleID}"> ${App.titleText} </h2>
                <p id="${App.tipText}">${this.firstTip}</p>
                `,
                `
                <button id="${App.showToggle}">Hide</button>
                `,
                `
                <div id="${App.buttonScreen}"></div>
                `

            ]
        )
    }

    styles() {
        // styles() is called after the constructors...
        // Property name "self" is resolved to the div of this
        // The element ID of this will be appended to each style property
        return({
            'self': {
                'display': 'flex',
                'flex-direction': 'column',
                'align-content': 'center',
                'justify-content': 'center',
                'align-items': 'center',
                'margin': 'auto',
            },
            [`#${App.titleID}`]: {
                'color': `${this.getColor()}` // Will dynamically update color on reStyle()
            },
        })
        // NOTE: Computed property names such as [`#${App.titleID}`] might not be fully supported
    }
}

/*
    Content
 */
App.titleText = 'ScreenJS Example';

/*
    Elements
 */
App.titleID = 'title';
App.buttonScreen = 'buttonscreen';
App.showToggle = 'showbutton';
App.tipText = 'tips';


App.initState = () => {
    App.globalState = {
        count: new State(0),
        tip: new State(null)
    }
};
// NOTE: This is just to alternate between the two ways to remove children in this.hideChildren()
App.alternate = () => {
  if (App.alternate.bool === undefined) {
      App.alternate.bool = true;
  } else {
      App.alternate.bool = !App.alternate.bool;
  }
  return App.alternate.bool;
};