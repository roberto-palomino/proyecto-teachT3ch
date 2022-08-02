'use strict'

let holidayToDoList = [];
let holidayToDoListComplete = [];

const allElementsList = localStorage.getItem("items");
if ( allElementsList !== null) {
  holidayToDoList = JSON.parse(allElementsList );  
}
const completedElementsList = localStorage.getItem("itemsCompleted");
if ( completedElementsList !== null) {
  holidayToDoListComplete = JSON.parse(completedElementsList );  
} 

const input = document.getElementById("toDo-input") 
input.onchange = addItem;

function addItem() {
  const toDo = input.value;  
  holidayToDoList.push(toDo);
  localStorage.setItem("items", JSON.stringify(holidayToDoList))
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
    localStorage.setItem("itemsCompleted", JSON.stringify(holidayToDoListComplete));
    } else {
    const targetIndex = holidayToDoListComplete.indexOf(
      targetValue
    );
    targetParent.id = "";
    uncheckToDoElement(targetIndex);    
  }
  renderItems();
}

function deleteToDoElement(generalIndex, completedIndex) {
  holidayToDoList.splice(generalIndex, 1);
  localStorage.setItem("items",JSON.stringify(holidayToDoList));
  
  if (completedIndex >= 0) {
    holidayToDoListComplete.splice(completedIndex, 1);
    localStorage.setItem("itemsCompleted", JSON.stringify(holidayToDoListComplete));
  }
}

function handleDelete(itemValue) {
  const generalIndex = holidayToDoList.indexOf(
    itemValue
  );
  const completedIndex = holidayToDoListComplete.indexOf(
    itemValue
  );
  deleteToDoElement(generalIndex, completedIndex);  
  renderItems();
}

function generateItem(itemValue) {
  const listElement = document.createElement("li");
  listElement.className = "newToDo";      
  
  const checkInput = document.createElement("input");    
  checkInput.classList = "check";
  // checkInput.id = "check";
  checkInput.value = itemValue;
  listElement.appendChild(checkInput).type = "checkbox";      
  
  const labelToDoEntry = document.createElement("label");
  labelToDoEntry.classList = "label-input";
  labelToDoEntry.setAttribute("for", "check");
  const labelToDoText = document.createTextNode(itemValue);
  labelToDoEntry.appendChild(labelToDoText);
  listElement.appendChild(labelToDoEntry);      
  
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button"
  deleteButton.id = "delete-button"
  deleteButton.textContent = "X";  
  listElement.appendChild(deleteButton);
  deleteButton.onclick = () => {
      handleDelete(itemValue);
  };
  return { listElement, checkInput};
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
  accordionButton.innerText = "expand_more";
  menuAccordion.onclick = () => {
    listCompleted.classList.toggle("countTextVisibility");
    // localStorage.setItem("countTextVisibility",listCompleted.classList);

    if (accordionButton.innerText === "expand_more") {
      accordionButton.innerText = "chevron_right";
    } else {
      accordionButton.innerText = "expand_more";
    }
    // localStorage.setItem("arrow-position", accordionButton.innerText)
  };
  // window.onload = () => {
  //   const totalElementsVisibility = localStorage.getItem("countTextVisibility");
  //   listCompleted.classList = totalElementsVisibility;
  //   const accordionArrow = localStorage.getItem("arrow-position");
  //   accordionButton.innerText = accordionArrow;
  // }
  
}
renderItems();
    

const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.textContent = "Dark Theme";
const body = document.getElementById("body");
darkModeToggle.addEventListener('click', () => {
  
  body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", body.classList);
 
  if (body.className === "darkmode") {
    darkModeToggle.textContent = "Light Theme"
  } else {
    darkModeToggle.textContent = "Dark Theme"
  }
  localStorage.setItem("theme-mode", darkModeToggle.textContent);
  });
window.onload = () => {
  const themeClass = localStorage.getItem("darkmode");
  body.classList = themeClass;
  const themeMode = localStorage.getItem("theme-mode");
  darkModeToggle.textContent = themeMode;
}


// CÓDIGO PARA LA CREACION DE NUEVAS NOTAS (IN PROCESS):

function newNote() {
  const noteSection = document.querySelector("main");
  const newDiv = document.createElement("div");
  newDiv.classList = "new-note";

  const newTitle = document.createElement("input");
  const newListName = newTitle.value;
  newTitle.classList = "new-title";
  const title = document.createTextNode(newListName)
  newDiv.appendChild(title)
  newDiv.appendChild(newTitle)
  noteSection.appendChild(newDiv)
  console.log(newListName);
}
const newDivNote = document.getElementById("new-note");
newDivNote.onclick = newNote




    
  