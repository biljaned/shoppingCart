const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Vanila mafin (6 komada)",
    price: 12.99,
    category: "Mafin",
  },
  {
    id: 2,
    name: "Francuski makaron",
    price: 3.99,
    category: "Makaron",
  },
  {
    id: 3,
    name: "Mafin od bundeve",
    price: 3.99,
    category: "Mafin",
  },
  {
    id: 4,
    name: "Čokoladni mafin",
    price: 5.99,
    category: "Mafin",
  },
  {
    id: 5,
    name: "Čokoladne perece (4 komada)",
    price: 10.99,
    category: "Pereca",
  },
  {
    id: 6,
    name: "Sladoled od jagode",
    price: 2.99,
    category: "Sladoled",
  },
  {
    id: 7,
    name: "Čokoladni makaroni (4 komada)",
    price: 9.99,
    category: "Makaron",
  },
  {
    id: 8,
    name: "Perece od jagode",
    price: 4.99,
    category: "Pereca",
  },
  {
    id: 9,
    name: "Sladoled od pekan oraha",
    price: 2.99,
    category: "Sladoled",
  },
  {
    id: 10,
    name: "Sladoled sa dodacima - bombone",
    price: 2.99,
    category: "Sladoled",
  },
  {
    id: 11,
    name: "Vanila makaroni (5 komada)",
    price: 11.99,
    category: "Makaron",
  },
  {
    id: 12,
    name: "Limun mafini (4 komada)",
    price: 12.99,
    category: "Mafin",
  },
];

products.forEach(
  ({ name, id, price, category }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Kategorija: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Dodaj u korpu
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id=dessert${id} class="product">
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Korpa je već prazna!");
      return;
    }

    const isCartCleared = confirm(
      "Da li ste sigurni da želite da obrišete sve stavke u korpi?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Sakrij" : "Prikaži";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});
clearCartBtn.addEventListener("click",cart.clearCart.bind(cart));