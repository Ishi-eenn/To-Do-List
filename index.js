const form  = document.getElementById("form")
const input = document.getElementById("input")
const ul = document.getElementById("ul")

const todos = JSON.parse(localStorage.getItem("todos"))

if(todos.length > 0){
  todos.forEach(todo =>{
    add(todo);
  })
}

form.addEventListener("submit", function(event){
  event.preventDefault()
  console.log(input.value)
  add()
})

function add(todo){
  let to_do_text = input.value

  if(todo)
    to_do_text = todo.text

  if(to_do_text){
    const li = document.createElement("li")
    li.innerText = to_do_text
    li.classList.add("list-group-item")

    if(todo && todo.completed){
      li.classList.add("text-decoration-line-through")
    }

    li.addEventListener("contextmenu", function(event){
      event.preventDefault()
      li.remove()
      saveData()
    })

    li.addEventListener("click", function(){
      li.classList.toggle("text-decoration-line-through");
      saveData()
    })
    ul.appendChild(li)
    input.value = ""
    saveData()
  }
}

function saveData(){
  const lists = document.querySelectorAll("li")
  let to_dos = []

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    }
    to_dos.push(todo)
  });
  localStorage.setItem("todos", JSON.stringify(to_dos))
}