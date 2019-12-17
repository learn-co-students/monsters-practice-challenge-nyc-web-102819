let monsterContainer = document.getElementById('monster-container')
let createMonsterDiv = document.getElementById('create-monster')
let forwardButton = document.getElementById('forward')
let page = 1

function getMonsters (page) {
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then (function (resp) {
            return resp.json();
        })
        .then (function (monsters) {
            monsters.forEach (function (monster) {
                let monsterUl = document.createElement('ul')
                monsterUl.innerHTML = `
                    <h1>Name: ${monster.name}</h1>
                    <h1>Age: ${monster.age}</h1>
                    <p>Description: ${monster.description}</p>
                    <hr>
                `
                monsterContainer.appendChild(monsterUl)
            })
        })
}

getMonsters();

let createMonsterForm = document.createElement('form')
createMonsterForm.innerHTML = `
    Name:<br>
    <input type="text" name="name">
    <br>
    Age:<br>
    <input type="text" name="age">
    <br>
    Description:<br>
    <input type="text" name="description">
    <br>
    <input type="submit" value="Submit">
`
createMonsterDiv.appendChild(createMonsterForm)

createMonsterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    inputName = e.target[0].value
    inputAge = e.target[1].value
    inputDesc = e.target[2].value
    createMonster(inputName, inputAge, inputDesc);
})

function createMonster (inputName, inputAge, inputDesc) {
    //first, add it to the list 
    let createdMonsterUl = document.createElement('ul')
    createdMonsterUl.innerHTML = `
    <h1>Name: ${inputName}</h1>
    <h1>Age: ${inputAge}</h1>
    <p>Description: ${inputDesc}</p>
    <hr>
    `
    monsterContainer.appendChild(createdMonsterUl)

    //then, post it to the database via a fetch post 
    fetch ('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify ({
            name: inputName,
            age: inputAge,
            description: inputDesc
        })
    })
}

forwardButton.addEventListener("click", function () {
    monsterContainer.innerHTML = ''
    ++page;
    getMonsters(page);
})



















































//solution code 

// let forwardButton = document.getElementById("forward")
// let backButton = document.getElementById("back")
// let page = 1

// let monsterContainer = document.getElementById('monster-container')

// let createMonsterDiv = document.getElementById('create-monster')
// let createMonsterBtn = document.createElement("button")
// createMonsterBtn.innerText = "CREATE MONSTER!!"
// createMonsterDiv.appendChild(createMonsterBtn)

// createMonsterBtn.addEventListener("click", function(e) {
//     let createMonsterForm = document.createElement('form')
//     createMonsterForm.innerHTML = `
//     <form>
//     Name:<br>
//     <input type="text" name="name">
//     <br>
//     Age:<br>
//     <input type="text" name="age"><br>
//     Description:<br>
//     <input type="text" name="description">
//     <br>
//     <input type="submit" value="Submit">
//     </form> 
//     `
//     createMonsterDiv.replaceChild(createMonsterForm, createMonsterBtn)
//     //Listener below for submit
//     createMonsterForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         let name = e.target.name.value
//         let age = e.target.age.value
//         let description = e.target.description.value

//         fetch ('http://localhost:3000/monsters', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//               },
//             body: JSON.stringify ({
//                 name: name,
//                 age: age,
//                 description: description
//             })
//         })
//         createMonsterDiv.replaceChild(createMonsterBtn, createMonsterForm)
//     })
// });

// let getMonsters = function () {
//     fetch (`http://localhost:3000/monsters/?_limit=3&_page=${page}`)
//     .then (function (resp) {
//         return resp.json();
//     })
//     .then (function (monsters) {
//         monsters.forEach (function (monster) {
//             let monsterUl = document.createElement("ul")
//             monsterUl.innerHTML = `
//             <h5>Name: ${monster.name}</h5>
//             <h5>Age: ${monster.age}</h5>
//             <h5>Description: ${monster.description}</h5>
//             <hr>
//             `
//             monsterContainer.appendChild(monsterUl)
//         })
//     })
// }

// getMonsters();

// forwardButton.addEventListener("click", function (e) {
//         monsterContainer.innerHTML = ''
//         ++page
//         getMonsters();
// });