var input = document.querySelector("input")
var buttonAdd = document.querySelector("#add")
var todoList = document.querySelector(".todoList")

// Add element li when click button add
function addTodos(button, list, input) {
    button.addEventListener("click", function(){
        if(input.value) {
            createData(input.value,false,list)
            input.value = ""
            executeTodos(list)
            saveData()
        } else {
            alert("Vui lòng nhập dữ liệu trước khi thêm!")
        }
    })
}

// Complete element li when click button completed
function completedTodos(button, tag) {
    button.addEventListener("click",function(){
        tag.classList.toggle("completed")
        saveData()
    })
}

// Edit element li when click button edit
function editTodos(button, tag) {
    button.addEventListener("click", function(){
        var editValue = prompt("Nhập nội dung cần sửa: ")
        if(editValue) {
            tag.querySelector("span").textContent = editValue
            alert("Đã sửa thành công!")
        } else {
            alert("Dữ liệu trống! Không thể sửa dữ liệu")
        }
        saveData()
    })
}

// Delete element li when click button delete
function deleteTodos(button, tag){
    button.addEventListener("click", function(){
        var isAccept = confirm("Bạn có chắc chắn muốn xóa bản ghi chứ này ?")
        if(isAccept) {
            tag.remove()
            deleteData()
            saveData()
            alert("Xóa thành công!")
        }
    })
}

// Execute button after adding element to todo list
function executeTodos(list) {
    var listLi = list.querySelectorAll("li")
    listLi.forEach(function(item) {
        var listButton = item.querySelectorAll("i")
        completedTodos(listButton[0], item)
        editTodos(listButton[1], item)
        deleteTodos(listButton[2], item)
        saveData()
    })
}

// Save data from todoList to cookie of website with name=value which is taken from li
function saveData() {
    var listLi = document.querySelectorAll("li")
    var id = 1
    listLi.forEach(function(item){
        document.cookie = `${id}=${item.querySelector("span").textContent},${item.classList.contains("completed")}`
        id++;
        // setTimeout(function(){
        //     document.cookie = `${--id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
        // },10000)
    })
}

// Delete data from cookie
function deleteData() {
    var data = document.cookie.split("; ")
    data.forEach(function(item){
        var id = item.split(("="))
        document.cookie = `${id[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
    })
}

// Create element li by name - value and append to todo list
function createData(text, isCompleted, list) {
    var li = document.createElement("li")
    if(JSON.parse(isCompleted)) 
        li.setAttribute("class","completed")
    li.innerHTML = 
    `
        <span> ${text} </span>
        <div class="todoList_button">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-pen"></i>
            <i class="fa-regular fa-trash-can"></i>
        </div>
    `
    list.appendChild(li)
}

// Take data from cookie
function takeData(list) {
    var data = document.cookie
    console.log(data);
    if(data){
        var listObj = []
        var arrData = data.split("; ")

        // iterates and creates an array of objects
        arrData.forEach(function(item){
            var obj = {}
            var arrItem = item.split("=")
            obj.id = arrItem[0]
            var content = arrItem[1]
            obj.text = content.substring(0, content.lastIndexOf(","))
            obj.isCompleted = content.substring(content.lastIndexOf(",")+1)
            listObj.push(obj)
        })

        // sort array of object by id
        listObj.sort(function(firstItem, secondItem){
            return firstItem.id - secondItem.id
        })

        listObj.forEach(function(item){
            createData(item.text.trim(), item.isCompleted.trim(), list)
        })

        executeTodos(list)
    }
}

// Execute program
function executeProgram(button, list, input) {
    takeData(list)
    addTodos(button,list,input)
}

executeProgram(buttonAdd, todoList, input)