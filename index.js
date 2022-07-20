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
// const button = document.getElementById("add-Button") 
input.onchange = addItem;

function addItem() {
  const toDo = input.value;  
  holidayToDoList.push(toDo);
  renderItems();
  input.value = "";
   
} 

function uncheckToDoElement(i) {
  holidayToDoListComplete.splice(i, 1);
  localStorage.setItem("itemsCompleted", JSON.stringify(holidayToDoListComplete))
  // localStorage.setItem("items", JSON.stringify(holidayToDoList))
}

function deleteToDoElement(i) {
  holidayToDoList.splice(i, 1);
  holidayToDoListComplete.splice(i, 1);
  localStorage.removeItem(i);
  renderItems();
}


function toggleCheck(event) {
  const targetElement = event.target;
  const targetValue = targetElement.value;
  const targetParent = targetElement.parentNode;
  const list = document.getElementById("list");
  const listCompleted = document.getElementById("list-Completed");

  if (targetElement.checked) {
    targetParent.id = "completed";
    list.insertBefore(targetParent, list.children[-1]);
    holidayToDoListComplete.push(targetValue);
    listCompleted.appendChild(targetParent);
    localStorage.setItem("itemsCompleted", JSON.stringify(holidayToDoListComplete))         
    
    
  } else {
    const targetIndex = holidayToDoListComplete.indexOf(
      targetValue
      );
      console.log("Valor de target",targetValue );
    targetParent.id = "";
    uncheckToDoElement(targetIndex);
    
    list.appendChild(targetParent);
  }
}

function renderItems() {
  list.innerHTML = "";  

  for (const i in holidayToDoList) {
    const itemValue = holidayToDoList[i];
    const isACompletedItem = holidayToDoListComplete.find((item) => item === itemValue);
    const toDoEntry = document.createElement("li");
    toDoEntry.className = "newToDo";
    // const newToDoText = document.createTextNode(itemValue);
    // toDoEntry.appendChild(newToDoText);
    
    
    
    const checkToDoEntry = document.createElement("input");    
    checkToDoEntry.classList = "check";
    checkToDoEntry.id = "check";
    checkToDoEntry.value = itemValue;
    toDoEntry.appendChild(checkToDoEntry).type = "checkbox";

    if (isACompletedItem) {
      toDoEntry.id = "completed";
      checkToDoEntry.checked = true;
      
            //  console.log("Lista de tareas completadas:", holidayToDoListComplete);
    }

    const labelToDoEntry = document.createElement("label"); 
    labelToDoEntry.setAttribute("for", checkToDoEntry)
    const labelToDoText = document.createTextNode(itemValue);
    toDoEntry.appendChild(labelToDoText)


    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button"
    deleteButton.id = "delete-button"
    deleteButton.textContent = "X";
    toDoEntry.appendChild(deleteButton);
    deleteButton.onclick = () => {
      deleteToDoElement(i);
    };
    
    list.appendChild(toDoEntry);
    
    console.log("Entrada toDoEntry:", toDoEntry);
    localStorage.setItem("items", JSON.stringify(holidayToDoList))
    
    
    
    checkToDoEntry.addEventListener("change", toggleCheck);
  }
  console.log("Valor de items completados:", holidayToDoListComplete);
  console.log("Valor de la lista de items:", holidayToDoList);
} 
renderItems()




  





    
  