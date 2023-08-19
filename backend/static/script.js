const orderForm = document.getElementById('order-form');
const addItemButton = document.getElementById('add-item');
const addToCartButton = document.getElementById('add-to-cart');
const cart = document.getElementById('cart');

addItemButton.addEventListener('click', addNewItem);
addToCartButton.addEventListener('click', addToCart);

function addNewItem() {
    const newItem = document.createElement('div');
    newItem.innerHTML = `
        <label for="food-item">Select Food Item:</label>
        <select class="food-item" name="food-item">
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <!-- Add more food items here -->
        </select>
        <label for="quantity">Quantity:</label>
        <input class="quantity" type="number" name="quantity" value="1" min="1">
    `;
    orderForm.insertBefore(newItem, addItemButton);
}

function addToCart() {
    const cartItems = orderForm.querySelectorAll('.food-item');
    const quantities = orderForm.querySelectorAll('.quantity');
    cart.innerHTML = '<h2>Cart</h2>';
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i].value;
        const quantity = parseInt(quantities[i].value);
        const price = calculatePrice(item, quantity);
        total += price;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${quantity}x ${item} - UGX ${price.toLocaleString()}`;
        cart.appendChild(itemDiv);
    }
    const totalPriceSpan = document.getElementById('total-price');
    totalPriceSpan.textContent = 'UGX ${total.toLocaleString()}';
}

function calculatePrice(item, quantity) {
    const selectedOption = document.querySelector('.food-item option[value="${item}"]');
    const price = parseInt(selectedOption.getAttribute('data-price'));

    //Calculate total price
    return quantity * price;
}
