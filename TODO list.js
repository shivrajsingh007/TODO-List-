let taskInput=document.getElementById("taskInput")
let addBtn=document.getElementById("addBtn")
let taskList=document.getElementById("taskList")
let priority=document.getElementById("priority")
let dueDate=document.getElementById("dueDate")
let search=document.getElementById("search")

let progressText=document.getElementById("progressText")
let progressFill=document.getElementById("progressFill")

const themeToggle = document.getElementById("themeToggle");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

renderTasks()

addBtn.onclick=function(){

if(taskInput.value==="")return

let task={
text:taskInput.value,
priority:priority.value,
date:dueDate.value,
completed:false
}

tasks.push(task)

saveTasks()
renderTasks()

taskInput.value=""

}

function renderTasks(){

taskList.innerHTML=""

tasks.forEach((task,index)=>{

let li=document.createElement("li")

li.draggable=true

if(task.completed)li.classList.add("completed")

li.innerHTML=`

<div>
<strong>${task.text}</strong>
<br>
<span class="${task.priority}">
${task.priority} | ${task.date}
</span>
</div>

<div class="task-buttons">

<button class="done">✔</button>
<button class="edit">✏</button>
<button class="delete">❌</button>

</div>
`

let done=li.querySelector(".done")
let del=li.querySelector(".delete")
let edit=li.querySelector(".edit")

done.onclick=()=>{

tasks[index].completed=!tasks[index].completed

if(tasks[index].completed){

confetti()

}

saveTasks()
renderTasks()

}

del.onclick=()=>{

tasks.splice(index,1)

saveTasks()
renderTasks()

}

edit.onclick=()=>{

let newTask=prompt("Edit task",task.text)

if(newTask){

tasks[index].text=newTask

saveTasks()
renderTasks()

}

}

taskList.appendChild(li)

})

updateStats()

}

function updateStats(){

let completed=tasks.filter(t=>t.completed).length
let total=tasks.length

document.getElementById("totalTasks").innerText=total
document.getElementById("completedTasks").innerText=completed
document.getElementById("pendingTasks").innerText=total-completed

progressText.innerText=`${completed} / ${total} Completed`

let percent=total===0?0:(completed/total)*100

progressFill.style.width=percent+"%"

}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

search.onkeyup=function(){

let value=search.value.toLowerCase()

document.querySelectorAll("li").forEach(task=>{

task.style.display=
task.innerText.toLowerCase().includes(value)
? "flex"
: "none"

})

}



themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

themeToggle.textContent = "☀️";
themeToggle.style.background = "#333";
themeToggle.style.color = "white";

}else{

themeToggle.textContent = "🌙";
themeToggle.style.background = "#00ffff";
themeToggle.style.color = "black";

}

});

/* confetti */

function confetti(){

for(let i=0;i<15;i++){

let conf=document.createElement("div")

conf.style.position="fixed"
conf.style.width="8px"
conf.style.height="8px"
conf.style.background="cyan"

conf.style.left=Math.random()*100+"%"
conf.style.top="0"

document.body.appendChild(conf)

let fall=setInterval(()=>{

conf.style.top=parseInt(conf.style.top)+5+"px"

if(parseInt(conf.style.top)>window.innerHeight){

clearInterval(fall)
conf.remove()

}

},20)

}

}