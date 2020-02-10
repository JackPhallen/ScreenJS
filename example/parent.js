class Parent extends Screen {
    constructor(parent, props) {
        super(parent, props);
        this.hooks = {
            count: 0,
            count2: 7
        };
        this.count2 = 0
    }

    onLoad() {
        this.renderChild();
        this.hooks.count++;
    }

    onHook() {

    }


    renderChild() {
        this.addChild(Child, null, {
            count: this.hooks.count,
            count2: 3

        })
    }

    render() {
        return(
            `<span> COUNT: ${this.hooks.count}</span>`
        )
    }


}

Parent.buttonID = 'counterbutton';


Parent.styles = {
    [`#${ButtonScreen.buttonID}`]: {
        'margin': '10px'
    }
};

Parent.buildButton = () => {
    let button = document.createElement('button');
    button.id = ButtonScreen.buttonID;
    button.innerHTML = "Increment";
    return button;
};