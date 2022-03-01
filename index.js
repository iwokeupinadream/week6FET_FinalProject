class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

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

let lists = []
let listId = 0

onClick('new-list', () => {
    lists.push(new List(listId++, getValue('new-list-name')))
    drawDOM()
})

function onClick(id, action) {
    let element = document.getElementById(id)
    element.addEventListener('click', action)
    return element
}

function getValue(id) {
    return document.getElementById(id).value
}

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

function createItemRow(list, table, item) {
    let row = table.insertRow(2)
    row.insertCell(0).innerHTML = item.name
    row.insertCell(1).innerHTML = item.amount
    let actions = row.insertCell(2)
    actions.appendChild(createDeleteRowButton(list, item))
}

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

function createNewItemButton(list) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary'
    btn.innerHTML = 'Create'
    btn.onclick = () => {
        list.items.push(new Item(getValue(`name-input-${list.id}`), getValue(`amount-input-${list.id}`) ))
        drawDOM()
    }
    return btn
}

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

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}