//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeAndDelete)
filterOption.addEventListener('click', filterTodo)

// FUNCTIONS
function addTodo (event) {
    event.preventDefault()
    //todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create li
    const newTodo = document.createElement('li')
    if(todoInput.value == ''){
        alert("Please Enter something.")
        return
    }
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    //save to localData
    saveLocalTodos(todoInput.value)
    //create button 
    const finishedButton = document.createElement('button')
    finishedButton.classList.add('finished-button')
    finishedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(finishedButton)
    //delete Button
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(deleteButton)
    //APPEND TO 'todo-lost'
    todoList.appendChild(todoDiv)
    //CLEAR INPUT after submitting
    todoInput.value = ''
}

function completeAndDelete(e) {
    const item = e.target;
    if(item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        todo.classList.add('slide');
        deleteTodo(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
        return
    }

    if(item.classList[0] === "finished-button"){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
        return
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncomplete":
                if(!todo.classList.contains('completed')){
                        todo.style.display = "flex"
                    } else {
                        todo.style.display = "none"
                    }
                    break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    
    //Check if todos exist in the data
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;
    
    //Check if todos exist in the data
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //Create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        
        const finishedButton = document.createElement('button')
        finishedButton.classList.add('finished-button')
        finishedButton.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(finishedButton)
        //delete Button
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(deleteButton)
        //APPEND TO 'todo-lost'
        todoList.appendChild(todoDiv)
    })
}

function deleteTodo(todo){
    let todos;
    
    //Check if todos exist in the data
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const indexOfItem = todo.children[0].innerHTML
    todos.splice(todos.indexOf(indexOfItem), 1)

    localStorage.setItem('todos', JSON.stringify(todos))
}
