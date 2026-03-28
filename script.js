// ===============================
// TASK 1: CLASS & DATA STRUCTURE
// ===============================
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// At least 10 products
const products = [
    new Product(1, "Laptop", 45000, "laptop.jpg"),
    new Product(2, "Smart Watch", 8500, "watch.jpg"),
    new Product(3, "Bluetooth Speaker", 2500, "speaker.jpg"),
    new Product(4, "Leather Jacket", 3999, "jacket.jpg"),
    new Product(5, "Headphones", 1500, "headphones.jpg"),
    new Product(6, "Keyboard", 1200, "keyboard.jpg"),
    new Product(7, "Mouse", 800, "mouse.jpg"),
    new Product(8, "Monitor", 9000, "monitor.jpg"),
    new Product(9, "Backpack", 2000, "bag.jpg"),
    new Product(10, "Shoes", 3500, "shoes.jpg")
];

// Cart state
let cart = [];

// ===============================
// TASK 2: DYNAMIC PRODUCTS
// ===============================
const productContainer = document.querySelector(".product-grid");

if (productContainer) {
    productContainer.innerHTML = ""; // clear static HTML

    products.forEach(product => {

        const card = document.createElement("article");

        const img = document.createElement("img");
        img.setAttribute("src", product.image);

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "₱" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.setAttribute("data-id", product.id);

        // append
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);

        productContainer.appendChild(card);
    });
}

// ===============================
// TASK 3: EVENT DELEGATION (CART)
// ===============================
document.body.addEventListener("click", function (e) {

    if (e.target.tagName === "BUTTON" && e.target.textContent === "Add to Cart") {

        const id = parseInt(e.target.getAttribute("data-id"));

        const product = products.find(p => p.id === id);

        // check if already in cart
        const existing = cart.find(item => item.product.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ product: product, quantity: 1 });
        }

        renderCart();

        // TASK 6: animation
        const card = e.target.closest("article");
        card.classList.add("fade-in");

        setTimeout(() => {
            card.classList.remove("fade-in");
        }, 500);
    }
});

// ===============================
// RENDER CART
// ===============================
function renderCart() {

    const cartList = document.querySelector("ul");

    if (!cartList) return;

    cartList.innerHTML = "";

    cart.forEach(item => {

        const li = document.createElement("li");

        const title = document.createElement("h3");
        title.textContent = item.product.name;

        const price = document.createElement("p");
        price.textContent = "₱" + item.product.price;

        const qty = document.createElement("input");
        qty.type = "number";
        qty.min = 0;
        qty.value = item.quantity;
        qty.setAttribute("data-id", item.product.id);

        // quantity change
        qty.addEventListener("change", function () {

            const newQty = parseInt(this.value);

            if (newQty === 0) {
                cart = cart.filter(c => c.product.id !== item.product.id);
            } else {
                item.quantity = newQty;
            }

            renderCart();
        });

        li.appendChild(title);
        li.appendChild(price);
        li.appendChild(qty);

        cartList.appendChild(li);
    });

    // total using reduce
    const total = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    const subtotal = document.querySelector("h2");

    if (subtotal) {
        subtotal.textContent = "Subtotal: ₱" + total;
    }
}

// ===============================
// TASK 4: FORM VALIDATION
// ===============================
const checkoutForm = document.querySelector("form");

if (checkoutForm && document.title.includes("Checkout")) {

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector("#name");
        const street = document.querySelector("#street");
        const zip = document.querySelector("#zip");

        let valid = true;

        [name, street, zip].forEach(input => {
            if (input.value === "") {
                input.classList.add("error");
                valid = false;
            } else {
                input.classList.remove("error");
            }
        });

        if (valid) {
            console.log("Order placed successfully!");
            window.location.href = "thankyou.html";
        }
    });
}

// ===============================
// TASK 5: USER ACCOUNT
// ===============================
const currentUser = {
    name: "Regine Comia",
    orderHistory: [
        {
            id: 1001,
            date: "Feb 1, 2026",
            total: 45000,
            items: ["Laptop"]
        },
        {
            id: 1002,
            date: "Feb 5, 2026",
            total: 8500,
            items: ["Smart Watch"]
        }
    ]
};

// Dynamic greeting
const header = document.querySelector("header h1");

if (header && document.title.includes("Account")) {
    header.textContent = "Welcome, " + currentUser.name;
}

// Expand order details
const summaries = document.querySelectorAll("summary");

summaries.forEach((summary, index) => {

    summary.addEventListener("click", function () {

        const details = summary.parentElement;

        if (!details.dataset.loaded) {

            const order = currentUser.orderHistory[index];

            const info = document.createElement("p");
            info.textContent = `Date: ${order.date} | Total: ₱${order.total} | Items: ${order.items.join(", ")}`;

            details.appendChild(info);

            details.dataset.loaded = "true";
        }
    });
});