const form = document.querySelector(".task-addition");
const taskList = document.querySelector(".task ul");
const clearButton = document.querySelector(".task-info button");
const numOfPendingTasks = document.querySelector(".task-content");
const searchBox = document.querySelector(".search-box-container");

function pedningTasks() {
  numOfPendingTasks.textContent = `You have ${taskList.children.length} pending tasks`;
}

function filterList(filterTerm) {
  //console.log(filterTerm);
  Array.from(taskList.children)
    .filter((child) => {
      return !child.textContent.toLowerCase().includes(filterTerm);
    })
    .forEach((element) => {
      element.classList.add("hide");
    });

  Array.from(taskList.children)
    .filter((child) => {
      return child.textContent.toLowerCase().includes(filterTerm);
    })
    .forEach((element) => {
      element.classList.remove("hide");
    });
}

pedningTasks();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (form.addTask.value.trim().length > 0) {
    taskList.innerHTML += `<li>
            <span class="task-title">${form.addTask.value}</span>
            <i class="bi bi-trash3-fill remove"></i>
          </li>`;
    form.reset();
    pedningTasks();
  }
});

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    event.target.parentElement.remove();
    pedningTasks();
  }
});

clearButton.addEventListener("click", (event) => {
  Array.from(taskList.children).forEach((child) => {
    child.remove();
  });
  pedningTasks();
});

searchBox.addEventListener("keyup", (event) => {
  filterList(searchBox.searchWord.value.toLowerCase());
});

searchBox.addEventListener("click", (event) => {
  searchBox.reset();
  filterList(searchBox.searchWord.value);
});
