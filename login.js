// ======================================
// STUDYSPHERE - LOGIN
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const loginBtn =
        document.getElementById("loginBtn");

    const message =
        document.getElementById("loginMessage");


    // ======================================
    // LOGIN BUTTON
    // ======================================

    loginBtn.addEventListener("click", function () {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        // ======================================
        // VALIDATION
        // ======================================

        if (email === "") {

            message.textContent =
                "Please enter your email.";

            message.style.color = "#dc2626";

            return;
        }


        if (password === "") {

            message.textContent =
                "Please enter your password.";

            message.style.color = "#dc2626";

            return;
        }


        // ======================================
        // GET REGISTERED USER
        // ======================================

        const savedUser =
            JSON.parse(
                localStorage.getItem(
                    "studySphereUser"
                )
            );


        // No account
        if (!savedUser) {

            message.textContent =
                "No account found. Please register first.";

            message.style.color = "#dc2626";

            return;
        }


        // ======================================
        // CHECK LOGIN DETAILS
        // ======================================

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            // Save login status
            localStorage.setItem(
                "studySphereLoggedIn",
                "true"
            );


            // Save current user name
            localStorage.setItem(
                "studySphereCurrentUser",
                savedUser.name
            );


            message.textContent =
                "Login successful!";

            message.style.color = "#16a34a";


            // Open Dashboard
            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);

        } else {

            message.textContent =
                "Incorrect email or password.";

            message.style.color = "#dc2626";
        }

    });

});