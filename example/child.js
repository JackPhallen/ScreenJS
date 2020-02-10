class Child extends Screen {
    constructor(parent, props) {
        super(parent, props);
        this.onIncrement = this.onIncrement.bind(this);
    }

    onLoad() {
    console.log(this.props)
    }

    onHook() {
        console.log(this.props.count)
    }

    listeners() {
        this.createListener(document.getElementById(Parent.buttonID),
            "click", this.onIncrement);
    }

    onIncrement() {
        console.log('inc')
        this.props.count++;
        console.log(this.props.count2);
    }

    render() {
        // message was passed as a prop by App.js
        return(
            Parent.buildButton()
        )
    }

}