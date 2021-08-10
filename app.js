//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//EVENT LISTENERS
todoButton.addEventListener('click', addTodo);

// FUNCTIONS
function addTodo (event) {
    event.preventDefault()
    //todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
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