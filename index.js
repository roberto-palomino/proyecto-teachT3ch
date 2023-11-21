"use strict";

let holidayToDoList = [];
let holidayToDoListComplete = [];

const allElementsList = localStorage.getItem("items");
if (allElementsList !== null) {
  holidayToDoList = JSON.parse(allElementsList);
}
const completedElementsList = localStorage.getItem("itemsCompleted");
if (completedElementsList !== null) {
  holidayToDoListComplete = JSON.parse(completedElementsList);
}

const input = document.getElementById("toDo-input");
input.onchange = addItem;

function addItem() {
  const toDo = input.value;
  holidayToDoList.push(toDo);
  localStorage.setItem("items", JSON.stringify(holidayToDoList));
  renderItems();
  input.value = "";
}

function uncheckToDoElement(i) {
  holidayToDoListComplete.splice(i, 1);
  localStorage.setItem(
    "itemsCompleted",
    JSON.stringify(holidayToDoListComplete)
  );
}

function toggleCheck(event) {
  const targetElement = event.target;
  const targetValue = targetElement.value;
  const targetParent = targetElement.parentNode;

  if (targetElement.checked) {
    targetParent.id = "completed";
    holidayToDoListComplete.push(targetValue);
    localStorage.setItem(
      "itemsCompleted",
      JSON.stringify(holidayToDoListComplete)
    );
  } else {
    const targetIndex = holidayToDoListComplete.indexOf(targetValue);
    targetParent.id = "";
    uncheckToDoElement(targetIndex);
  }
  renderItems();
}

function deleteToDoElement(generalIndex, completedIndex) {
  holidayToDoList.splice(generalIndex, 1);
  localStorage.setItem("items", JSON.stringify(holidayToDoList));

  if (completedIndex >= 0) {
    holidayToDoListComplete.splice(completedIndex, 1);
    localStorage.setItem(
      "itemsCompleted",
      JSON.stringify(holidayToDoListComplete)
    );
  }
}

function handleDelete(itemValue) {
  const generalIndex = holidayToDoList.indexOf(itemValue);
  const completedIndex = holidayToDoListComplete.indexOf(itemValue);
  deleteToDoElement(generalIndex, completedIndex);
  renderItems();
}

function generateItem(itemValue) {
  const listElement = document.createElement("li");
  listElement.className = "newToDo";

  const checkInput = document.createElement("input");
  checkInput.classList = "check";
  checkInput.value = itemValue;
  listElement.appendChild(checkInput).type = "checkbox";

  const labelToDoEntry = document.createElement("label");
  labelToDoEntry.classList = "label-input";
  labelToDoEntry.setAttribute("for", "check");
  const labelToDoText = document.createTextNode(itemValue);
  labelToDoEntry.appendChild(labelToDoText);
  listElement.appendChild(labelToDoEntry);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.id = "delete-button";
  deleteButton.textContent = "X";
  listElement.appendChild(deleteButton);
  deleteButton.onclick = () => {
    handleDelete(itemValue);
  };
  return { listElement, checkInput };
}

function renderItems() {
  const list = document.getElementById("list");
  const listCompleted = document.getElementById("list-Completed");

  list.innerHTML = "";
  listCompleted.innerHTML = "";

  for (const generalIndex in holidayToDoList) {
    const itemValue = holidayToDoList[generalIndex];
    const { listElement, checkInput } = generateItem(itemValue);

    const isACompletedItem = holidayToDoListComplete.find(
      (item) => item === itemValue
    );
    if (!isACompletedItem) {
      list.appendChild(listElement);
    }
    checkInput.addEventListener("change", toggleCheck);
  }

  for (const completedIndex in holidayToDoListComplete) {
    const itemValue = holidayToDoListComplete[completedIndex];
    const { listElement, checkInput } = generateItem(itemValue);
    listElement.id = "completed";
    checkInput.checked = true;

    listCompleted.appendChild(listElement);
    checkInput.addEventListener("change", toggleCheck);
  }

  const totalSpan = document.getElementById("completed-total");
  const menuAccordion = document.getElementById("menu-accordion-button");
  const accordionButton = document.getElementById("completed-icon");
  totalSpan.innerText = `${holidayToDoListComplete.length} elementos completados`;
  menuAccordion.onclick = () => {
    listCompleted.classList.toggle("countTextVisibility");

    if (accordionButton.innerText === "expand_more") {
      accordionButton.innerText = "chevron_right";
    } else {
      accordionButton.innerText = "expand_more";
    }
  };
}

renderItems();

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.getElementById("body");

function updateButtonText() {
  if (body.classList.contains("darkmode")) {
    darkModeToggle.textContent = "Light Theme";
  } else {
    darkModeToggle.textContent = "Dark Theme";
  }
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", body.classList);
  updateButtonText();
  localStorage.setItem("theme-mode", darkModeToggle.textContent);
});

window.onload = () => {
  const themeClass = localStorage.getItem("darkmode");

  if (themeClass) {
    body.classList = themeClass;
  }
  const themeMode = localStorage.getItem("theme-mode");

  if (themeMode) {
    darkModeToggle.textContent = themeMode;
  }
  updateButtonText();
};
