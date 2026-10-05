// StudySphere - To-Do List JavaScript

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearCompletedButton = document.getElementById("clearCompleted");


// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("studySphereTasks")) || [];


// Add Task
addTaskButton.addEventListener("click", function () {

    const title = taskInput.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;

    // Check task name
    if (title === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    // Check priority
    if (priority === "") {
        alert("Please select a priority.");
        taskPriority.focus();
        return;
    }

    // Create task object
    const newTask = {
        id: Date.now(),
        title: title,
        date: date,
        priority: priority,
        completed: false
    };

    // Add task
    tasks.push(newTask);

    // Save
    saveTasks();

    // Display
    renderTasks();

    // Clear inputs
    taskInput.value = "";
    taskDate.value = "";
    taskPriority.value = "";

    taskInput.focus();
});


// Display Tasks
function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-task">
                <div class="empty-icon">📝</div>
                <h3>No Tasks Yet</h3>
                <p>Add your first task to get started.</p>
            </div>
        `;

        updateStats();
        return;
    }


    tasks.forEach(function (task) {

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }


        // Left section
        const taskLeft = document.createElement("div");
        taskLeft.className = "task-left";


        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;


checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;

    if (task.completed) {
        recordStudyActivity();
    }

    saveTasks();
    renderTasks();
});

        // Task information
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";


        const taskTitle = document.createElement("div");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;


        const taskDateElement = document.createElement("div");
        taskDateElement.className = "task-date";

        if (task.date) {
            taskDateElement.textContent = "📅 " + formatDate(task.date);
        } else {
            taskDateElement.textContent = "📅 No date";
        }


        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDateElement);

        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(taskInfo);


        // Priority
        const priorityElement = document.createElement("span");
        priorityElement.className = "priority";


        if (task.priority === "High") {
            priorityElement.classList.add("priority-high");
            priorityElement.textContent = "🔴 High";
        }
        else if (task.priority === "Medium") {
            priorityElement.classList.add("priority-medium");
            priorityElement.textContent = "🟡 Medium";
        }
        else {
            priorityElement.classList.add("priority-low");
            priorityElement.textContent = "🟢 Low";
        }


        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-task";
        deleteButton.textContent = "🗑️";


        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();

        });


        taskItem.appendChild(taskLeft);
        taskItem.appendChild(priorityElement);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

    });


    updateStats();
}


// Update Statistics
function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = total - completed;


    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}


// Save tasks to LocalStorage
function saveTasks() {

    localStorage.setItem(
        "studySphereTasks",
        JSON.stringify(tasks)
    );

}


// Format date
function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


// Clear completed tasks
clearCompletedButton.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();

});


// Initial display
renderTasks();