const productsEl = document.getElementById("products");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    renderProducts(data);
  });

function renderProducts(products) {
  productsEl.innerHTML = "";

  products.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title.slice(0, 45)}...</h3>
      <div class="price">$${item.price}</div>
      <div class="card-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    productsEl.appendChild(card);
  });
}


function logout() {
  window.location.href = "index.html";
}


function product() {
  window.location.href = "product.html";
}


