// Common function to update localStorage with selected items
function updateLocalStorage(selectedItems) {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}

// Calculate total price based on selected items
function calculateTotal(selectedItems) {
    let total = 0;
    selectedItems.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

// Update total price display on the checkout page
function updateTotalDisplay(selectedItems) {
    const total = calculateTotal(selectedItems);
    const totalDiv = document.getElementById('total-price');
    if (totalDiv) {
        totalDiv.textContent = `Total: UGX ${total.toLocaleString()}`;
    }
}

// Update selected items and total when quantity changes
function updateSelectedItemsAndTotal(selectedItems, name, newQuantity) {
    selectedItems.forEach(item => {
        if (item.name === name) {
            item.quantity = newQuantity;
        }
    });

    updateLocalStorage(selectedItems);
    updateTotalDisplay(selectedItems);
}

// Display selected items and quantities along with prices (checkout page)
function displaySelectedItems() {
    const selectedItemsDiv = document.getElementById('selected-items');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (selectedItems && selectedItems.length > 0) {
        selectedItemsDiv.innerHTML = ''; // Clear existing items

        selectedItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: UGX ${item.price.toLocaleString()}</p>
                <label>Quantity: <input type="number" class="quantity-input" data-name="${item.name}" value="${item.quantity}" min="1"></label>
            `;
            selectedItemsDiv.appendChild(itemDiv);

            // Add event listener to quantity input for each item
            const quantityInput = itemDiv.querySelector('.quantity-input');
            if (quantityInput) {
                quantityInput.addEventListener('change', () => {
                    const newQuantity = parseInt(quantityInput.value);
                    updateSelectedItemsAndTotal(selectedItems, item.name, newQuantity);
                });
            }
        });

        // Calculate and display total price
        updateTotalDisplay(selectedItems);
    }
}

// Handle "Proceed to Checkout" button click
function handleProceedToCheckout() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (selectedItems && selectedItems.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Please select items before proceeding to checkout.');
    }
}

// Add event listener to "Proceed to Checkout" button on order page
const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');

if (proceedToCheckoutButton) {
    proceedToCheckoutButton.addEventListener('click', handleProceedToCheckout);
}

// Call the function to display selected items on the checkout page
displaySelectedItems();
