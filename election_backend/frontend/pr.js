 const formTitle = document.getElementById("formTitle");
    const authForm = document.getElementById("authForm");
    const authButton = document.getElementById("authButton");
    const toggleForm = document.getElementById("toggleForm");
    const confirmGroup = document.getElementById("confirmGroup");
    const authMessage = document.getElementById("authMessage");

    let isLogin = true;

    toggleForm.addEventListener("click", () => {
      isLogin = !isLogin;

      if (isLogin) {
        formTitle.textContent = "Login";
        authButton.textContent = "Login";
        toggleForm.textContent = "Register here";
        confirmGroup.style.display = "none";
      } else {
        formTitle.textContent = "Register";
        authButton.textContent = "Register";
        toggleForm.textContent = "Already have an account? Login";
        confirmGroup.style.display = "flex";
      }

      authMessage.textContent = "";
      authForm.reset();
    });

    authForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      const storedUser = JSON.parse(localStorage.getItem("adminUser"));

      if (isLogin) {
        if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
          authMessage.textContent = "Invalid credentials!";
        } else {
          localStorage.setItem("adminLoggedIn", "true");
          window.location.href = "admin-dashboard.html";
        }
      } else {
        if (password !== confirmPassword) {
          authMessage.textContent = "Passwords do not match!";
          return;
        }

        const newUser = { email, password };
        localStorage.setItem("adminUser", JSON.stringify(newUser));
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin-dashboard.html";
      }
    });