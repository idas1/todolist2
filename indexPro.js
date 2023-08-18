var todos = []

// Create element li - todo 
function createTodo(tag, id, value, condition) {
    tag.innerHTML += 
        `   <li id="${id}">
                <span> ${value} </span>
                <div class="todoList_button">
                    <i onclick="completedTodo(${id})" class="fa-solid fa-check"></i>
                    <i onclick="editTodo(${id})" class="fa-solid fa-pen"></i>
                    <i onclick="deleteTodo(${id})" class="fa-regular fa-trash-can"></i>
                </div>
            </li>     
        `
    if(condition) {
        document.getElementById(`${id}`).setAttribute("class","completed")
    }
}

// Add element li into list todo and add object element into todos
function addTodo() {
    var ul = document.querySelector(".todoList")
    var input = document.querySelector("input")
    if(!ul.querySelector("li")) {
        ul.innerHTML = ""
    }
    var idTodo = new Date().getTime()
    if(input.value) {
        var todo = {
            id: idTodo,
            value: input.value,
            condition: false,
        }
        todos.push(todo)
        createTodo(ul, todo.id, todo.value, todo.condition)
        saveData(document.getElementById(`${todo.id}`), todo)
        input.value = ""
        console.log(todos);
    } else {
        alert("Vui lòng nhập dữ liệu trước khi thêm vào!")
    }
}

// Change condition of object to true if li has completed class
function completedTodo(id) {
    var li = document.getElementById(`${id}`)
    li.classList.toggle("completed")
    var index = todos.findIndex(function(item){
        return item.id == id
    })
    if(li.classList.contains("completed")) 
        todos[index].condition = true
    else 
        todos[index].condition = false
    console.log(todos);
    saveData(li, todos[index])
}

// Update graphic and cookie after editing
function editTodo(id) {
    var text = prompt("Nhập dữ liệu mới: ")
    if(text) {
        var li = document.getElementById(`${id}`)
        li.querySelector("span").textContent = text
        var index = todos.findIndex(function(item){
            return item.id == id
        })
        todos[index].value = text
        saveData(li, todos[index])
    }
    else
        alert("Vui lòng nhập dữ liệu trước khi sửa!")
}

// Delete item of cookie, graphic and list todos
function deleteTodo(id) {
    console.log(id);
    var accept = confirm("Chắc chắn muốn xóa dữ liệu ?")
    if(accept) {
        var index = todos.findIndex(function(item){
            return item.id == id
        })
        document.cookie=`${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
        todos.splice(index,1)

        var ul = document.querySelector(".todoList")
        ul.innerHTML = ""
        if(todos.length) {
            todos.forEach(function(item) {
                createTodo(ul, item.id, item.value, item.condition)
            })
            
        } else {
            ul.innerHTML = "Nothing to see here"
        }
    }
}

// Save data to cookie
function saveData(tag, obj) {
    if(tag.classList.contains("completed"))
        obj.condition = true
    document.cookie=`${obj.id}=${obj.value},${obj.condition}`
}

// Take data from cookie from refresh page
function takeData() {
    var data = document.cookie
    var ul = document.querySelector(".todoList")
    if(data) {
        var dataContent = data.split("; ")
        dataContent.forEach(function(item){
            var content = item.split("=")
            var id = content[0]
            var value = content[1].substring(0, content[1].lastIndexOf(","))
            var condition = content[1].substring(content[1].lastIndexOf(",")+1)

            todos.unshift({id: Number(id),value,condition: JSON.parse(condition)})
        })

        todos.sort(function(item1, item2) {
            return item1.id - item2.id;
        })

        todos.forEach(function(item) {
            createTodo(ul, item.id, item.value, item.condition)
        })
        console.log(todos);
    } else 
        ul.innerHTML = "Nothing to see here"
}

takeData()

