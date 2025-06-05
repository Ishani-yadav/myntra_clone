function getBag() {
  return JSON.parse(localStorage.getItem('bag')) || [];
}

function displayBagIcon() {
  const bag = getBag();
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItemCountElement) {
    bagItemCountElement.innerText = bag.length;
    bagItemCountElement.style.visibility = bag.length > 0 ? 'visible' : 'hidden';
  }
}

function renderBagItems() {
  const container = document.querySelector('.bag-items-container');
  if (!container) return;
  
  let innerHTML = '';
  let itemWiseHTML = '';
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalAmount = 0;

  const bag = getBag();
  
  bag.forEach((item, index) => {
    const discount = Number(item.original_price) - Number(item.current_price);
    totalMRP += Number(item.original_price);
    totalDiscount += discount;
    totalAmount += Number(item.current_price);

    innerHTML += `
      <div class="bag-item-container">
        <div class="item-left-part">
          <img class="bag-item-img" src="${item.item_image}" alt="${item.item_name}">
        </div>
        <div class="item-right-part">
          <div class="bag-item-header">
            <div>
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
            </div>
            <button class="remove-from-bag" data-index="${index}">X</button>
          </div>
          <div class="price-container">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">14 days</span> return available
          </div>
          <div class="delivery-details">
            Delivery by <span class="delivery-details-days">${getRandomDeliveryDate()}</span>
          </div>
        </div>
      </div>
    `;

    // Move this inside the loop!
    itemWiseHTML += `
      <div class="summary-row">
        <span>
          ${item.item_name} <br>
          <small>MRP: Rs ${item.original_price} | Discount: Rs ${discount} | Price: Rs ${item.current_price}</small>
        </span>
      </div>
    `;
  });

  container.innerHTML = innerHTML;
  document.getElementById('item-wise-summary').innerHTML = itemWiseHTML;
  document.getElementById('total-mrp').innerText = `Rs ${totalMRP}`;
  document.getElementById('total-discount').innerText = `Rs ${totalDiscount}`;
  document.getElementById('total-amount').innerText = `Rs ${totalAmount}`;

  addRemoveListeners();
}


function addRemoveListeners() {
  document.querySelectorAll('.remove-from-bag').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      let bag = getBag();
      bag.splice(index, 1);
      localStorage.setItem('bag', JSON.stringify(bag));
      renderBagItems();
      displayBagIcon();
    });
  });
}
document.addEventListener('DOMContentLoaded', function() {
  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      alert('Order placed successfully!');
 });
  }
});

function getRandomDeliveryDate() {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 5) + 3; // 3 to 7 days
  today.setDate(today.getDate() + daysToAdd);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return today.toLocaleDateString('en-GB', options); // e.g., "10 Jun 2025"
}
displayBagIcon();
renderBagItems();
