// ======================================
// STUDYSPHERE PROFILE
// ======================================

// Get form elements
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentPhone = document.getElementById("studentPhone");
const studentRoll = document.getElementById("studentRoll");

const studentCourse = document.getElementById("studentCourse");
const studentBranch = document.getElementById("studentBranch");
const studentYear = document.getElementById("studentYear");
const studentSemester = document.getElementById("studentSemester");
const studentCollege = document.getElementById("studentCollege");

const displayName = document.getElementById("displayName");
const displayCourse = document.getElementById("displayCourse");

const saveProfile = document.getElementById("saveProfile");
const resetProfile = document.getElementById("resetProfile");


// ======================================
// LOCAL STORAGE KEY
// ======================================

const profileStorageKey = "studySphereProfile";


// ======================================
// LOAD PROFILE
// ======================================

function loadProfile() {

    const savedProfile = localStorage.getItem(profileStorageKey);

    if (!savedProfile) {
        return;
    }

    const profile = JSON.parse(savedProfile);

    studentName.value = profile.name || "";
    studentEmail.value = profile.email || "";
    studentPhone.value = profile.phone || "";
    studentRoll.value = profile.roll || "";

    studentCourse.value = profile.course || "";
    studentBranch.value = profile.branch || "";
    studentYear.value = profile.year || "";
    studentSemester.value = profile.semester || "";
    studentCollege.value = profile.college || "";

    updateProfileHeader();
}


// ======================================
// UPDATE PROFILE HEADER
// ======================================

function updateProfileHeader() {

    const name = studentName.value.trim();
    const course = studentCourse.value.trim();
    const branch = studentBranch.value.trim();

    displayName.textContent = name || "Your Name";

    if (course && branch) {

        displayCourse.textContent =
            course + " - " + branch;

    } else if (course) {

        displayCourse.textContent = course;

    } else {

        displayCourse.textContent = "B.Tech Student";
    }
}


// ======================================
// SAVE PROFILE
// ======================================

saveProfile.addEventListener("click", function () {

    const name = studentName.value.trim();
    const email = studentEmail.value.trim();

    // Basic validation
    if (name === "") {

        alert("Please enter your full name.");

        studentName.focus();

        return;
    }

    if (email === "") {

        alert("Please enter your email.");

        studentEmail.focus();

        return;
    }


    // Create profile object
    const profile = {

        name: name,
        email: email,
        phone: studentPhone.value.trim(),
        roll: studentRoll.value.trim(),

        course: studentCourse.value.trim(),
        branch: studentBranch.value.trim(),
        year: studentYear.value.trim(),
        semester: studentSemester.value.trim(),
        college: studentCollege.value.trim()

    };


    // Save to LocalStorage
    localStorage.setItem(
        profileStorageKey,
        JSON.stringify(profile)
    );


    // Update header
    updateProfileHeader();


    // Success message
    alert("Profile saved successfully!");


});


// ======================================
// RESET PROFILE
// ======================================

resetProfile.addEventListener("click", function () {

    const confirmReset = confirm(
        "Are you sure you want to reset your profile?"
    );

    if (!confirmReset) {
        return;
    }


    // Clear form
    studentName.value = "";
    studentEmail.value = "";
    studentPhone.value = "";
    studentRoll.value = "";

    studentCourse.value = "";
    studentBranch.value = "";
    studentYear.value = "";
    studentSemester.value = "";
    studentCollege.value = "";


    // Remove saved profile
    localStorage.removeItem(profileStorageKey);


    // Reset header
    updateProfileHeader();

    alert("Profile has been reset.");

});


// ======================================
// UPDATE HEADER WHILE TYPING
// ======================================

studentName.addEventListener("input", updateProfileHeader);

studentCourse.addEventListener("input", updateProfileHeader);

studentBranch.addEventListener("input", updateProfileHeader);


// ======================================
// LOAD SAVED PROFILE WHEN PAGE OPENS
// ======================================

loadProfile();