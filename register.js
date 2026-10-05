// ======================================
// STUDYSPHERE REGISTRATION
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const registerBtn =
        document.getElementById("registerBtn");

    const nameInput =
        document.getElementById("registerName");

    const emailInput =
        document.getElementById("registerEmail");

    const passwordInput =
        document.getElementById("registerPassword");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const passwordMessage =
        document.getElementById("passwordMessage");

    const registerMessage =
        document.getElementById("registerMessage");


    // ======================================
    // CHECK PASSWORD MATCH WHILE TYPING
    // ======================================

    confirmPasswordInput.addEventListener("input", function () {

        const password = passwordInput.value;
        const confirmPassword =
            confirmPasswordInput.value;

        if (confirmPassword === "") {

            passwordMessage.textContent = "";
            return;

        }

        if (password === confirmPassword) {

            passwordMessage.textContent =
                "✓ Passwords match";

            passwordMessage.style.color = "#16a34a";

        } else {

            passwordMessage.textContent =
                "✗ Passwords do not match";

            passwordMessage.style.color = "#dc2626";
        }

    });


    // ======================================
    // CREATE ACCOUNT
    // ======================================

    registerBtn.addEventListener("click", function () {

        const name = nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        // Check empty fields
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            registerMessage.textContent =
                "Please fill in all fields.";

            registerMessage.style.color =
                "#dc2626";

            return;
        }


        // Check password length
        if (password.length < 6) {

            passwordMessage.textContent =
                "Password must contain at least 6 characters.";

            passwordMessage.style.color =
                "#dc2626";

            return;
        }


        // Check password match
        if (password !== confirmPassword) {

            passwordMessage.textContent =
                "✗ Passwords do not match.";

            passwordMessage.style.color =
                "#dc2626";

            return;
        }


        // Check existing account
        const existingUser =
            JSON.parse(
                localStorage.getItem("studySphereUser")
            );


        if (
            existingUser &&
            existingUser.email.toLowerCase() ===
            email.toLowerCase()
        ) {

            registerMessage.textContent =
                "An account with this email already exists.";

            registerMessage.style.color =
                "#dc2626";

            return;
        }


        // ======================================
        // CREATE STUDENT ACCOUNT
        // ======================================

        const newUser = {

            name: name,

            email: email,

            password: password

        };


        // Save student account
        localStorage.setItem(
            "studySphereUser",
            JSON.stringify(newUser)
        );


        // Success message
        registerMessage.textContent =
            "✓ Account created successfully!";

        registerMessage.style.color =
            "#16a34a";


        // Go to login page
        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1000);

    });

});