

function addToCart(productName, productPrice, productImage) {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
        <img src="${productImage}" alt="${productName}" class="cart-product-image">
        <p>${productName} - $${productPrice}</p>
        <i class="bx bx-trash remove-from-cart"></i>
    `;

    document.getElementById("cart-items").appendChild(cartItem);

    // Calculate and update the total amount
    const totalPriceElement = document.getElementById("total-amount");
    const currentTotal = parseFloat(totalPriceElement.innerText.slice(1));
    totalPriceElement.innerText = "$" + (currentTotal + productPrice).toFixed(2);

    // Save cart data to local storage
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    cartData.push({ productName, productPrice, productImage });
    localStorage.setItem("cartData", JSON.stringify(cartData));
}

// Function to load cart data from local storage
function loadCartData() {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    cartData.forEach((item) => {
        addToCart(item.productName, item.productPrice, item.productImage);
    });
}

// Handle page load
window.addEventListener("load", () => {
    loadCartData();
});

// Handle "Add to Cart" button clicks
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product-name");
        const productPrice = parseFloat(button.getAttribute("data-product-price"));
        const productImage = button.getAttribute("data-product-image");
        addToCart(productName, productPrice, productImage);
    });
});

// Handle removal of items from the cart
document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-trash")) {
        const item = e.target.parentElement;
        const price = parseFloat(item.querySelector("p").innerText.match(/\d+\.\d+/)[0]);
        item.remove();

        // Deduct the removed item's price from the total
        const totalPriceElement = document.getElementById("total-amount");
        const currentTotal = parseFloat(totalPriceElement.innerText.slice(1));
        totalPriceElement.innerText = "$" + (currentTotal - price).toFixed(2);

        // Remove the item from local storage
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const productName = item.querySelector("p").textContent.split(" - ")[0];
        const updatedCartData = cartData.filter((item) => item.productName !== productName);
        localStorage.setItem("cartData", JSON.stringify(updatedCartData));
    }
});

// Handle "Buy Now" button click
document.getElementById("buy-now").addEventListener("click", () => {
    alert("Your order is placed. Thank you!");
});

// Handle opening/closing the cart sidebar
const cartSidebar = document.getElementById("cart-sidebar");
const openCartLink = document.getElementById("open-cart");
const closeCartButton = document.getElementById("close-cart");

openCartLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    cartSidebar.classList.add("show");
});

closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("show");
});



