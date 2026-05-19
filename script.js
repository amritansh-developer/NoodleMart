let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    image = image.replace("../", "");

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the cart variable after saving
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    alert(name + " added to cart");
}

/* ================= CART PAGE ONLY ================= */
function showCart() {
    // Always reload cart from localStorage when showing cart
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const cartItemsDiv = document.getElementById("cartItems");
    if (!cartItemsDiv) return;   // ⬅️ VERY IMPORTANT LINE

    const subtotalEl = document.getElementById("subtotal");
    const deliveryEl = document.getElementById("delivery");
    const totalEl = document.getElementById("total");

    const DELIVERY = 20;

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML =
            `<div class="empty-cart">Your cart is empty 🛒</div>`;
        subtotalEl.innerText = "₹0";
        deliveryEl.innerText = "₹0";
        totalEl.innerText = "₹0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                    <div class="qty">
                        <button onclick="changeQty(${index},-1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index},1)">+</button>
                    </div>
                </div>
                <div class="price">₹${itemTotal}</div>
            </div>
        `;
    });

    subtotalEl.innerText = "₹" + subtotal;
    deliveryEl.innerText = "₹" + DELIVERY;
    totalEl.innerText = "₹" + (subtotal + DELIVERY);
}

/* ================= QTY CHANGE ================= */
function changeQty(index, change) {
    // Always reload cart from localStorage before making changes
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if index is valid (in case cart was modified elsewhere)
    if (index >= cart.length) {
        // If index is invalid, reload and retry
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        showCart();
        return;
    }
    
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the cart variable after saving
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    showCart();
}

/* ================= RUN ONLY ON CART PAGE ================= */
// Always load fresh cart from localStorage when page loads
cart = JSON.parse(localStorage.getItem("cart")) || [];
showCart();