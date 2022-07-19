'use strict'

const holidayToDoList = [];
const holidayToDoListComplete = [];



const input = document.getElementById("toDo-input") 
const button = document.getElementById("add-Button") 

button.onclick = addItem;

function addItem() {
  const toDo = input.value;  
  holidayToDoList.push(toDo);
  renderItems();
  input.value = "";
   
} 

function uncheckToDoElement(i) {
  holidayToDoListComplete.splice(i, 1);
}

function deleteToDoElement(i) {
  holidayToDoList.splice(i, 1);
  console.log("Valor de array completo:", holidayToDoList);
  renderItems();
}

function toggleCheck(event) {
  const targetElement = event.target;
  const targetValue = targetElement.value;
  const targetParent = targetElement.parentNode;
  if (targetElement.checked) {
    targetParent.id = "completed";
    holidayToDoListComplete.push(targetValue);
  } else {
    const targetIndex = holidayToDoListComplete.indexOf(
      targetValue
      );
    targetParent.id = "";
    uncheckToDoElement(targetIndex);
  }

  console.log("Valor de items completados:", holidayToDoListComplete);
  console.log("Valor de la lista de items:", holidayToDoList);
}

function renderItems() {
  list.innerHTML = "";

  for (const i in holidayToDoList) {
    const itemValue = holidayToDoList[i];
    const isACompletedItem = holidayToDoListComplete.find((item) => item === itemValue);
    const toDoEntry = document.createElement("li");
    toDoEntry.className = "newToDo";
    const newToDoText = document.createTextNode(itemValue);
    toDoEntry.appendChild(newToDoText);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    toDoEntry.appendChild(deleteButton);
    deleteButton.onclick = () => {
      deleteToDoElement(i);
    };
    
    const checkToDoEntry = document.createElement("input");
    checkToDoEntry.classList = "check";
    checkToDoEntry.id = "check";
    checkToDoEntry.value = itemValue;
    toDoEntry.appendChild(checkToDoEntry).type = "checkbox";

    if (isACompletedItem) {
      toDoEntry.id = "completed";
      checkToDoEntry.checked = true;
    }
    
    list.appendChild(toDoEntry);
    console.log("Valor de array completo:", holidayToDoList);
    

    checkToDoEntry.addEventListener("change", toggleCheck);
  }
} 
renderItems()


  





    
  