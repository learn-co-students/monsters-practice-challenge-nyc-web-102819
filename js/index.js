document.addEventListener("DOMContentLoaded", function (e) {
    let forwardButton = document.querySelector("#forward")
    let newUl = document.createElement('ul')
    newUl.dataset.page = 1
    let newDiv = document.createElement('div')
    let backButton = document.querySelector("#back")
    let h1 = document.querySelector("h1")
    let newForm = document.createElement("form")
    let nameLabel = document.createElement("label")
    nameLabel.innerText = "New Monster Name: "
    let nameField = document.createElement("input")
    let ageLabel = document.createElement("label")
    ageLabel.innerText = "New Monster Age: "
    let ageField = document.createElement("input")
    let descriptionLabel = document.createElement("label")
    descriptionLabel.innerText = "New Monster Description: "
    let descriptionField = document.createElement("input")
    let submitButton = document.createElement("input")
    submitButton.setAttribute("type", "submit")
    newForm.appendChild(nameLabel)
    newForm.appendChild(nameField)
    newForm.appendChild(ageLabel)
    newForm.appendChild(ageField)
    newForm.appendChild(descriptionLabel)
    newForm.appendChild(descriptionField)
    newForm.appendChild(submitButton)
    newForm.addEventListener("submit", function (e) {
        e.preventDefault()
        let newLi = document.createElement('li')
        let nameDiv = document.createElement('div')
        let ageDiv = document.createElement('div')
        let descriptionDiv = document.createElement('div')
        let hrLine = document.createElement("HR")
        nameDiv.innerText = `Monster Name: ${newForm[0].value},`
        ageDiv.innerText = `Monster Age: ${newForm[1].value},`
        descriptionDiv.innerText = `Description ${newForm[2].value}`
        newLi.appendChild(nameDiv)
        newLi.appendChild(ageDiv)
        newLi.appendChild(descriptionDiv)
        newLi.appendChild(hrLine)
        // debugger
        newUl.replaceChild(newLi, newUl.querySelector('li'))
        fetch('http://localhost:3000/monsters/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({
                name: `${newForm[0].value}`,
                age: `${newForm[1].value}`,
                description: `${newForm[2].value}`
            })
        })
        newForm.reset()
    })
    h1.insertAdjacentElement("afterend", newForm)
    newDiv.appendChild(newUl)
    forwardButton.insertAdjacentElement('afterend', newDiv)
    

    let renderMonsters = function (pagenum) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pagenum}`).then(function (j) {return j.json()}).then(function (o) {
            o.forEach(function (monster) {
                let newLi = document.createElement('li')
                let nameDiv = document.createElement('div')
                let ageDiv = document.createElement('div')
                let descriptionDiv = document.createElement('div')
                let hrLine = document.createElement("HR")
                nameDiv.innerText = `Monster Name: ${monster.name},`
                ageDiv.innerText = `Monster Age: ${monster.age},`
                descriptionDiv.innerText = `Description ${monster.description}`
                newLi.appendChild(nameDiv)
                newLi.appendChild(ageDiv)
                newLi.appendChild(descriptionDiv)
                newLi.appendChild(hrLine)
                newUl.appendChild(newLi)
            })
        })
    }

    renderMonsters(newUl.dataset.page)
    let foundUl = document.querySelector("ul")
    forwardButton.addEventListener("click", function(e) {
        foundUl.innerHTML = ""
        foundUl.dataset.page = parseInt(foundUl.dataset.page) + 1
        renderMonsters(foundUl.dataset.page)
    })

    backButton.addEventListener("click", function (e) {
        foundUl.innerHTML = ""
        if (parseInt(foundUl.dataset.page) >= 1) {
        foundUl.dataset.page = parseInt(foundUl.dataset.page) - 1
        renderMonsters(foundUl.dataset.page)
        } else {
            renderMonsters(1)
        }
    })

    // debugger
})