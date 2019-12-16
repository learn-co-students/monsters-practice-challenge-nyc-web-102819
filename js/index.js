function getData(num){
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${num}`)
    .then(function(response){return response.json()})
    .then(function(monsters){
        monsters.forEach(function(monster){
            appendMonster(monster)
        })
    })
}
let currentPage = 1
getData(currentPage)
const monsterContainer = document.getElementById("monster-container")
function appendMonster(monster){
    const div = document.createElement("div")
    div.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${Math.round(monster.age)}</h4>
    <p>${monster.description}</h4>
    <hr>
    `
    monsterContainer.appendChild(div)
}
const formDiv = document.getElementById("create-monster")
const createForm = document.createElement("form")
createForm.innerHTML = `
  Name: <input type="text" name="Name">
  Age: <input type="text" name="Age">
  Description: <input type="text" name="Description">
  <input type="submit" value="Submit">
`
formDiv.appendChild(createForm)
createForm.addEventListener("submit", function (e){
    e.preventDefault()
  console.log("target:", e.target)
    let monster = {
        "name": createForm.querySelectorAll("input")[0].value,
        "age": createForm.querySelectorAll("input")[1].value,
        "description": createForm.querySelectorAll("input")[2].value
    }
    appendMonster(monster)
    console.log(monster)
    function postMonster(monster) { 
        fetch("http://localhost:3000/monsters/",{
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(monster)
        })
    }
    postMonster(monster)
    createForm.reset()
})

function clearMonsters(){
    while (monsterContainer.firstChild){monsterContainer.firstChild.remove()}
}
const forward = document.getElementById("forward")
const backwards = document.getElementById("back")
document.addEventListener("click", function(e){
    if (e.target === forward){
        currentPage += 1
        clearMonsters()
        getData(currentPage)
    } else if (e.target === backwards){
        currentPage -= 1
        clearMonsters()
        getData(currentPage)
    }
})


