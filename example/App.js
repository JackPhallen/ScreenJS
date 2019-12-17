class App extends Screen {
    constructor(div, state) {
        super(div, state);
    }

    onShow() {
        this.state.updateState({show: !this.state.getState().show});
    }


    listeners() {
        this.createListener(document.getElementById('show'), "click", this.onShow.bind(this));
    }


    onStateChange(state) {
        if (state.show === true) {
            document.getElementById('show').innerHTML = "Hide";
            this.addChild('buttonCont', ButtonScreen);
            this.addChild('displayCont', DisplayScreen);
        } else if (state.show === false) {
            document.getElementById('show').innerHTML = "Show";
            this.removeChild('buttonCont');
            this.removeChild('displayCont');
        }
    }


    render() {
        return(
            `
            <h2> Example </h2>
            <button id="show"></button>
            <div id="buttonCont"></div>
            <div id="displayCont"></div>
            `
        )
    }
}