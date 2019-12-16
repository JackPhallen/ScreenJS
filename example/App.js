class App extends Screen {
    constructor(div, state) {
        super(div, state);
        this.onShow = this.onShow.bind(this);
    }

    onShow() {
        this.state.updateState({show: !this.state.getState().show});
    }


    createListeners() {
        document.getElementById('show').addEventListener("click", () => this.onShow());
    }

    removeListeners() {
        document.getElementById('show').removeEventListener("click", () => this.onShow())
    }

    onStateChange(state) {
        if (state.show === true) {
            this.addChild('buttonCont', ButtonScreen);
            this.addChild('displayCont', DisplayScreen);
        } else if (state.show === false) {
            this.removeChild('buttonCont');
            this.removeChild('displayCont');
        }
    }


    render() {
        return(
            `
            <h2> Example </h2>
            <button id="show">show counter</button>
            <div id="buttonCont"></div>
            <div id="displayCont"></div>
            `
        )
    }
}