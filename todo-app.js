console.log(uuidv4())
//Get the Saved todos from the LocalStorage
let todos = getSavedTodos()

//Create an empty object which serves as filter
const filters = {
    searchText: '',
    hideCompleted: false
}

//Render the Todos for the first time to show the List of todos to the user
renderTodos(todos, filters)

//Select the Search area and set the used i/p value to filter
document.querySelector('#search-text').addEventListener('input', function (e) {
    setFilter(e);// set the used i/p value to filter
    renderTodos(todos, filters);//Render Todos with Filter Updated
})

//Add New Todo Button Functionality
document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault()
    pushUserTodos(e);//Push user Entered todos to the main todos array
    saveTodos(todos);//Save todos to Local Storage
    renderTodos(todos, filters);//Render Application todos based on filters(with updated values of todos)
    clearUserInput(e);//Clear user Input After adding values(Todos)

})

//Hide the todos  when checkBox is Checked
document.querySelector('#hide-completed').addEventListener('change', function (e) {
    checkBoxChecked(e);//Hide the uncompleted(false) todos when the checkBox is checked
    renderTodos(todos, filters);//Render Application todos again based on checkBox results(with updated values of todos)
})







