//list class
class List {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.items = []
    }
}

//item class
class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

//array to store entites created
//listId to give each list a unique id to later be used
let lists = []
let listId = 0

//grabbing button from html and making it a variable
let newListButton = document.getElementById('new-list-button')

//adding event listener onto variable and giving an arrow function on click event
newListButton.addEventListener('click', () => {
    let newListName = document.getElementById('new-list-name').value
    listId++
    lists.push(new List(listId, newListName))
    document.getElementById('new-list-name').value = ''
    console.log(lists)
    drawDOM()
})

//allows for the user to press enter for the input on creating shopping lists
//(not for adding items to list or quanitity)
//checks to see if list name is empty before adding to lists. 
//if the input is empty it wont be added
document.getElementById('new-list-name')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter' && document.getElementById('new-list-name').value !== '')
        {
            event.preventDefault();
            lists.push(new List(listId++, document.getElementById('new-list-name').value))
            
            //clears the input after input has been submited
            document.getElementById('new-list-name').value = ''
            console.log(lists)
            drawDOM()
        }
    })

//1/2 of the draw dom function
function drawDOM() {
    let listDiv = document.getElementById('lists')
    clearElement(listDiv)
    createListTitle(lists)
}

//used to clear elements in the drawDOM function to re-draw the DOM
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

//second half of the draw dom function although name doesnt reflect. probably change later
function createListTitle(list) {
    
    for(list of lists) {
        let listDiv = document.getElementById('lists')
        let listTitle = document.createElement('h2')
        listTitle.textContent = list.name
        listDiv.insertBefore(listTitle, listDiv.firstChild)
        listTitle.append(createDeleteListButton(list))  
        let table = createListTable(list)
        listTitle.appendChild(table)
        for(item of list.items) {
            createItemRow(list, table, item )
        }
        
    }
}

//create a table out of the list
//probably should clean up later somehow
function createListTable(list) {
    
        let table = document.createElement('table')
        table.setAttribute('classs', 'table table-striped')
        let row = table.insertRow(0)
        let itemColumn = document.createElement('th')
        let amountColumn = document.createElement('th')
        itemColumn.innerHTML = 'Item'
        amountColumn.innerHTML = 'Quantity'
        row.appendChild(itemColumn)
        row.appendChild(amountColumn)
        let formRow = table.insertRow(1)
        let itemTd = document.createElement('td')
        let amountTd = document.createElement('td')
        let createTd = document.createElement('td')
        let itemNameInput = document.createElement('input')
        itemNameInput.setAttribute('id', `item-name-input-${list.id}`)
        itemNameInput.setAttribute('type', 'text')
        itemNameInput.setAttribute('class', 'form-control')
        let amountInput = document.createElement('input')
        amountInput.setAttribute('id', `amount-input-${list.id}`)
        amountInput.setAttribute('type', 'text')
        amountInput.setAttribute('class', 'form-control')
        let newItemButton = createNewItemButton(list)
        
        itemTd.appendChild(itemNameInput)
        amountTd.appendChild(amountInput)
        createTd.appendChild(newItemButton)
        
        formRow.appendChild(itemTd)
        formRow.appendChild(amountTd)
        formRow.appendChild(createTd)
        return table
}

//create delete list button when a list is created
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
        
        list.items.push(new Item(document.getElementById(`item-name-input-${list.id}`).value, document.getElementById(`amount-input-${list.id}`).value ))
        drawDOM()
    }
    return btn
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

drawDOM()


//features and ideas to still work on
//bootstrap styling/css to make it look nice
//add a way to update the list without deleting it (optional. assigment says update or delete)
//pressing enter to sumbit the item name and amount
//when submitting item name or amount, dont let it accept an empty string
//make it so that amount can not accept anything except numbers possibly? maybe not
//create an example list using javaScript that shows up on loading the page to show as an example of a list possibly? maybe not
//final bootstrap/css styling unless is already flawless by then
//sometimes undefined gets returned in the console when manually logging lists after bug testing.. doesnt seem to cause any issues but still probably not something intended