const API = "https://fakestoreapi.com/carts";
const productList = document.querySelector("#productList");
const elLogout = document.querySelector(".logout__btn");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const usersLink = document.querySelector(".users__link");
const modal = document.querySelector("#modal");

elLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usename");
  window.location.href = "index.html";
});

function fetchProducts() {
  axios.get(API).then((res) => {
    productList.innerHTML = "";

    res.data.slice(0, 10).forEach((cart) => {
      const tr = document.createElement("tr");

      const firstProduct = cart.products[0];

      const fakeTitle = `User ${cart.userId} Cart`;
      const fakePrice = firstProduct.quantity * 20;
      const fakeCategory = "Cart Order";
      const fakeDesc = `Products: ${cart.products.length}`;

      tr.innerHTML = `
        <td>${cart.id}</td>
        <td>${fakeTitle}</td>
        <td>$${fakePrice}</td>
        <td>${fakeCategory}</td>
        <td>${fakeDesc}</td>
        <td class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;

      tr.querySelector(".edit").addEventListener("click", () => {
        editProduct(cart);
      });

      tr.querySelector(".delete").addEventListener("click", () => {
        deleteProduct(cart.id);
      });

      productList.appendChild(tr);
    });
  });
}

fetchProducts();

document.querySelector(".add__product__btn").onclick = () => {
  modal.classList.remove("hidden");
  editId = null;
  titleInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
};

document.querySelector("#saveProduct").onclick = () => {
  const cart = {
    userId: Number(titleInput.value),
    date: new Date(),
    products: [
      {
        productId: Number(priceInput.value),
        quantity: Number(descriptionInput.value),
      },
    ],
  };

  if (editId) {
    axios.put(`${API}/${editId}`, cart).then(fetchProducts);
  } else {
    axios.post(API, cart).then(fetchProducts);
  }

  modal.classList.add("hidden");
};

function editProduct(cart) {
  modal.classList.remove("hidden");

  titleInput.value = cart.userId;
  priceInput.value = cart.products[0]?.productId || "";
  descriptionInput.value = cart.products[0]?.quantity || "";
  categoryInput.value = "Cart Order";

  editId = cart.id;
}

function deleteCart(id) {
  axios.delete(`${API}/${id}`).then(() => fetchCarts());
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};
