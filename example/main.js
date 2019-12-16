document.addEventListener("DOMContentLoaded", function(event) {

    const state = new State({
        show: true,
        count: 0
    });

    const app = new App('page', state);

});