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


onClick('new-list', () => {
    lists.push(new List(listId++, getValue('new-list-name')))
    drawDOM()
})

//onClick function used for creating a new list
//not to be confused with onclick all lowercase
function onClick(id, action) {
    let element = document.getElementById(id)
    element.addEventListener('click', action)
    return element
}

//getValue used to return the id of a list
function getValue(id) {
    return document.getElementById(id).value
}

//used to draw and redraw the dom
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

//used to create a new item on each created list
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
    let table = document.createElement('table')
    table.setAttribute('classs', 'table table-striped')
    let row = table.insertRow(0)
    let nameColumn = document.createElement('th')
    let amountColumn = document.createElement('th')
    nameColumn.innerHTML = 'Item'
    amountColumn.innerHTML = 'Quantity'
    row.appendChild(nameColumn)
    row.appendChild(amountColumn)
    let formRow = table.insertRow(1)
    let nameTh = document.createElement('th')
    let amountTh = document.createElement('th')
    let createTh = document.createElement('th')
    let nameInput = document.createElement('input')
    nameInput.setAttribute('id', `name-input-${list.id}`)
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('class', 'form-control')
    let amountInput = document.createElement('input')
    amountInput.setAttribute('id', `amount-input-${list.id}`)
    amountInput.setAttribute('type', 'text')
    amountInput.setAttribute('class', 'form-control')
    let newItemButton = createNewItemButton(list)
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