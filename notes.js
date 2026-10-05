// =========================================
// STUDYSPHERE - NOTES JAVASCRIPT
// =========================================


// Get HTML elements

const noteTitle = document.getElementById("noteTitle");
const noteSubject = document.getElementById("noteSubject");
const noteContent = document.getElementById("noteContent");

const addNoteButton = document.getElementById("addNote");

const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

const searchNotes = document.getElementById("searchNotes");


// Load saved notes from LocalStorage

let notes = JSON.parse(localStorage.getItem("studySphereNotes")) || [];


// =========================================
// ADD NOTE
// =========================================

addNoteButton.addEventListener("click", function () {

    const title = noteTitle.value.trim();
    const subject = noteSubject.value;
    const content = noteContent.value.trim();


    // Validate title

    if (title === "") {

        alert("Please enter a note title.");

        noteTitle.focus();

        return;
    }


    // Validate subject

    if (subject === "") {

        alert("Please select a subject.");

        noteSubject.focus();

        return;
    }


    // Validate content

    if (content === "") {

        alert("Please write some note content.");

        noteContent.focus();

        return;
    }


    // Create new note

    const newNote = {

        id: Date.now(),

        title: title,

        subject: subject,

        content: content,

        date: new Date().toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        })

    };


    // Add note to array

    notes.push(newNote);


    // Save notes

    saveNotes();


    // Display notes

    displayNotes();


    // Clear form

    noteTitle.value = "";

    noteSubject.value = "";

    noteContent.value = "";


    noteTitle.focus();

});


// =========================================
// DISPLAY NOTES
// =========================================

function displayNotes(filteredNotes = notes) {

    notesContainer.innerHTML = "";


    // Update note count

    noteCount.textContent = filteredNotes.length;


    // Show empty message

    if (filteredNotes.length === 0) {

        notesContainer.innerHTML = `

            <div class="empty-notes">

                <div class="empty-icon">
                    📖
                </div>

                <h3>
                    No Notes Found
                </h3>

                <p>
                    Create your first study note to get started.
                </p>

            </div>

        `;

        return;
    }


    // Create note cards

    filteredNotes.forEach(function (note) {


        const noteCard = document.createElement("div");

        noteCard.className = "note-card";


        // Title

        const title = document.createElement("h3");

        title.textContent = note.title;


        // Subject

        const subject = document.createElement("span");

        subject.className = "note-subject";

        subject.textContent = note.subject;


        // Content

        const content = document.createElement("p");

        content.textContent = note.content;


        // Footer

        const footer = document.createElement("div");

        footer.className = "note-footer";


        // Date

        const date = document.createElement("span");

        date.className = "note-date";

        date.textContent = "📅 " + note.date;


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-note";

        deleteButton.innerHTML = "🗑️";

        deleteButton.title = "Delete Note";


        // Delete event

        deleteButton.addEventListener("click", function () {

            deleteNote(note.id);

        });


        // Add elements to footer

        footer.appendChild(date);

        footer.appendChild(deleteButton);


        // Add everything to card

        noteCard.appendChild(title);

        noteCard.appendChild(subject);

        noteCard.appendChild(content);

        noteCard.appendChild(footer);


        // Add card to container

        notesContainer.appendChild(noteCard);

    });

}


// =========================================
// DELETE NOTE
// =========================================

function deleteNote(noteId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
    );


    if (!confirmDelete) {

        return;

    }


    notes = notes.filter(function (note) {

        return note.id !== noteId;

    });


    saveNotes();

    displayNotes();

}


// =========================================
// SEARCH NOTES
// =========================================

searchNotes.addEventListener("input", function () {

    const searchText = searchNotes.value
        .toLowerCase()
        .trim();


    const filteredNotes = notes.filter(function (note) {

        return (

            note.title.toLowerCase().includes(searchText) ||

            note.subject.toLowerCase().includes(searchText) ||

            note.content.toLowerCase().includes(searchText)

        );

    });


    displayNotes(filteredNotes);

});


// =========================================
// SAVE NOTES
// =========================================

function saveNotes() {

    localStorage.setItem(
        "studySphereNotes",
        JSON.stringify(notes)
    );

}


// =========================================
// INITIAL DISPLAY
// =========================================

displayNotes();