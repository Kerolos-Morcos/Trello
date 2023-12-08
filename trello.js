var text_input = document.getElementById("text_input");
var inProgress = document.getElementById("inProgress");
var ParentDiv = document.getElementsByClassName("ParentDiv");
var counter = 0;

// Function to add a new task
function Add() {
    var Paragraph = document.createElement('p');
    Paragraph.setAttribute("draggable", true);
    Paragraph.setAttribute("id", counter++);
    Paragraph.innerText = text_input.value;
    inProgress.appendChild(Paragraph);

    // Set up drag start event
    Paragraph.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text", this.id);
    });
}

// Set up drag over and drop events for each container
for (var i = 0; i < ParentDiv.length; i++) {
    ParentDiv[i].addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    ParentDiv[i].addEventListener("drop", function (event) {
        var draggedID = event.dataTransfer.getData("text");
        var element = document.getElementById(draggedID);

        // Append the dragged element to the drop target
        this.appendChild(element);
    });
}

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("task_")) {
            var taskText = localStorage.getItem(key);
            var Paragraph = document.createElement('p');
            Paragraph.setAttribute("draggable", true);
            Paragraph.setAttribute("id", key.replace("task_", ""));
            Paragraph.innerText = taskText;
            inProgress.appendChild(Paragraph);

            // Set up drag start event for dynamically created tasks
            Paragraph.addEventListener("dragstart", function (event) {
                event.dataTransfer.setData("text", this.id);
            });
        }
    }
});

function saveToLocalStorage() {
    var paragraphs = document.querySelectorAll('.ParentDiv p');

    paragraphs.forEach(function (paragraph) {
        localStorage.setItem("task_" + paragraph.id, paragraph.innerText);
    });
}