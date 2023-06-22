const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
const allTasksBtn = document.getElementById("tab-all");
const completedTasksBtn = document.getElementById("tab-complete");
const imCompletedTasksBtn = document.getElementById("tab-incomplete");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount--;
      displayCount(taskCount);
    };
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling.innerText;
      targetElement.parentNode.remove();
      taskCount--;
      displayCount(taskCount);
    };
  });
  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkbox) => {
    checkbox.onchange = () => {
      checkbox.nextElementSibling.classList.toggle("completed");
      if (checkbox.checked) {
        taskCount--;
      } else {
        taskCount++;
      }
      displayCount(taskCount);
    };
  });
  taskCount++;
  displayCount(taskCount);
  newTaskInput.value = "";
};

const showCompletedTasks = () => {
  imCompletedTasksBtn.style.color = "#000";
  allTasksBtn.style.color = "#000";
  completedTasksBtn.style.color = "#5a95ff";

  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => {
    const checkbox = task.querySelector(".task-check");
    if (checkbox.checked) {
      task.style.display = "grid";
    } else {
      task.style.display = "none";
    }
  });
};

const showImCompletedTasks = () => {
  completedTasksBtn.style.color = "#000";
  allTasksBtn.style.color = "#000";
  imCompletedTasksBtn.style.color = "#5a95ff";

  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => {
    const checkbox = task.querySelector(".task-check");
    if (!checkbox.checked) {
      task.style.display = "grid";
    } else {
      task.style.display = "none";
    }
  });
};

const showAllTasks = () => {
  completedTasksBtn.style.color = "#000";
  imCompletedTasksBtn.style.color = "#000";
  allTasksBtn.style.color = "#5a95ff";

  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => {
    task.style.display = "grid";
  });
};

completedTasksBtn.addEventListener("click", showCompletedTasks);
imCompletedTasksBtn.addEventListener("click", showImCompletedTasks);
allTasksBtn.addEventListener("click", showAllTasks);

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
  allTasksBtn.style.color = "#5a95ff";
};
