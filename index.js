const tasks = document.querySelector(".tasks");
const addTask = document.querySelector(".add");
const clear = document.querySelector(".clear");
const message = document.querySelector(".message span");
const search = document.querySelector(".search");

function updateMessage(){
    count = tasks.children.length;
    message.innerText = `You have ${count} pending tasks.`
}

addTask.addEventListener("submit", event => {
    event.preventDefault();
    const task = addTask.task.value.trim();

    if(task.length){
        tasks.innerHTML += `<li>
                                <span>${task}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`
        addTask.reset();
        updateMessage();
    }
});

tasks.addEventListener("click", event => {
    if (event.target.className.includes("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
});

clear.addEventListener("click", event => {
    const allTasks = document.querySelectorAll("li");
    allTasks.forEach(item =>{
        item.remove();
    }) 
    updateMessage();
});

function filterTask(term){
    Array.from(tasks.children)
    .filter(task =>{
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task =>{
        task.classList.add("hide");
    });
    
    Array.from(tasks.children)
    .filter(task =>{
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task =>{
        task.classList.remove("hide");
    });
}

search.addEventListener("keyup", event =>{
    const term = search.task.value.trim().toLowerCase();
    filterTask(term);
});

search.addEventListener("click", event =>{
    if(event.target.classList.contains("reset")){
        search.reset();
    }
    const term = search.task.value.trim().toLowerCase();
    filterTask(term);
});