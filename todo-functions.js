//Get The Saved Todos from LS
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
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

//Remove the Todo from DOM
function removeTodo(id){
 const todoIndex = todos.findIndex(function(todo){  //find the Index of the Todo that clicked
    return todo.id === id 
 })
 if(todoIndex > -1){ //if id matched remove it
     todos.splice(todoIndex, 1)
 }
}
  //ToggleTodo the when checked/not checked
  function toggleTodo(id){
    const todoObj = todos.find(function(todo){ //Find that exact todo which is checked by passing the unique id
        return todo.id === id //checking the id
    })
  
    if(todoObj != undefined){ //check weather Invalid todo is passed
        todo.completed = !todo.completed //toggle logic.. 
    }
}
//Generate DOM elements for an individual note
function generateTodoDOM(todo) {
    //create a div separately
    const todoEl = document.createElement('div'),
    //Create a checkBox 
    checkBox = document.createElement('input')
    checkBox.checked = todo.completed // check box should be checked when todo is completed
    checkBox.setAttribute('type', 'checkbox')

    //Event Listener for the checkBox
    checkBox.addEventListener('change', function(){
        toggleTodo(todo.id)
        saveTodos(todos) ///save it to the LS
        renderTodos(todos, filters) //Render the whole todos array again
        })
    //Create a span with the todo Title      
    addEl = document.createElement('span')
    addEl.textContent = todo.text
    //Create a X button      
    deleteTodo = document.createElement('button')
    deleteTodo.textContent = 'X'

    //Append everything to the Created Div
    todoEl.appendChild(checkBox)
    todoEl.appendChild(addEl)
    todoEl.appendChild(deleteTodo)

    //Add fuctionality to that delete X button
    deleteTodo.addEventListener('click', function(){
        removeTodo(todo.id) //Remove todo which is clicked
        saveTodos(todos)//Save the Todo in LS
        renderTodos(todos, filters)//Render the updates Todos
    })
    //Append new dicv to the Main todo div
    document.querySelector('#todos').appendChild(todoEl)
}

// set the used i/p value to filter
function setFilter(e) {
    filters.searchText = e.target.value;
}

//Push user Entered todos to the main todos array
function pushUserTodos(e) {
    todos.push({
        id: uuidv4(),//add the unique ID
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