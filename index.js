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
  checkInput.id = "check";
  checkInput.value = itemValue;
  listElement.appendChild(checkInput).type = "checkbox";      
  
  const labelToDoEntry = document.createElement("label"); 
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
  const listCompleted = document.getElementById("list-Completed")

  list.innerHTML = "";  
  listCompleted.innerHTML = ""
  
  for (const generalIndex in holidayToDoList) {
    const itemValue = holidayToDoList[generalIndex];
    const { listElement, checkInput} = generateItem(itemValue)
    
    const isACompletedItem = holidayToDoListComplete.find((item) => item === itemValue);
    if (!isACompletedItem) {
      list.appendChild(listElement);      
    }
    checkInput.addEventListener("change", toggleCheck);
  }  
 
  for (const completedIndex in holidayToDoListComplete) {
    const itemValue = holidayToDoListComplete[completedIndex];
    const { listElement, checkInput} = generateItem(itemValue) 
    listElement.id = "completed"
    checkInput.checked = true;    
    
    listCompleted.appendChild(listElement)
    checkInput.addEventListener("change", toggleCheck);
  }  
  const totalSpan = document.getElementById("completed-total");
  const accordionButton = document.getElementById("completed-icon");
  accordionButton.innerHTML = "˃"
  totalSpan.innerHTML = `${holidayToDoListComplete.length} elementos completados`;  
  
  totalSpan.onclick = () => {
    listCompleted.classList.toggle("countTextVisibility");
    accordionButton.classList.toggle("opened");
    if ( accordionButton.className === "opened") {
      accordionButton.innerText = "˃"
    } else {
      accordionButton.innerText = "˅"
    } 
  };  
} 
renderItems()


const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.innerText = "Dark Theme";
const body = document.getElementById("body");
darkModeToggle.addEventListener('click', () => {
  
  body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", body.classList);
 
  if ( body.className === "darkmode") {
    darkModeToggle.innerText = "Light Theme"
  } else {
    darkModeToggle.innerText = "Dark Theme"
  }

  });
window.onload = () => {
  const themeClass = localStorage.getItem("darkmode");
  body.classList = themeClass;
}




    
  