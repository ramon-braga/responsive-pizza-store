let modalQt = 1;

const doc = el => document.querySelector(el); // shorthand
const docAll = el => document.querySelectorAll(el); // shorthand

pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);

    // Setting values main page
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        // Information Modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;

        doc('.pizzaBig img').src = pizzaJson[key].img;
        doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        doc('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        doc('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Removes selected pizza size
        doc('.pizzaInfo--size.selected').classList.remove('selected');
        
        // Setting the BIGGEST size pizza as default
        docAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        doc('.pizzaInfo--qt').innerHTML = modalQt;

        // Animation Modal
        doc('.pizzaWindowArea').style.opacity = 0;
        doc('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            doc('.pizzaWindowArea').style.opacity = 1;
        }, 100);

    });

    doc('.pizza-area').append(pizzaItem);
});