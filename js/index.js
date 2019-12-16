const monsterContainer = document.querySelector('#monster-container');
const formContainer = document.getElementById('create-monster');
const form = document.createElement('form');
form.innerHTML = `
Name: <input type="text" name="name">
Age: <input type="number" name="age">
Description: <input type="text" name="description">
<input type="submit" value="Create Monster">
<hr>`;
formContainer.append(form);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = e.target.name.value;
    let age = e.target.age.value;
    let description = e.target.description.value;
    let monsterObj = {name: name, age: age, description: description}
    postMonsters(monsterObj);
})

function postMonsters(monsterObj) {
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({monsterObj})
    })
    .then(function (response) { return response.json();})
    .then(function(monster) {
        createMonsterDOM(monster)
    })
} 

function fetchMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(resp => resp.json())
    .then(monster => monster.forEach(function (monster) { createMonsterDOM(monster)}))
}

fetchMonsters();
function createMonsterDOM(monster) {
    debugger;
    let ul = document.createElement(`ul`);
    ul.innerHTML = `
    Name: ${monster.name}<br>
    Age: ${monster.age}<br>
    Description: ${monster.description}
    <hr>`
    monsterContainer.append(ul);
}
