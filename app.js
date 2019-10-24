// set local storage item
// localStorage.setItem('name', 'John');
// localStorage.setItem('age', '30');

// set session storage item
// sessionStorage.setItem('name', 'Beth');

// remove from storage
// localStorage.removeItem('name');

// get from storage
// const name = localStorage.getItem('name');
// const age = localStorage.getItem('age');

// // clear local storage
// localStorage.clear();

// JSON.parse() is for "parsing" something that was received as JSON. JSON.stringify() is to create a JSON string out of an object/array.
// console.log(name, age);

// DOM Load event

const taskList = document.querySelector(".collection");
const clearTasksBtn = document.querySelector(".clear-tasks");
let tasks = JSON.parse(localStorage.getItem("tasks"));

//get tasks from LS update UI
document.addEventListener("DOMContentLoaded", getTasksAndUpdateUI);
//clear all tasks
clearTasksBtn.addEventListener("click", clearTasks);
// Remove task event
taskList.addEventListener("click", removeTask);
//handleform submit
document.querySelector("form").addEventListener("submit", handleSubmit);

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target.parentElement.parentElement.value); => 0
    // console.log(e.target.parentElement.parentElement.textContent); => task value
    let taskToRemove = e.target.parentElement.parentElement;
    taskToRemove.remove();

    // Remove from LS
    let tasks = getLocalStorage();
    tasks.forEach((task, index) => {
      if (taskToRemove.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function clearTasks() {
  //clear tasks form UI
  taskList.innerHTML = "";
  /*// Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }*/

  //clear tasks from LS
  localStorage.clear();
}

function handleSubmit(e) {
  const task = document.getElementById("task").value;
  if (task == "") return;
  addTaskToUI(task);
  addTaskToLS(task);
  document.getElementById("task").value = "";
  e.preventDefault();
}

function getTasksAndUpdateUI() {
  //  get tasks from local storage
  let tasks = getLocalStorage();

  tasks.forEach(task => {
    addTaskToUI(task);
  });
}

function getLocalStorage() {
  let tasks;
  tasks =
    localStorage.getItem("tasks") === null
      ? []
      : JSON.parse(localStorage.getItem("tasks"));
  return tasks;
}
function addTaskToLS(task) {
  let tasks = getLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToUI(task) {
  /*  create list item and append to list collection*/
  let li;
  //  creates an element "li"
  li = document.createElement("li");
  //  Add class
  li.className = "collection-item";
  // Create text node with last item in the tasks and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-trash"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append the link to li
  taskList.appendChild(li);
}
