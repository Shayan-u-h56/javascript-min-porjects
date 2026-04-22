
let udata = document.getElementById('userdata')
let parentdiv = document.getElementById('container')
let btn = document.getElementById('button')
let edit = false
let currentast = null;
let safetask = JSON.parse(localStorage.getItem('data')) || []

// ui load refresh 
function ui() {
    parentdiv.innerHTML = ""
    safetask.forEach(data => {
        let task = document.createElement('div')
        task.classList.add('task1')

        task.innerHTML = `
            <h3>${data}</h3>
            <div class="btn">
                <button class="bttn">DELETE</button>
                <button class="edit">EDIT</button>
            </div>
        `

        parentdiv.appendChild(task)
    });
}
ui()
// task add logic
btn.addEventListener("click", (e) => {
    e.preventDefault()
    let input = udata.value
    input = input.trim()
    if (input === "") {
        alert('please enter your task')
        return
    }

    if (edit) {
        let oldvalue = currentast.querySelector("h3").innerText
        let index = safetask.indexOf(oldvalue)
        safetask[index] = input;
        edit = false;
        currentast = null;


    } else {
        safetask.push(input)
    }

    let value = JSON.stringify(safetask)     // ye array ko string me comvert karne ke liye //
    localStorage.setItem("data", value)  //data localstorage me safe karna hai//
    udata.value = ""
    ui()

})
//DELETE logic//
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('bttn')) {
        let removeresxt = e.target.parentElement.previousElementSibling.innerText;
        safetask = safetask.filter(t => t !== removeresxt)
        localStorage.setItem('data', JSON.stringify(safetask))
        e.target.parentElement.parentElement.remove()
    }

})

//Edit logic//
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        let task = e.target.parentElement.parentElement;
        currentast = task;
        udata.value = currentast.querySelector("h3").innerText;
        edit = true;
    }

});


