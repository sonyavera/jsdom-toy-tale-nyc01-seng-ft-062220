let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyList = document.getElementById("toy-collection")


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    function renderToy(toyObj){
      const toyDisplayCard = document.createElement('div')
      toyDisplayCard.classList.add('card')
      toyDisplayCard.innerHTML =
      `
      <h2>${toyObj.name} </h2>
      <img src="${toyObj.image}" class="image"/>
      <p>Likes: ${toyObj.likes}</p>
      <button class="like-btn" id="${toyObj.id}">Like <3</button>
      `
      toyList.append(toyDisplayCard)
    }

    function renderToys(toysCollection){
      toysCollection.forEach(function(toyObj){
        renderToy(toyObj)
      })
    }


      fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toysCollection => renderToys(toysCollection))


    const toyForm = e => {
      
    }

  
      let createToy = toy => {
        return fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(toy)
        })
        .then(response => response.json())
        .then(renderToy(toy))
      }



    
  });

});
