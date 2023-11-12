const textEl = document.getElementById("text-input");
const buttonEL = document.getElementById("btn");
const taskEl = document.getElementById("task");

function addTask() {
    
    
    if (textEl.value == "") {
        alert("You have to Add Task!!");
    } else {
      const li = document.createElement("li");
    li.innerHTML = textEl.value;
    taskEl.appendChild(li);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    textEl.value = "";
    setLocalData();

  }
}
 
  taskEl.addEventListener(
    "click",
    function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        setLocalData();
      } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        setLocalData();
      }
    },
    false
  );


function setLocalData() {
  localStorage.setItem("data", taskEl.innerHTML);
}

function getLocalData() {
  taskEl.innerHTML = localStorage.getItem("data");
}
getLocalData();

function clearData(){

    while (taskEl.firstChild) {
    taskEl.removeChild(taskEl.firstChild);
     setLocalData();
  }
}