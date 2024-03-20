const cards = document.querySelectorAll('.card');
const cartBody = document.querySelector('.cart tbody');
const totalAmountElement = document.getElementById('totalAmount');
const clearButton = document.getElementById('clearButton');

let totalAmount = 0;

cards.forEach(card => {
  const input = card.querySelector('input');
  const plusBtn = card.querySelector('.plus');
  const minusBtn = card.querySelector('.minus');
  const itemName = card.querySelector('h3').textContent;
  const itemPrice = parseFloat(card.querySelector('p').textContent.split('₹')[1].trim()); // Updated line
  
  plusBtn.addEventListener('click', () => {
    let value = parseInt(input.value);
    value++;
    input.value = value;
    updateCart(itemName, value, itemPrice);
  });
  
  minusBtn.addEventListener('click', () => {
    let value = parseInt(input.value);
    if (value > 0) {
      value--;
      input.value = value;
      updateCart(itemName, value, itemPrice);
    }
  });
});

clearButton.addEventListener('click', () => {
  // Clear cart
  cartBody.innerHTML = '';
  totalAmount = 0;
  totalAmountElement.textContent = totalAmount.toFixed(2);
});

function updateCart(itemName, quantity, itemPrice) {
  const existingItem = cartBody.querySelector(`tr[data-item="${itemName}"]`);
  
  if (quantity === 0 && existingItem) {
    existingItem.remove();
  } else {
    if (existingItem) {
      existingItem.querySelector('td:nth-child(2)').textContent = quantity;
      existingItem.querySelector('td:nth-child(3)').textContent = `₹${(quantity * itemPrice).toFixed(2)}`;
    } else {
      const newRow = document.createElement('tr');
      newRow.dataset.item = itemName;
      newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${quantity}</td>
        <td>₹${(quantity * itemPrice).toFixed(2)}</td>
      `;
      cartBody.appendChild(newRow);
    }
  }

  // Calculate total amount
  totalAmount = 0;
  const cartItems = cartBody.querySelectorAll('tr');
  cartItems.forEach(item => {
    totalAmount += parseFloat(item.querySelector('td:nth-child(3)').textContent.split('₹')[1].trim());
  });
  totalAmountElement.textContent = totalAmount.toFixed(2);
}
