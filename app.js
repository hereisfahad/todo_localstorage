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
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
  tasks.forEach(task => {
    li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(task)); //makes text from input field the li text
    list.appendChild(li); //adds li to ul
  });
}

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const task = document.getElementById("task").value;
  let tasks;
  tasks =
    localStorage.getItem("tasks") === null
      ? []
      : JSON.parse(localStorage.getItem("tasks"));

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("task").value = "";
  let li;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  li = document.createElement("li"); // creates an element "li"
  li.appendChild(document.createTextNode(tasks[tasks.length - 1])); //makes text from input field the li text
  list.appendChild(li); //adds li to ul
});
// });
