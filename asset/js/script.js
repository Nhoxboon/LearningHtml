document.addEventListener("DOMContentLoaded", () => {
  const tasksContainer = document.getElementById("tasks-container");
  const showAddTaskFormButton = document.getElementById("showAddTaskForm");
  const addTaskFormContainer = document.getElementById("addTaskFormContainer");
  const addTaskForm = document.getElementById("addTaskForm");
  const taskInput = document.getElementById("task");

  let tasks = [];
  let selectedPriority = null;



  const fetchTasks = async () => {
    try {
      const response = await fetch("/asset/json/data.json");
      const data = await response.json();
      tasks = data;
      renderTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const renderTasks = () => {
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task-item";
      taskElement.innerHTML = `
        <div>
          <p class="task-id">Task</p>
          <p class="task-title">${task.task}</p>
        </div>
        <div>
          <p class="task-id">Priority</p>
          <p class="task-priority text-${getPriorityClass(task.priority)}">${task.priority}</p>
        </div>
        <span class="badge badge-secondary">${task.status}</span>
        <div class="circle-container">
          <p class="circle"></p>
        </div>
        <span class="task-actions">
          <button class="btn text-lg text-primary btn-sm m-3 edit-task" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn text-danger btn-sm delete-task" data-index="${index}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </span>
      `;
      tasksContainer.appendChild(taskElement);
    });

    document.querySelectorAll(".edit-task").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        editTask(index);
      });
    });

    document.querySelectorAll(".delete-task").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        deleteTask(index);
      });
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const addTask = (task) => {
    tasks.push(task);
    renderTasks();
  };

  const editTask = (index) => {
    const task = tasks[index];
    taskInput.value = task.task;
    selectedPriority = task.priority;
    document.querySelectorAll('.priority-btn').forEach(button => {
      if (button.getAttribute('data-priority') === task.priority) {
        button.classList.add(`selected-${task.priority.toLowerCase()}`);
      } else {
        button.classList.remove(`selected-${button.getAttribute('data-priority').toLowerCase()}`);
      }
    });
    addTaskFormContainer.style.display = "block";

    addTaskForm.onsubmit = (event) => {
      event.preventDefault();
      const updatedTask = taskInput.value.trim();

      if (!updatedTask) {
        taskInput.classList.add("is-invalid");
        return;
      } else {
        taskInput.classList.remove("is-invalid");
      }

      if (!selectedPriority) {
        alert("Please select a priority.");
        return;
      }

      tasks[index] = {
        task: updatedTask,
        priority: selectedPriority,
        status: task.status,
      };

      renderTasks();
      addTaskFormContainer.style.display = "none";
      taskInput.value = "";
      selectedPriority = null;
      document.querySelectorAll('.priority-btn').forEach(button => {
        button.classList.remove('selected-high', 'selected-medium', 'selected-low');
      });
    };
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = taskInput.value.trim();

    if (!task) {
      taskInput.classList.add("is-invalid");
      return;
    } else {
      taskInput.classList.remove("is-invalid");
    }

    if (!selectedPriority) {
      alert("Please select a priority.");
      return;
    }

    const newTask = {
      task,
      priority: selectedPriority,
      status: "To Do",
    };

    addTask(newTask);
    taskInput.value = "";
    selectedPriority = null;
    document.querySelectorAll('.priority-btn').forEach(button => {
      button.classList.remove('selected-high', 'selected-medium', 'selected-low');
    });
    addTaskFormContainer.style.display = "none";
  });

  showAddTaskFormButton.addEventListener("click", () => {
    addTaskFormContainer.style.display = "block";
  });

  fetchTasks();

  const priorityButtons = document.querySelectorAll('.priority-btn');
  priorityButtons.forEach(button => {
    button.addEventListener('click', () => {
      priorityButtons.forEach(btn => {
        btn.classList.remove('selected-high', 'selected-medium', 'selected-low');
      });

      const priority = button.getAttribute('data-priority');
      selectedPriority = priority;
      if (priority === 'High') {
        button.classList.add('selected-high');
      } else if (priority === 'Medium') {
        button.classList.add('selected-medium');
      } else if (priority === 'Low') {
        button.classList.add('selected-low');
      }
    });
  });
});
