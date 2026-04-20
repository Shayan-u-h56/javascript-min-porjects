
let udata = document.getElementById('userdata')
let parentdiv = document.getElementById('container')
let btn = document.getElementById('button')
let edit = false
let currentast = null;
btn.addEventListener("click", (e) => {
    e.preventDefault()
    let input = udata.value
    input = input.trim()
    if (input === "") {
        alert('please enter your task')
        return
    }
    if (edit) {
        currentast.querySelector("h3").innerText = input;
        edit = false;
        currentast = null;
        udata.value = "";
    } else {
        udata.value = ""
        let task = document.createElement('div')
        task.classList.add('task1')
        task.innerHTML = `
                        <h3>${input}</h3>
                        <div class="btn">
                            <button id="dbtn" class="bttn" type="submit">DELETE</button>
                            <button class="edit" type="submit"> EDIT</button>
                        </div>
                            `
        parentdiv.appendChild(task)
    }





})
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('bttn')) {
        e.target.parentElement.parentElement.remove()
    }


})


document.addEventListener("click", (e) => {

    if (e.target.classList.contains("edit")) {

        let task = e.target.parentElement.parentElement;

        currentast = task;

        udata.value = currentast.querySelector("h3").innerText;

        edit = true;
    }

});

