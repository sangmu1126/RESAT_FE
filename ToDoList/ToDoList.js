let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const task = {
        id: Date.now(),
        content: taskInput.value,
        priority: prioritySelect.value,
        completed: false
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filter = document.querySelector('input[name="filter"]:checked').value;
    const filteredTasks = filter === "all" ? tasks :
                         filter === "completed" ? tasks.filter(task => task.completed) :
                         tasks.filter(task => !task.completed);

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskStatus(${task.id})">
            <span class="${task.completed ? "completed" : ""}">${task.content} - ${task.priority}</span>
            <button onclick="deleteTask(${task.id})">삭제</button>
        `;
        taskList.appendChild(li);
    });
}

renderTasks();
