let cart = [];
let cartCount = document.getElementById('cart-count');
let totalPriceElem = document.getElementById('total-price');
let orderBtn = document.getElementById('order-btn');
let cartItemsElem = document.getElementById('cart-items');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
        let pizza = e.target.closest('.pizza');
        let price = parseInt(pizza.getAttribute('data-price'));
        let name = pizza.querySelector('h3').textContent;
        cart.push({ name, price });
        updateCart();
        showAddedMessage(name);
    });
});

function updateCart() {
    cartCount.textContent = cart.length;
    let total = cart.reduce((a, b) => a + b.price, 0);
    totalPriceElem.textContent = `Загальна вартість: ${total} грн`;

    cartItemsElem.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} грн`;
        cartItemsElem.appendChild(li);
    });

    orderBtn.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

function showAddedMessage(pizzaName) {
    const msg = document.createElement('div');
    msg.textContent = `✅ ${pizzaName} додано до кошика!`;
    msg.style.position = 'fixed';
    msg.style.bottom = '30px';
    msg.style.right = '30px';
    msg.style.backgroundColor = '#4caf50';
    msg.style.color = 'white';
    msg.style.padding = '12px 20px';
    msg.style.borderRadius = '10px';
    msg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    msg.style.zIndex = '3000';
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2000);
}

orderBtn.addEventListener('click', () => {
    document.getElementById('order-form-modal').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('order-form-modal').style.display = 'none';
});

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('🎉 Дякуємо за замовлення! Ми зателефонуємо найближчим часом.');
    document.getElementById('order-form-modal').style.display = 'none';
    cart = [];
    updateCart();
});

function updateCart() {
    cartCount.textContent = cart.length;
    let total = cart.reduce((a, b) => a + b.price, 0);
    totalPriceElem.textContent = `Загальна вартість: ${total} грн`;

    cartItemsElem.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} грн `;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '🗑';
        removeBtn.style.border = 'none';
        removeBtn.style.background = 'transparent';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.fontSize = '16px';
        removeBtn.style.marginLeft = '10px';

        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };

        li.appendChild(removeBtn);
        cartItemsElem.appendChild(li);
    });

    orderBtn.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

