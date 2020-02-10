class DisplayScreen extends Screen {
    constructor(parent, props) {
        super(parent, props);
        this.updateCount = this.updateCount.bind(this);
        this.colorIndex = 0;
        this.colors = ['black', 'blue', 'green', 'red'];
    }

    onDestroy() {
        App.globalState.tip.updateState( "onDestroy() runs after a Screen is destroyed" )
    }

    onLoad() {
        if (DisplayScreen.showTip === undefined) {
            DisplayScreen.showTip = true;
        } else {
            App.globalState.tip.updateState("onLoad() runs after a screen renders");
        }
    }

    observers() {
        // Observer count state and call this.updateCount on state change
        this.createObserver(App.globalState.count.addObserver,
            App.globalState.count.removeObserver, this.updateCount)
    }

    updateCount() {
        console.log('...observing count state change and calling reRender()');
        // reRender() refreshes styles and DOM of screen
        this.reRender();
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
        // message was passed as a prop by App.js
        return(
            `
            <span> ${this.props.message} ${App.globalState.count.getState()}</span>\
            `
        )
    }

    styles() {
        // New color will be returned each reRender();
        return({
            'span': {
                'color': `${this.getColor()}`
            }
        })
    }
}




