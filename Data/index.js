let items = [
    {
        id: '001',
        item_image: 'Images/1.jpg',
        rating: { stars: 4.5, noOfReviews: 1400 },
        company_name: 'Caracola',
        item_name: 'Sequinned Saree',
        current_price: 1000,
        original_price: 1045,
        discount_percentage: 4.31,
    },
    {
        id: '002',
        item_image: 'Images/2.jpg',
        rating: { stars: 4.2, noOfReviews: 1900 },
        company_name: 'Tokyo Talkies',
        item_name: 'Women Denim Jacket',
        current_price: 1200,
        original_price: 2000,
        discount_percentage: 40,
    },
    {
        id: '003',
        item_image: 'Images/3.jpg',
        rating: { stars: 4.7, noOfReviews: 2100 },
        company_name: 'Janasya',
        item_name: 'Janasya Women Straight Kurta',
        current_price: 899,
        original_price: 1499,
        discount_percentage: 40,
    },
    {
        id: '004',
        item_image: 'Images/4.jpg',
        rating: { stars: 4.3, noOfReviews: 1100 },
        company_name: 'Ahalyaa',
        item_name: 'Ahalyaa Black Sequinned Georgette Party Saree',
        current_price: 3000,
        original_price: 3999,
        discount_percentage: 25,
    },
    {
        id: '005',
        item_image: 'Images/5.jpg',
        rating: { stars: 4.6, noOfReviews: 1700 },
        company_name: 'DressBerry',
        item_name: 'DressBerry Women Blue Floral Printed Slim Fit Jeans',
        current_price: 1609,
        original_price: 2299,
        discount_percentage: 30,
    },
    {
        id: '006',
        item_image: 'Images/6.jpg',
        rating: { stars: 4.4, noOfReviews: 1900 },
        company_name: 'Athena',
        item_name: 'Athena Women Flare Party Dress',
        current_price: 1499,
        original_price: 1999,
        discount_percentage: 25,
    },
    {
        id: '007',
        item_image: 'Images/7.jpg',
        rating: { stars: 4.1, noOfReviews: 2000 },
        company_name: 'Tokyo Talkies',
        item_name: 'Women Wrap Red Midi/Calf Length Dress',
        current_price: 1291,
        original_price: 1899,
        discount_percentage: 32,
    },
    {
        id: '008',
        item_image: 'Images/8.jpg',
        rating: { stars: 4.8, noOfReviews: 2500 },
        company_name: 'SASSAFRAS',
        item_name: 'LATST FANCY JUMPSUITE',
        current_price: 1799,
        original_price: 2499,
        discount_percentage: 28,
    }
];

function formatReviews(num) {
    return num >= 1000 ? (num / 1000).toFixed(1).replace('.0', '') + 'k' : num;
}

let bagItems;
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItems(items);
    displayBagIcon();
}

// Display all or filtered items
function displayItems(itemList) {
    let container = document.querySelector('.items-container');
    if (!container) return;

    if (itemList.length === 0) {
        container.innerHTML = "<p>No matching products found.</p>";
        return;
    }

    let html = '';
    itemList.forEach(item => {
        html += `
            <div class="item-container">
                <div class="image-wrapper">
                    <img class="item-image" src="${item.item_image}" alt="${item.item_name}">
                    <button class="wishlist-btn" data-id="${item.id}" title="Add to Wishlist">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                </div>
                <div class="rating">${item.rating.stars}
                    <span class="material-symbols-outlined" style="font-size:14px; color:gold; vertical-align:middle;">star</span>
                    | ${formatReviews(item.rating.noOfReviews)}
                </div>
                <div class="company-name">${item.company_name}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
            </div>`;
    });

    container.innerHTML = html;

    // Attach wishlist button events
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const itemId = this.getAttribute('data-id');
            const item = items.find(i => i.id === itemId);
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (!wishlist.some(i => i.id === itemId)) {
                wishlist.push(item);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert('Added to wishlist!');
            } else {
                alert('Already in wishlist!');
            }
        });
    });
}

function addToBag(itemId) {
    const item = items.find(i => i.id === itemId.toString());
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    bag.push(item);
    localStorage.setItem('bag', JSON.stringify(bag));
    displayBagIcon();
}

function displayBagIcon() {
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    let countEl = document.querySelector('.bag-item-count');
    if (bag.length > 0) {
        countEl.style.visibility = 'visible';
        countEl.innerText = bag.length;
    } else {
        countEl.style.visibility = 'hidden';
    }
}

// SEARCH Functionality
function handleSearch() {
    const query = document.querySelector('.search_input').value.trim().toLowerCase();
    if (query === '') {
        displayItems(items);
    } else {
        const filteredItems = items.filter(item =>
            item.item_name.toLowerCase().includes(query) ||
            item.company_name.toLowerCase().includes(query)
        );
        displayItems(filteredItems);
    }
}

// Add search event listeners
document.querySelector('.search_input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSearch();
});
document.querySelector('.search_icon').addEventListener('click', handleSearch);
document.querySelector('.search_input').addEventListener('input', function (e) {
    if (e.target.value.trim() === '') {
        displayItems(items);
    }
});
