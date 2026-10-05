// =========================================
// STUDYSPHERE - EXAM PLANNER JAVASCRIPT
// =========================================


// Get HTML elements

const examName = document.getElementById("examName");
const examSubject = document.getElementById("examSubject");
const examDate = document.getElementById("examDate");
const examTime = document.getElementById("examTime");
const examVenue = document.getElementById("examVenue");

const addExamButton = document.getElementById("addExam");

const examList = document.getElementById("examList");

const searchExam = document.getElementById("searchExam");

const totalExams = document.getElementById("totalExams");
const upcomingExams = document.getElementById("upcomingExams");
const completedExams = document.getElementById("completedExams");

const clearCompletedButton =
    document.getElementById("clearCompleted");


// =========================================
// LOAD SAVED EXAMS
// =========================================

let exams = JSON.parse(
    localStorage.getItem("studySphereExams")
) || [];


// =========================================
// ADD EXAM
// =========================================

addExamButton.addEventListener("click", function () {

    const name = examName.value.trim();
    const subject = examSubject.value.trim();
    const date = examDate.value;
    const time = examTime.value;
    const venue = examVenue.value.trim();


    // Validate exam name

    if (name === "") {

        alert("Please enter the exam name.");

        examName.focus();

        return;
    }


    // Validate subject

    if (subject === "") {

        alert("Please enter the subject name.");

        examSubject.focus();

        return;
    }


    // Validate date

    if (date === "") {

        alert("Please select the exam date.");

        examDate.focus();

        return;
    }


    // Validate time

    if (time === "") {

        alert("Please select the exam time.");

        examTime.focus();

        return;
    }


    // Validate venue

    if (venue === "") {

        alert("Please enter the exam venue.");

        examVenue.focus();

        return;
    }


    // Prevent adding an exam in the past

    const examDateTime = new Date(
        `${date}T${time}`
    );

    const now = new Date();


    if (examDateTime < now) {

        alert("Please select a future exam date and time.");

        return;
    }


    // Create exam object

    const newExam = {

        id: Date.now(),

        name: name,

        subject: subject,

        date: date,

        time: time,

        venue: venue,

        completed: false

    };


    // Add exam

    exams.push(newExam);


    // Sort exams by date

    sortExams();


    // Save

    saveExams();


    // Display

    displayExams();


    // Clear form

    examName.value = "";

    examSubject.value = "";

    examDate.value = "";

    examTime.value = "";

    examVenue.value = "";


    examName.focus();

});


// =========================================
// SORT EXAMS
// =========================================

function sortExams() {

    exams.sort(function (a, b) {

        const dateA = new Date(
            `${a.date}T${a.time}`
        );

        const dateB = new Date(
            `${b.date}T${b.time}`
        );

        return dateA - dateB;

    });

}


// =========================================
// DISPLAY EXAMS
// =========================================

function displayExams(filteredExams = exams) {

    examList.innerHTML = "";


    // Update statistics

    updateStatistics();


    // No exams

    if (filteredExams.length === 0) {

        examList.innerHTML = `

            <div class="empty-exams">

                <div class="empty-icon">
                    📅
                </div>

                <h3>
                    No Exams Found
                </h3>

                <p>
                    Add your first exam to start planning.
                </p>

            </div>

        `;

        return;
    }


    // Create exam cards

    filteredExams.forEach(function (exam) {


        const examCard =
            document.createElement("div");

        examCard.className = "exam-card";


        if (exam.completed) {

            examCard.classList.add("completed");

        }


        // =====================================
        // EXAM INFO
        // =====================================

        const examInfo =
            document.createElement("div");

        examInfo.className = "exam-info";


        // Exam name

        const title =
            document.createElement("h3");

        title.textContent = exam.name;


        // Subject

        const subject =
            document.createElement("span");

        subject.className = "exam-subject";

        subject.textContent = exam.subject;


        // Details

        const details =
            document.createElement("div");

        details.className = "exam-details";


        // Date

        const dateElement =
            document.createElement("span");

        dateElement.textContent =
            "📅 " + formatDate(exam.date);


        // Time

        const timeElement =
            document.createElement("span");

        timeElement.textContent =
            "⏰ " + formatTime(exam.time);


        // Venue

        const venueElement =
            document.createElement("span");

        venueElement.textContent =
            "📍 " + exam.venue;


        details.appendChild(dateElement);

        details.appendChild(timeElement);

        details.appendChild(venueElement);


        examInfo.appendChild(title);

        examInfo.appendChild(subject);

        examInfo.appendChild(details);


        // =====================================
        // COUNTDOWN
        // =====================================

        const countdown =
            document.createElement("div");

        countdown.className = "exam-countdown";


        const countdownNumber =
            document.createElement("strong");


        const countdownText =
            document.createElement("span");


        if (exam.completed) {

            countdownNumber.textContent = "✓";

            countdownText.textContent = "Completed";

        }
        else {

            const days =
                calculateDaysRemaining(
                    exam.date,
                    exam.time
                );


            if (days < 0) {

                countdownNumber.textContent = "0";

                countdownText.textContent = "Past";

            }
            else if (days === 0) {

                countdownNumber.textContent = "Today";

                countdownText.textContent =
                    "Exam Day";

            }
            else if (days === 1) {

                countdownNumber.textContent = "1";

                countdownText.textContent =
                    "Day Left";

            }
            else {

                countdownNumber.textContent =
                    days;

                countdownText.textContent =
                    "Days Left";

            }

        }


        countdown.appendChild(countdownNumber);

        countdown.appendChild(countdownText);


        // =====================================
        // ACTIONS
        // =====================================

        const actions =
            document.createElement("div");

        actions.className = "exam-actions";


        // Complete checkbox

        const completeButton =
            document.createElement("button");

        completeButton.className =
            "complete-exam";


        completeButton.textContent =
            exam.completed
                ? "↩️"
                : "✅";


        completeButton.title =
            exam.completed
                ? "Mark as pending"
                : "Mark as completed";


        completeButton.addEventListener(
            "click",
            function () {

                toggleExam(exam.id);

            }
        );


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-exam";

        deleteButton.textContent =
            "🗑️";

        deleteButton.title =
            "Delete exam";


        deleteButton.addEventListener(
            "click",
            function () {

                deleteExam(exam.id);

            }
        );


        actions.appendChild(completeButton);

        actions.appendChild(deleteButton);


        // =====================================
        // ADD TO CARD
        // =====================================

        examCard.appendChild(examInfo);

        examCard.appendChild(countdown);

        examCard.appendChild(actions);


        examList.appendChild(examCard);

    });

}


// =========================================
// CALCULATE DAYS REMAINING
// =========================================

function calculateDaysRemaining(date, time) {

    const examDateTime =
        new Date(`${date}T${time}`);

    const currentDate =
        new Date();


    const difference =
        examDateTime - currentDate;


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    return days;

}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================================
// FORMAT TIME
// =========================================

function formatTime(timeString) {

    const [hours, minutes] =
        timeString.split(":");


    const date =
        new Date();

    date.setHours(
        hours,
        minutes
    );


    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// =========================================
// MARK EXAM COMPLETED / PENDING
// =========================================

function toggleExam(examId) {

    exams = exams.map(function (exam) {

        if (exam.id === examId) {

            exam.completed =
                !exam.completed;

        }

        return exam;

    });


    saveExams();

    displayExams();

}


// =========================================
// DELETE EXAM
// =========================================

function deleteExam(examId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this exam?"
        );


    if (!confirmDelete) {

        return;

    }


    exams = exams.filter(function (exam) {

        return exam.id !== examId;

    });


    saveExams();

    displayExams();

}


// =========================================
// CLEAR COMPLETED EXAMS
// =========================================

clearCompletedButton.addEventListener(
    "click",
    function () {

        exams = exams.filter(function (exam) {

            return !exam.completed;

        });


        saveExams();

        displayExams();

    }
);


// =========================================
// SEARCH EXAMS
// =========================================

searchExam.addEventListener(
    "input",
    function () {

        const searchText =
            searchExam.value
                .toLowerCase()
                .trim();


        const filteredExams =
            exams.filter(function (exam) {

                return (

                    exam.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    exam.subject
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    exam.venue
                        .toLowerCase()
                        .includes(searchText)

                );

            });


        displayExams(filteredExams);

    }
);


// =========================================
// UPDATE STATISTICS
// =========================================

function updateStatistics() {

    const total =
        exams.length;


    const completed =
        exams.filter(function (exam) {

            return exam.completed;

        }).length;


    const upcoming =
        exams.filter(function (exam) {

            if (exam.completed) {

                return false;

            }


            const examDateTime =
                new Date(
                    `${exam.date}T${exam.time}`
                );


            return examDateTime >= new Date();

        }).length;


    totalExams.textContent =
        total;

    upcomingExams.textContent =
        upcoming;

    completedExams.textContent =
        completed;

}


// =========================================
// SAVE EXAMS
// =========================================

function saveExams() {

    localStorage.setItem(
        "studySphereExams",
        JSON.stringify(exams)
    );

}


// =========================================
// INITIAL LOAD
// =========================================

sortExams();

displayExams();


// =========================================
// REFRESH COUNTDOWN
// =========================================

// Update countdown every minute

setInterval(function () {

    displayExams();

}, 60000);