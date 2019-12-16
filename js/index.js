let body = document.getElementsByTagName('body')[0]
let container = document.getElementById('monster-container')
let formContainer = document.getElementById('create-monster')
let form = document.createElement('form')

form.innerHTML = `
Name: <input type="text" name="name">
Age:<input type="number" name="age">
Description:<input type="text" name="description">
<input type="submit" value="Create Monster Button">
`
formContainer.append(form)
form.addEventListener("submit", function(e) {
e.preventDefault()
// console.log(e.target.name.value)
let name = e.target.name.value
let age = e.target.age.value
let description = e.target.description.value

let monster = {name: name, age: age, description: description}
createMonster(monster)
console.log(monster)
})


function getMonsters(){
return fetch('http://localhost:3000/monsters/?_limit=50&_page=7')
.then(function(response) {
    return response.json();
})
.then(function(monster) {
    // console.log(monsters)
    //from class notes
    monster.forEach(function (monster) {
        appendMonster(monster)
    })
})
}

//creating new monster
function createMonster(monster) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(monsters) {
        appendMonster(monsters)
        })
    }

getMonsters()

function appendMonster(monster) {
    // monster.forEach(function (monster) {
    let ul = document.createElement('ul')
    ul.innerHTML = `
   <p> Name: ${monster.name} </p>
   <p> Age: ${monster.age} </p>
   <p> Description: ${monster.description} </p>
   <hr>
    `
    container.append(ul);
    // li.appendChild()
    ul.className = "monster"
    
}

// let forwardButton = document.getElementById("forward")
// forwardButton.addEventListener("click", function(e) {
//     console.log("click", e.target)

// })