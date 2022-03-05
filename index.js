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

//lists array to store created, updated, and deleted lists
//list id to keep track of created lists by an id
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
    drawDOM()
})

//Attempting to prevent the pressing of enter in the textbox


//allows for the user to press enter for the input on creating shopping lists
//(not for adding items to list or quanitity)
//checks to see if list name is empty before adding to lists. 
//if the input is empty it wont be added
document.getElementById('new-list-name')
    .addEventListener('keyup', function (event) {
        if (event.code === 'Enter' && document.getElementById('new-list-name').value !== '') {
            event.preventDefault();
            lists.push(new List(listId++, document.getElementById('new-list-name').value))

            //clears the input after input has been submited
            document.getElementById('new-list-name').value = ''
            
            drawDOM()
        }
    })

//function for updating the dom after user creates, or deletes
function drawDOM() {
    let listDiv = document.getElementById('lists')
    clearElement(listDiv)
    renderLists(lists)
    console.log(lists)
} 

//used to clear elements in the drawDOM function to re-draw the DOM
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

//function used to render the list title and table with table items
function renderLists(listArray) {
    for(let i = 0; i < listArray.length; i++) {
        let listDiv = document.getElementById('lists')
        let card = createListCard(listArray[i])
        listDiv.insertBefore(card, listDiv.firstChild)
        let table = createListTable(listArray[i])
        card.appendChild(table)
        for(let x = 0; x < listArray[i].items.length; x++) {
            createItemRow(listArray[i], table, listArray[i].items[x])
        }
    }
}

//creates a delete button for deleting a list
function createDeleteListButton(list) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary mr-1'
    btn.innerHTML = 'Delete List'
    btn.onclick = () => {
        let index = lists.indexOf(list)
        lists.splice(index, 1)
        drawDOM()
    }
    return btn
}  a

//creates a html card with a "delete list" button attached to it
function createListCard(list) {
    let card = document.createElement('table')
    let listTitle = document.createElement('h3') 
    listTitle.textContent = list.name + " ";
    listTitle.append(createDeleteListButton(list)) 
    card.appendChild(listTitle)
    
    return card
}

//creates a table for a list that is passed into it
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
        let newItemButtonTd = document.createElement('td')
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
        newItemButtonTd.appendChild(newItemButton)
        
        formRow.appendChild(itemTd)
        formRow.appendChild(amountTd)
        formRow.appendChild(newItemButtonTd)

        return table
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



//used for testing
//drawDOM()





//features and ideas to still work on
//bootstrap styling/css to make it look nice
//add a way to update the list without deleting it (optional. assigment says update or delete)
//pressing enter to sumbit the item name and amount
//when submitting item name or amount, dont let it accept an empty string
//make it so that amount can not accept anything except numbers possibly? maybe not
//create an example list using javaScript that shows up on loading the page to show as an example of a list possibly? maybe not
//final bootstrap/css styling unless is already flawless by then


//index.html return keyword underlined in red... without this statment and without return keyword the page will refresh upon hitting enter 
//(issue related to it being a form from what i understand)
//still works as intended but is showing that it is an issue. probably safe to ignore if cant find solution


 