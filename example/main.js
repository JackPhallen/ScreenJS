document.addEventListener("DOMContentLoaded", function(event) {


    const showState = new State(true);
    const countState = new State(0);

    const state = {
        showState: showState,
        countState: countState
    };



    const app = App.getInstance(document.getElementById('page'), state);

});