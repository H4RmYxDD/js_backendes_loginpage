document.getElementById("login_button").addEventListener("click", function () {
  displayLoginFields();
});

document.getElementById("login").addEventListener("click", function () {
  login();
});

document
  .getElementById("register_button")
  .addEventListener("click", function () {
    displayRegisterFields();
  });

document.getElementById("register").addEventListener("click", function () {
  register();
});

document
  .getElementById("go_back_button")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });

function displayLoginFields() {
  document.getElementById("email_label").style.display = "inline";
  document.getElementById("password_label").style.display = "inline";
  document.getElementById("email").style.display = "inline";
  document.getElementById("password").style.display = "inline";
  document.getElementById("login").style.display = "inline";
  document.getElementById("register").style.display = "none";
  document.getElementById("confirm_password_label").style.display = "none";
  document.getElementById("confirm_password").style.display = "none";
  document.getElementById("login_button").style.display = "none";
  document.getElementById("register_button").style.display = "none";
  document.getElementById("go_back_button").style.display = "inline";
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format!");
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Login successful") {
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      alert("Error: " + err.message);
    });
}

function displayRegisterFields() {
  document.getElementById("email_label").style.display = "inline";
  document.getElementById("password_label").style.display = "inline";
  document.getElementById("email").style.display = "inline";
  document.getElementById("password").style.display = "inline";
  document.getElementById("register").style.display = "inline";
  document.getElementById("confirm_password_label").style.display = "inline";
  document.getElementById("confirm_password").style.display = "inline";
  document.getElementById("login").style.display = "none";
  document.getElementById("login_button").style.display = "none";
  document.getElementById("register_button").style.display = "none";
  document.getElementById("go_back_button").style.display = "inline";
}

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Registration successful") {
        alert("Registration successful!");
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      alert("Error: " + err.message);
    });
}
