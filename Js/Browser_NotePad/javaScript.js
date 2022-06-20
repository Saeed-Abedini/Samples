const addTask = document.querySelector("#createTask");
const alertTask = document.querySelector("#alertTask");
const alertClear = document.querySelector("#alertClear");
const form = document.querySelector("#InputTask");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clearBtn");
const removeBtn = document.querySelector("#ulList");
let tasks = [];
form.addEventListener("submit", addTaskFunc);
clearBtn.addEventListener("click", clearBtnFunc);
removeBtn.addEventListener("click", listItemDelFunc);
filter.addEventListener("keyup", filterFunc);

document.addEventListener("DOMContentLoaded", () => {
  const lsTasks = localStorage.getItem("Task")
    ? JSON.parse(localStorage.getItem("Task"))
    : [];
  lsTasks.map((item) => {
    const newLi = document.createElement("li");
    newLi.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newLi.appendChild(document.createTextNode(item));
    const newI = document.createElement("i");
    newI.className = "ti-trash text-danger font-weight-bolder delete-item";
    newLi.appendChild(newI);
    removeBtn.appendChild(newLi);
    tasks.push(item);
  });
});

function addTaskFunc(event) {
  event.preventDefault();
  if (addTask.value === "") {
    alertTask.innerHTML = "Please Type Something <br>";
  } else {
    tasks.push(addTask.value);
    alertTask.innerHTML = "";
    const newLi = document.createElement("li");
    newLi.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newLi.appendChild(document.createTextNode(addTask.value));
    const newI = document.createElement("i");
    newI.className = "ti-trash text-danger font-weight-bolder delete-item";
    newLi.appendChild(newI);
    removeBtn.appendChild(newLi);
    addTask.value = "";
    alertClear.innerHTML = '';

  }
  localStorage.setItem("Task", JSON.stringify(tasks));
}
function clearBtnFunc() {
  if (removeBtn.innerText === '') {
    alertClear.innerHTML = "یادداشتی برای پاک کردن وجود ندارد";
  } else {
    removeBtn.innerHTML = "";
    localStorage.clear();
  }
}
function listItemDelFunc(e) {
  if (e.target.classList.contains("delete-item")) {
    if (confirm("آیا برای حذف مطمئن هستید؟")) {
      let indexTask = tasks.indexOf(e.target.parentElement.innerText);
      tasks.splice(indexTask, 1);
      localStorage.setItem("Task", JSON.stringify(tasks));
      e.target.parentElement.remove();
    }
  }
}
function filterFunc(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.classList.add("d-flex");
    } else {
      task.classList.remove("d-flex");
      task.style.display = "none";
    }
  });
}
