//Get The Saved Todos from LS
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    }else{
        return []
    }
}

//Render Application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = filterTodos(todos, filters)
    const incompleteTodos = getIncompleteTodo(filteredTodos)
    const clrInput = clearInput()
    const generateSummary = generateSummaryDOM(incompleteTodos)
    const filterTodoList = filteredTodoList(filteredTodos);
}

//Get Filtered Todos
function filterTodos(todos, filters) {
    return todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    });
}

//Get Incompleted Todos
function getIncompleteTodo(filteredTodos) {
    return filteredTodos.filter(function (todo) {
        return !todo.completed;
    });
}

//Clear the Input after every input press until todo is filtering is done
function clearInput() {
    document.querySelector('#todos').innerHTML = ''
}

//Get the DOM elements for list summary
function generateSummaryDOM(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

}

//Filtered Todo List and generate p for every element
function filteredTodoList(filteredTodos) {
    filteredTodos.forEach(function (todo) {
        generateTodoDOM(todo);
    });
}

//Generate DOM elements for an individual note
function generateTodoDOM(todo) {
    const todoEl = document.createElement('div'),
          checkBox = document.createElement('input')
          checkBox.setAttribute('type', 'checkbox')
          addEl = document.createElement('span')
          addEl.textContent = todo.text
        deleteTodo = document.createElement('button')
        deleteTodo.textContent = 'X'
         

    todoEl.appendChild(checkBox) 
    todoEl.appendChild(addEl) 
    todoEl.appendChild(deleteTodo) 
   
    document.querySelector('#todos').appendChild(todoEl)
}

// set the used i/p value to filter
function setFilter(e) {
    filters.searchText = e.target.value;
}

//Push user Entered todos to the main todos array
function pushUserTodos(e) {
    todos.push({
        text: e.target.elements.text.value,
        completed: false
    });
}

//Save todos to Local Storage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Clear user Input After adding values(Todos)
function clearUserInput(e) {
    e.target.elements.text.value = '';
}

//Hide the uncompleted(false) todos when the checkBox is checked
function checkBoxChecked(e) {
    filters.hideCompleted = e.target.checked;
}