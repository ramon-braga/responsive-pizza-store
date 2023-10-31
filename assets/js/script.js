let html = '';
const doc = el => document.querySelector(el); // shorthand
const docAll = el => document.querySelectorAll(el); // shorthand

pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);

    doc('.pizza-area').append(pizzaItem);

});