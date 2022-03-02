//item class
class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

//list class
class List {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.items = []
    }

    addItem(item) {
        this.items.push(item)
    }

    deleteItem(item) {
        let index = this.items.indexOf(item)
        this.items.splice(index, 1)
    }
}

//lists array is to keep all of the created lists inside of
//listId to keep track of the lists that have been created
let lists = []
let listId = 0

//for clicking the create button on list creation
onClick('new-list', () => {
    //first checks to see if the input is an empty string
    //if it is an empty string, it will not run the rest of the code
    if(document.getElementById('new-list-name').value !== '') {
        lists.push(new List(listId++, getValue('new-list-name')))
        drawDOM()
        //clears the input after input has been submited
        document.getElementById('new-list-name').value = ''
    }
})

//onClick function used adding an event listener
//also used to execute funtion on whatever id is passed in
//not to be confused with onclick all lowercase
function onClick(id, action) {
    let element = document.getElementById(id)
    element.addEventListener('click', action)
    return element
}

//getValue used to return the vakye of an element
function getValue(id) {
    return document.getElementById(id).value
}

//used to draw and redraw the dom after clearing elements
function drawDOM() {
    let listDiv = document.getElementById('lists')
    clearElement(listDiv)
    for(list of lists) {
        let table = createListTable(list)
        let title = document.createElement('h2')
        title.innerHTML = list.name
        title.appendChild(createDeleteListButton(list))
        listDiv.appendChild(title)
        listDiv.appendChild(table)
        for(item of list.items) {
            createItemRow(list, table, item )
        }
    }
}

//used to create item row
function createItemRow(list, table, item) {
    let row = table.insertRow(2)
    row.insertCell(0).innerHTML = item.name
    row.insertCell(1).innerHTML = item.amount
    let actions = row.insertCell(2)
    actions.appendChild(createDeleteRowButton(list, item))
}

//used to create a delete button on a created row
function createDeleteRowButton(list, item) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary'
    btn.innerHTML = 'Delete'
    btn.onclick = () => {
        let index = list.items.indexOf(item)
        list.items.splice(index, 1)
        drawDOM()
    }
    return btn
}

//used to create delete list button on each list
function createDeleteListButton(list) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary'
    btn.innerHTML = 'Delete List'
    btn.onclick = () => {
        let index = lists.indexOf(list)
        lists.splice(index, 1)
        drawDOM()
    }
    return btn
}

//used to create a new item button on each created list
//as well as what to do when the button created has been clicked
function createNewItemButton(list) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary'
    btn.innerHTML = 'Add New Item'
    btn.onclick = () => {
        list.items.push(new Item(getValue(`name-input-${list.id}`), getValue(`amount-input-${list.id}`) ))
        drawDOM()
    }
    return btn
}

//used to create the table from the created list
function createListTable(list) {
    //create table element named table
    let table = document.createElement('table')
    //sets table atributes to table that was created
    table.setAttribute('classs', 'table table-striped')
    //row variable will insert a row on our table variable that we created
    //the table variable when called will create a table element as seen above
    let row = table.insertRow(0)
    //nameColumn will eventually create a table heading element for the item row
    let nameColumn = document.createElement('th')
    //amount column will eventually a table heading for our quanity or amount row
    let amountColumn = document.createElement('th')
    //giving names/innerHTML to our created table headings
    nameColumn.innerHTML = 'Item'
    amountColumn.innerHTML = 'Quantity'
    //calling row to create a table and apending our table headers
    row.appendChild(nameColumn)
    row.appendChild(amountColumn)
    let formRow = table.insertRow(1)
    let nameTh = document.createElement('th')
    let amountTh = document.createElement('th')
    let createTh = document.createElement('th')
    //createing a input element with the type of text to be able to add an item to the list
    let nameInput = document.createElement('input')
    nameInput.setAttribute('id', `name-input-${list.id}`)
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('class', 'form-control')
    //creating an input element with the type of text to be able to add item quanity/ amount to list
    let amountInput = document.createElement('input')
    amountInput.setAttribute('id', `amount-input-${list.id}`)
    amountInput.setAttribute('type', 'text')
    amountInput.setAttribute('class', 'form-control')
    //adds new item button from createNewItemButton function
    let newItemButton = createNewItemButton(list)
    //appending table headers and table data
    nameTh.appendChild(nameInput)
    amountTh.appendChild(amountInput)
    createTh.appendChild(newItemButton)
    formRow.appendChild(nameTh)
    formRow.appendChild(amountTh)
    formRow.appendChild(createTh)
    return table
}

//used to clear elements in the drawDOM function to re-draw the DOM
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}


//allows for the user to press enter for the input on creating shopping lists
//(not for adding items to list or quanitity)
//checks to see if list name is empty before adding to lists. 
//if the input is empty it wont be added
document.getElementById('new-list-name')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter' && document.getElementById('new-list-name').value !== '')
        {
            event.preventDefault();
            lists.push(new List(listId++, getValue('new-list-name')))
            drawDOM()
            //clears the input after input has been submited
            document.getElementById('new-list-name').value = ''
        }
    })


//features and ideas to still work on
//bootstrap styling/css to make it look nice
//add a way to update values in some way without deleting them since create read update and delete app
//pressing enter to sumbit the item name and amount
//when submitting item name or amount, dont let it accept an empty string
//make it so that amount can not accept anything except numbers possibly? maybe not
//create an example list using javaScript that shows up on loading the page to show as an example of a list possibly? maybe not
//final bootstrap/css styling unless is already flawless by then