// ======================================
// AUTHENTICATION PROTECTION
// ======================================

const currentPage =
    window.location.pathname.split("/").pop();

const protectedPages = [
    "dashboard.html",
    "todo.html",
    "timer.html",
    "cgpa.html",
    "notes.html",
    "exam-planner.html",
    "profile.html"
];

if (
    protectedPages.includes(currentPage) &&
    localStorage.getItem("studySphereLoggedIn") !== "true"
) {
    window.location.href = "login.html";
}