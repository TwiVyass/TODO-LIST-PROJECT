//these variables reference DOM elements that will be accessed and updated across multiple functions

const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    const inputBox = document.getElementById("input-box");
    const task = inputBox.value.trim(); // Get the input value and trim extra spaces
  
    if (task === "") {
      alert("Please enter a task!"); // Alert if input is empty
      return;
    }
  
    const listContainer = document.getElementById("list-container");
  
    // Create a new list item
    const li = document.createElement("li");
  
    // Define the innerHTML of the list item
    li.innerHTML = `
      <label>
        <input type="checkbox" onchange="updateCounters(this)">
        <span>${task}</span>
      </label>
      <span class="edit-btn" onclick="editTask(this)">Edit</span>
      <span class="delete-btn" onclick="deleteTask(this)">Delete</span>
    `;
  
    listContainer.appendChild(li);
    
    // Access parts of the newly created list item
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        //When we check off a task, it is marked as "complete". But we want to mark it back as "incomplete" after we edit it
        updateCounters();
      });

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
          taskSpan.textContent = update;
          li.classList.remove("completed");
          // To uncheck the box and update the counter
          checkbox.checked = false;updateCounters();
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
          li.remove();
          updateCounters();
        }
      });

    li.classList.remove("completed");
  
    inputBox.value = ""; // Clear the input box
    updateCounters();
  }
  
  // Edit task function
  function editTask(editBtn) {
    const taskSpan = editBtn.previousElementSibling.querySelector("span");
    const newTask = prompt("Edit your task:", taskSpan.textContent);
    if (newTask) {
      taskSpan.textContent = newTask.trim();
    }
  }
  
  // Delete task function
  function deleteTask(deleteBtn) {
    deleteBtn.parentElement.remove(); // Remove the list item
    updateCounters();
  }
  
  // Update counters
  function updateCounters() {
    const listItems = document.querySelectorAll("#list-container li");
    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");
  
    let completedCount = 0;
    let uncompletedCount = 0;
  
    listItems.forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      if (checkbox.checked) {
        completedCount++;
      } else {
        uncompletedCount++;
      }
    });
  
    completedCounter.textContent = completedCount;
    uncompletedCounter.textContent = uncompletedCount;
  }

  function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.completed)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }

  