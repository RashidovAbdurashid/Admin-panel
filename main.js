const elForm = document.querySelector(".form-box");
const elsubmit = document.querySelector(".submit");
const api = "https://fakestoreapi.com/auth/login";

console.log(elForm);

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const user = {
    username,
    password,
  };

  localStorage.setItem("username", username);

  login(api, user);
});

function login(url, data) {
  axios
    .post(url, data)
    .then((res) => {
      console.log("Response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        Toastify({
          text: "Login Successfull",
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();

        setTimeout(() => {
          window.location.href = "pages.html";
        }, 2000);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      Toastify({
        text: "Login Failed",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background:
            "linear-gradient(to right,rgb(176, 0, 0),rgb(201, 61, 61))",
        },
        onClick: function () {},
      }).showToast();
    });
}
