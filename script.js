// ======================================
// LOGIN PROTECTION
// ======================================


document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");


    // Load saved tasks
    loadTasks();


    // Add button
    addBtn?.addEventListener("click", addTask);

    // Add task when Enter is pressed
    taskInput?.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            addTask();
        }

    });


    // + Add Task focuses the input
    addTaskBtn?.addEventListener("click", function () {
        taskInput.focus();
    });


    // ADD TASK FUNCTION
    function addTask() {

        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const tasks = getTasks();

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);

        saveTasks(tasks);

        taskInput.value = "";

        loadTasks();
    }


    // DISPLAY TASKS
    function loadTasks() {

        const tasks = getTasks();
        if (!taskList) {
        return;
    }

        taskList.innerHTML = "";

        tasks.forEach(function (task) {

            const taskDiv = document.createElement("div");

            taskDiv.className = "task";

            if (task.completed) {
                taskDiv.classList.add("completed");
            }


            // Checkbox
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.checked = task.completed;


            // Task text
            const taskText = document.createElement("span");

            taskText.textContent = task.text;


            // Delete button
            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "🗑️";
            deleteBtn.className = "delete-btn";


            // Checkbox functionality
            checkbox.addEventListener("change", function () {

                task.completed = checkbox.checked;

                saveUpdatedTask(task);

                loadTasks();

            });


            // Delete functionality
            deleteBtn.addEventListener("click", function () {

                deleteTask(task.id);

            });


            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(taskText);
            taskDiv.appendChild(deleteBtn);

            taskList.appendChild(taskDiv);

        });

    }


    // GET TASKS
    function getTasks() {

        return JSON.parse(
            localStorage.getItem("studySphereTasks")
        ) || [];

    }


    // SAVE TASKS
    function saveTasks(tasks) {

        localStorage.setItem(
            "studySphereTasks",
            JSON.stringify(tasks)
        );

    }


    // UPDATE TASK
    function saveUpdatedTask(updatedTask) {

        const tasks = getTasks();

        const updatedTasks = tasks.map(function (task) {

            if (task.id === updatedTask.id) {
                return updatedTask;
            }

            return task;

        });

        saveTasks(updatedTasks);

    }


    // DELETE TASK
    function deleteTask(id) {

        const tasks = getTasks();

        const updatedTasks = tasks.filter(function (task) {

            return task.id !== id;

        });

        saveTasks(updatedTasks);

        loadTasks();

    }

});
// ================================
// STUDY TIMER
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const timerDisplay = document.getElementById("timerDisplay");
    const startTimerBtn = document.getElementById("startTimer");
    const pauseTimerBtn = document.getElementById("pauseTimer");
    const resetTimerBtn = document.getElementById("resetTimer");
    const timerStatus = document.getElementById("timerStatus");
    const sessionCount = document.getElementById("sessionCount");

    // Only run this code on timer.html
    if (!timerDisplay) {
        return;
    }

    let timeLeft = 25*60; // 25 minutes
let timerInterval = null;

let sessions =
    Number(localStorage.getItem("studySphereTimerSessions")) || 0;

sessionCount.textContent = sessions;

    // Update timer display
    function updateDisplay() {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
    }


    // START TIMER
    startTimerBtn.addEventListener("click", function () {

        if (timerInterval !== null) {
            return;
        }

        timerStatus.textContent = "Focus time! Keep studying 📚";

        timerInterval = setInterval(function () {

            if (timeLeft > 0) {

                timeLeft--;

                updateDisplay();

            } else {

                clearInterval(timerInterval);

                timerInterval = null;

                sessions++;

localStorage.setItem(
    "studySphereTimerSessions",
    sessions
);

sessionCount.textContent = sessions;

// Record timer completion for Study Streak
recordStudyActivity();

                timerStatus.textContent =
                    "🎉 Great job! Pomodoro session completed!";

                alert("🎉 Congratulations! You completed a study session!");

            }

        }, 1000);

    });


    // PAUSE TIMER
    pauseTimerBtn.addEventListener("click", function () {

        clearInterval(timerInterval);

        timerInterval = null;

        timerStatus.textContent = "Timer paused ⏸️";

    });


    // RESET TIMER
    resetTimerBtn.addEventListener("click", function () {

        clearInterval(timerInterval);

        timerInterval = null;

        timeLeft = 25 * 60;

        updateDisplay();

        timerStatus.textContent = "Ready to focus? 🚀";

    });

});
// ======================================
// CGPA CALCULATOR
// ======================================

const subjectName = document.getElementById("subjectName");
const subjectCredits = document.getElementById("subjectCredits");
const subjectGrade = document.getElementById("subjectGrade");

const addSubject = document.getElementById("addSubject");
const calculateCGPA = document.getElementById("calculateCGPA");
const resetCGPA = document.getElementById("resetCGPA");

const subjectList = document.getElementById("subjectList");
const cgpaResult = document.getElementById("cgpaResult");


// Load saved subjects
let subjects = JSON.parse(
    localStorage.getItem("studySphereSubjects")
) || [];


// ======================================
// DISPLAY SUBJECTS
// ======================================

function displaySubjects() {

    if (!subjectList) {
        return;
    }

    subjectList.innerHTML = "";

    subjects.forEach(function (subject, index) {

        const row = document.createElement("div");

        row.className = "subject-item";

        row.innerHTML = `
            <span>
                <strong>${subject.name}</strong>
                - ${subject.credits} Credits
                - Grade Point: ${subject.grade}
            </span>

            <button onclick="removeSubject(${index})">
                Remove
            </button>
        `;

        subjectList.appendChild(row);
    });
}


// ======================================
// CALCULATE AND DISPLAY CGPA
// ======================================

function calculateAndSaveCGPA() {

    if (subjects.length === 0) {

        if (cgpaResult) {
            cgpaResult.textContent = "0.00";
        }

        return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(function (subject) {

        totalCredits += Number(subject.credits);

        totalPoints +=
            Number(subject.credits) *
            Number(subject.grade);

    });

    const cgpa =
        totalPoints / totalCredits;

    if (cgpaResult) {
        cgpaResult.textContent =
            cgpa.toFixed(2);
    }

    // Save CGPA for Dashboard
    localStorage.setItem(
        "studySphereCGPA",
        cgpa.toFixed(2)
    );
}


// ======================================
// ADD SUBJECT
// ======================================

addSubject?.addEventListener("click", function () {

    const name =
        subjectName.value.trim();

    const credits =
        Number(subjectCredits.value);

    const grade =
        Number(subjectGrade.value);


    if (name === "") {

        alert("Please enter the subject name.");

        return;
    }


    if (credits <= 0) {

        alert("Please enter valid credits.");

        return;
    }


    if (subjectGrade.value === "") {

        alert("Please select a grade.");

        return;
    }


    subjects.push({

        name: name,

        credits: credits,

        grade: grade

    });


    // Save subjects
    localStorage.setItem(
        "studySphereSubjects",
        JSON.stringify(subjects)
    );


    displaySubjects();


    subjectName.value = "";

    subjectCredits.value = "";

    subjectGrade.value = "";
});


// ======================================
// REMOVE SUBJECT
// ======================================

function removeSubject(index) {

    subjects.splice(index, 1);


    // Save updated subjects
    localStorage.setItem(
        "studySphereSubjects",
        JSON.stringify(subjects)
    );


    displaySubjects();


    calculateAndSaveCGPA();
}


// ======================================
// CALCULATE CGPA BUTTON
// ======================================

calculateCGPA?.addEventListener("click", function () {

    if (subjects.length === 0) {

        alert("Please add at least one subject.");

        return;
    }

    calculateAndSaveCGPA();
});


// ======================================
// RESET CGPA
// ======================================

resetCGPA?.addEventListener("click", function () {

    subjects = [];


    localStorage.removeItem(
        "studySphereSubjects"
    );

    localStorage.removeItem(
        "studySphereCGPA"
    );


    subjectName.value = "";

    subjectCredits.value = "";

    subjectGrade.value = "";


    if (subjectList) {
        subjectList.innerHTML = "";
    }


    if (cgpaResult) {
        cgpaResult.textContent = "0.00";
    }
});


// ======================================
// LOAD SAVED CGPA DATA
// ======================================

if (subjectList) {

    displaySubjects();

    calculateAndSaveCGPA();
}
function updateStreakDisplay() {
    const streakDisplay = document.getElementById("streakDisplay");

    if (!streakDisplay) {
        return;
    }

    const currentStreak = getCurrentStreak();

    if (currentStreak === 1) {
        streakDisplay.textContent = "🔥 1 Day";
    } else {
        streakDisplay.textContent = "🔥 " + currentStreak + " Days";
    }
}

updateStreakDisplay();
// ======================================
// DASHBOARD TASK PROGRESS
// ======================================

function updateTaskProgress() {

    const progressFill =
        document.getElementById("tasksProgressFill");

    const progressText =
        document.getElementById("tasksProgressText");

    // Only run on Dashboard
    if (!progressFill || !progressText) {
        return;
    }

    const tasks =
        JSON.parse(localStorage.getItem("studySphereTasks")) || [];

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(function (task) {
            return task.completed;
        }).length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage =
            Math.round((completedTasks / totalTasks) * 100);
    }

    progressFill.style.height = percentage + "%";
    progressText.textContent = percentage + "%";
}

updateTaskProgress();
// ======================================
// DASHBOARD NOTES PROGRESS
// ======================================

function updateNotesProgress() {

    const progressFill =
        document.getElementById("notesProgressFill");

    const progressText =
        document.getElementById("notesProgressText");

    // Only run on Dashboard
    if (!progressFill || !progressText) {
        return;
    }

    const notes =
        JSON.parse(localStorage.getItem("studySphereNotes")) || [];

    const totalNotes = notes.length;

    let percentage = 0;

    if (totalNotes > 0) {
        percentage = Math.min(totalNotes * 10, 100);
    }

    progressFill.style.height = percentage + "%";
    progressText.textContent = percentage + "%";
}

updateNotesProgress();
// ======================================
// DASHBOARD TIMER PROGRESS
// ======================================

function updateTimerProgress() {

    const progressFill =
        document.getElementById("timerProgressFill");

    const progressText =
        document.getElementById("timerProgressText");

    // Only run on Dashboard
    if (!progressFill || !progressText) {
        return;
    }

    const sessions =
        Number(
            localStorage.getItem("studySphereTimerSessions")
        ) || 0;

    let percentage = sessions * 10;

    if (percentage > 100) {
        percentage = 100;
    }

    progressFill.style.height = percentage + "%";
    progressText.textContent = percentage + "%";
}

updateTimerProgress();
// ======================================
// DASHBOARD CGPA PROGRESS
// ======================================

function updateCGPAProgress() {

    const progressFill =
        document.getElementById("cgpaProgressFill");

    const progressText =
        document.getElementById("cgpaProgressText");

    // Only run on Dashboard
    if (!progressFill || !progressText) {
        return;
    }

    const cgpa =
        Number(
            localStorage.getItem("studySphereCGPA")
        ) || 0;

    let percentage = Math.round(
        (cgpa / 10) * 100
    );

    if (percentage < 0) {
        percentage = 0;
    }

    if (percentage > 100) {
        percentage = 100;
    }

    progressFill.style.height =
        percentage + "%";

    progressText.textContent =
        percentage + "%";
}

updateCGPAProgress();
// ======================================
// DARK MODE
// ======================================

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {

    // Load saved theme
    const savedTheme =
        localStorage.getItem("studySphereDarkMode");

    if (savedTheme === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️";
    }

    // Toggle dark mode
    darkModeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem(
                "studySphereDarkMode",
                "enabled"
            );

            darkModeBtn.textContent = "☀️";

        } else {

            localStorage.setItem(
                "studySphereDarkMode",
                "disabled"
            );

            darkModeBtn.textContent = "🌙";
        }

    });
}
// ======================================
// LOGOUT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener("click", function () {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            return;
        }

        // Remove login status
        localStorage.removeItem(
            "studySphereLoggedIn"
        );

        localStorage.removeItem(
            "studySphereCurrentUser"
        );

        // Go to login page
        window.location.href = "login.html";

    });

});