let btn = document.querySelector("#addBtn");
let ul = document.querySelector("#taskList");
let inp = document.querySelector("#taskInput");

btn.addEventListener("click", function(){

    let task = inp.value.trim();

    if(task === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.innerText = task;

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");

    li.appendChild(delBtn);
    ul.appendChild(li);

    inp.value = "";

});

ul.addEventListener("click", function(event){

    if(event.target.classList.contains("delete")){
        let listItem = event.target.parentElement;
        listItem.remove();
    }

});