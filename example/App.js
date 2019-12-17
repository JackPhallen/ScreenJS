

class App extends DynamicScreen {
    constructor(parent, state) {
        super(parent, state);
        this.title = "Example";
        this.updateView = this.updateView.bind(this);
    }


    onShow() {
        this.state.showState.updateState(!this.state.showState.getState());
    }

    observers() {
        this.createObserver(this.state.showState.addObserver, this.state.showState.removeObserver, this.updateView)
    }


    listeners() {
        this.createListener(document.getElementById('show'), "click", this.onShow.bind(this));
    }

    onLoad() {
        this.addChild(ButtonScreen, document.getElementById("buttonscreen"));
        this.addChild(DisplayScreen);
    }


    updateView(doShow) {
        if (doShow) {
            document.getElementById('show').innerHTML = "Hide";
            this.addChild(ButtonScreen, document.getElementById("buttonscreen"));
            this.addChild(DisplayScreen);
        } else {
            document.getElementById('show').innerHTML = "Show";
            this.removeChild(this.DOM);
            this.removeChild(document.getElementById("buttonscreen"))
        }
    }


    render() {
        return(
            `
            <h2 class="title"> ${this.title} </h2>
            <button class ="test" id="show">Hide</button>
            <div id="buttonscreen"></div>
            `
        )
    }
}