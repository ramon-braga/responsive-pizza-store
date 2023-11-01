let cart = [];
let modalQt = 1;
let modalKey = 0;

const doc = el => document.querySelector(el); // shorthand
const docAll = el => document.querySelectorAll(el); // shorthand

// Listing pizzas
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
        modalKey = key;

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

// Modal Events
function closeModal() {
    doc('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        doc('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

docAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((btn) => {
    btn.addEventListener('click', closeModal);
});
// Subtracting pizzas quantity
doc('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        doc('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
// Adding pizzas quantity
doc('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    doc('.pizzaInfo--qt').innerHTML = modalQt;
});
// Selecting the pizza size
docAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        doc('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
doc('.pizzaInfo--addButton').addEventListener('click', () => {
    let size =  parseInt(doc('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex(item => item.identifier == identifier);

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }

    updateCart();
    closeModal();
});

function updateCart() {
    if (cart.length > 0) {
        doc('aside').classList.add('show');
        doc('.cart').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = doc('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            doc('.cart').append(cartItem);
        }

        discount = subtotal * 0.1;
        total = subtotal - discount;

        doc('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        doc('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`
        doc('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        doc('aside').classList.remove('show');
    }
}