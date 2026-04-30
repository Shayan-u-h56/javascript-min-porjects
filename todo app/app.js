
let udata = document.getElementById('userdata')
let parentdiv = document.getElementById('container')
let btn = document.getElementById('button')
let edit = false
let currentast = null;
let safetask = JSON.parse(localStorage.getItem('data')) || []

// ui load refresh 
function ui() {
    parentdiv.innerHTML = ""
    safetask.forEach((data, index) => {
        let task = document.createElement('div')
        task.classList.add('task1')

        task.innerHTML = `
        <h3 class="${data.done ? 'complete' : ''}">${data.text}</h3>
        <div class="btn">
        <input type="checkbox" class="checked" ${data.done ? 'checked' : ''} data-index="${index}">
                <button class="bttn" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
                <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
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
        let index = safetask.findIndex(item => item.text === oldvalue)
        safetask[index].text = input;
        edit = false;
          btn.innerText="ADD"
        currentast = null;


    } else {
        safetask.push({
            text: input,
            done: false

        })
    }

    let value = JSON.stringify(safetask)     // ye array ko string me comvert karne ke liye //
    localStorage.setItem("data", value)  //data localstorage me safe karna hai//
    udata.value = ""
    ui()

})

//checkbox logic

document.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        let index = e.target.dataset.index
        safetask[index].done = !safetask[index].done
        localStorage.setItem('data', JSON.stringify(safetask))
        ui()
    }

})
//DELETE logic//
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('bttn')) {
        let index = e.target.dataset.index
        safetask.splice(index, 1)
        // let removeresxt = e.target.parentElement.previousElementSibling.innerText;
        // safetask = safetask.filter(t => t !== removeresxt)
        localStorage.setItem('data', JSON.stringify(safetask))
        // e.target.parentElement.parentElement.remove()
        ui()
    }

})

//Edit logic//
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        let task = e.target.parentElement.parentElement;
        currentast = task;
        udata.value = currentast.querySelector("h3").innerText;
        edit = true;
        btn.innerText="EDIT"
    }

});


