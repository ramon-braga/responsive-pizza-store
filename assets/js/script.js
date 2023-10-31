let html = '';
const doc = el => document.querySelector(el); // shorthand
const docAll = el => document.querySelectorAll(el); // shorthand

pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        doc('.pizzaWindowArea').style.opacity = 0;
        doc('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            doc('.pizzaWindowArea').style.opacity = 1;
        }, 100);

    });

    doc('.pizza-area').append(pizzaItem);
});