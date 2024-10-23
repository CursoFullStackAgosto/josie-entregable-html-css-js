const task_input = document.querySelector("#task_input");
const task_list = document.querySelector(".task_list");
const generator = idGenerator()
const actual_list = JSON.parse(localStorage.getItem('tasks') || "[]");

function addTaskWithName(name, store = true)
{

    if(store)
    {
        let storedList = JSON.parse(localStorage.getItem('tasks') || "[]");
        if(storedList.includes(name) || actual_list.includes(name)) {
            alert("Ya existe una tarea con ese nombre...")
            return
        }
        actual_list.push(name)
        storedList.push(name)
        localStorage.setItem("tasks", JSON.stringify(storedList))
    }

    let id = generator.next().value;

    let text = document.createElement("span");
    text.textContent = name;
    text.addEventListener("click", toggleTaskReady)
    text.classList.add("task_text")
    text.id = "text_element_" + id
    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() 
    {
        deleteTask(id)
    }
    let liElement = document.createElement("li");
    liElement.classList.add("task")
    liElement.id = "list_element_" + id
    liElement.appendChild(text)
    liElement.appendChild(deleteButton)
    task_list.appendChild(liElement)
}

function addTask()
{
    let value = task_input.value
    task_input.value = ""
    if(value.trim() == "") {
        alert("Error, debe ingresar una tarea antes de poder agregarla...")
        return
    }

    addTaskWithName(value)
}

function toggleTaskReady(element)
{
    let textElement = element.target;
    let ready = textElement.classList.toggle("labeled");
    textElement.parentNode.classList.toggle("parent_labeled", ready)
    if(!ready)
    {
        let storedList = JSON.parse(localStorage.getItem('tasks') || "[]");
        if(storedList.includes(textElement.textContent)) {
            return
        }
        storedList.push(textElement.textContent)
        localStorage.setItem("tasks", JSON.stringify(storedList))
    } else
    {
        let storedList = JSON.parse(localStorage.getItem('tasks') || "[]");
        const index = storedList.indexOf(textElement.textContent);
    
        // Verificar si el elemento existe en la lista
        if (index !== -1) {
          // Eliminar el elemento en la posición encontrada
          storedList.splice(index, 1);
        }
        localStorage.setItem("tasks", JSON.stringify(storedList))
    
    }
}

function deleteTask(elementId)
{
    let name = document.querySelector("#text_element_" + elementId).textContent
    document.querySelector("#list_element_" + elementId).remove()

    let storedList = JSON.parse(localStorage.getItem('tasks') || "[]");
    const index = storedList.indexOf(name);
    const actual_index = actual_list.indexOf(name);

    if (index !== -1) storedList.splice(index, 1);
    if (actual_index !== -1) actual_list.splice(index, 1);
  
    localStorage.setItem("tasks", JSON.stringify(storedList))

}

function addSavedTasks()
{
    let storedList = JSON.parse(localStorage.getItem('tasks') || "[]");
    for(let id = 0; id < storedList.length; id++)
    {
        addTaskWithName(storedList[id], false)
    }
}

function* idGenerator()
{
    i = 0;
    while(true)
    {
        i += 1
        yield i;
    }
}

addSavedTasks()