/* 
App Name  : To Do List App
Developer : Pushpak Ghatode
Date      : 06 June 2024 
*/

// List and objects used for maintaining the data from user
let allTasks = {};
let compTasks = [];
let totalTasks = 0;
let idGeneratorPivot = 0;

// DOM Elements fetched to be used in the functions
const totalTasksElement = document.querySelector("#total span");
const newTaskIpElement = document.getElementById("new-task-name");
const listContElement = document.getElementById("list-container");
const noTaskHeaderElement = document.querySelector("#list-container h1");
const sortAllBtnElement = document.getElementById("sort-all");
const sortUnCompBtnElement = document.getElementById("sort-uncomp");
const sortCompBtnElement = document.getElementById("sort-comp");

// CSS variables fetched from the CSS stylesheet
const cssVariablesObjects = getComputedStyle(document.querySelector(":root"));

function updateTotalTasks() {
  // function to update the value of total tasks present
  totalTasksElement.textContent = totalTasks;
}

function delTask(tId) {
  // function to delete a single task with given id
  console.log(`Delete task - ${tId}`);
  totalTasks--;
  allTasks[tId].remove();
  delete allTasks[tId];
  if (compTasks.includes(tId)) {
    compTasks = compTasks.filter((x) => x != tId);
  }
  if (!totalTasks) {
    noTaskState(true);
    colorButtons();
  }
  updateTotalTasks();
}

function createTaskTile(newTaskName) {
  // function to create a new tile for task in the HTML
  let taskId = `T${idGeneratorPivot++}`;
  totalTasks++;
  // created radio button
  const radioIpEle = document.createElement("input");
  radioIpEle.type = "checkbox";
  radioIpEle.value = true;
  radioIpEle.addEventListener("click", () => {
    console.log(`Task ${taskId} Completed !`);
    compTasks.push(taskId);
  });

  // created task name
  const spanEle = document.createElement("span");
  const innerSpanEle = document.createElement("span");
  innerSpanEle.textContent = newTaskName;
  spanEle.append(radioIpEle, innerSpanEle);

  // created delete button
  const delBtnEle = document.createElement("button");
  delBtnEle.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark"></i>`;
  delBtnEle.addEventListener("click", () => {
    delTask(taskId);
  });

  // outermost division for the tile created
  const mainDiv = document.createElement("div");
  mainDiv.id = taskId;
  mainDiv.append(spanEle, delBtnEle);

  allTasks[taskId] = mainDiv;
  return mainDiv;
}

function noTaskState(toBeAdded) {
  // function to remove or add text message when the list container is empty
  if (toBeAdded) {
    listContElement.innerHTML = `<h1>Make Your Todo List Now !</h1>`;
  } else {
    listContElement.innerHTML = "";
  }
}

function colorButtons(btnToColor = null) {
  // function to color the button on which sorting has been selected.
  if (btnToColor == sortAllBtnElement)
    sortAllBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-1");
  else
    sortAllBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-2");
  if (btnToColor == sortCompBtnElement)
    sortCompBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-1");
  else
    sortCompBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-2");
  if (btnToColor == sortUnCompBtnElement)
    sortUnCompBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-1");
  else
    sortUnCompBtnElement.style.color =
      cssVariablesObjects.getPropertyValue("--color-2");
}

function main() {
  // main execution function
  console.log("App Started !");

  noTaskState(true);
  // Add button to add tasks to the to-do list
  const addTaskBtnElement = document.getElementById("add-task");
  addTaskBtnElement.addEventListener("click", () => {
    console.log("add task called !");
    newTaskName = newTaskIpElement.value;
    if (newTaskName) {
      if (totalTasks == 0) {
        noTaskState(false);
        colorButtons(sortAllBtnElement);
      }
      listContElement.append(createTaskTile(newTaskName));
      updateTotalTasks();
      newTaskIpElement.value = "";
      sortAllBtnElement.click();
    } else {
      alert("Please Enter Task Details First !");
    }
  });

  // Complete All Task button will complete all tasks in the list
  const compAllBtnElement = document.getElementById("complete-all");
  compAllBtnElement.addEventListener("click", () => {
    console.log("complete all clicked!");
    for (let t in allTasks) {
      document.querySelector(`#${t} span input`).checked = true;
      compTasks.push(t);
      console.log(`Task ${t} Completed !`);
    }
    sortAllBtnElement.click();
  });

  // Clear All Task button will clear all tasks from the list
  const clearCompBtnElement = document.getElementById("clear-completed");
  clearCompBtnElement.addEventListener("click", () => {
    console.log("clear Completed clicked!");
    for (let t of compTasks) {
      document.querySelector(`#${t} span input`).checked = false;
    }
    compTasks = [];
    console.log("All completed tasks cleared !");
    sortAllBtnElement.click();
  });

  // Buttons to sort the list
  // first - to show all the tasks from the list in the database.
  sortAllBtnElement.addEventListener("click", () => {
    console.log("View All..");
    colorButtons(sortAllBtnElement);
    for (let task in allTasks) {
      allTasks[task].style.display = "flex";
    }
  });

  // second - to show all completed tasks from the list in the database.
  sortCompBtnElement.addEventListener("click", () => {
    console.log("View Only Completed..");
    colorButtons(sortCompBtnElement);
    for (let task in allTasks) {
      console.log(task);
      if (compTasks.includes(task)) allTasks[task].style.display = "flex";
      else allTasks[task].style.display = "none";
    }
  });

  // second - to show all uncompleted tasks from the list in the database.
  sortUnCompBtnElement.addEventListener("click", () => {
    console.log("View Only Uncompleted..");
    colorButtons(sortUnCompBtnElement);
    for (let task in allTasks) {
      if (compTasks.includes(task)) allTasks[task].style.display = "none";
      else {
        allTasks[task].style.display = "flex";
      }
    }
  });
}

// executing the code
main();
