let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection")
  toysUrl = 'http://localhost:3000/toys/'
  const toyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
  });


  const getToys = () => {
    fetch(toysUrl)
    .then(resp => resp.json())
    .then(toys => toys.forEach(renderToy))
  }


  const renderToy = (toy) => {
    const toyLi = document.createElement('div')
    toyLi.classList.add('card')
    toyLi.id = toy.id
    toyLi.innerHTML = 
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p class="likes">${toy.likes} Likes</p> 
    <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyLi)
  }
 

  const createNewToy = () => {
    document.addEventListener("submit", (e) => {
    e.preventDefault()
    const toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    const option = {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        "accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
      fetch(toysUrl, option)
      renderToy(toyObj)

  })
};


const likesHandler = () => {
  toyCollection.addEventListener("click", (e) => {
    if(e.target.matches(".like-btn")){
      const buttonParent = e.target.parentElement
      const toyId = buttonParent.id
      const oldLikes = e.target.previousElementSibling.innerText.split(" ")[0]
      const newLikes = parseInt(oldLikes) +1
      const likesNode = e.target.previousElementSibling

      const option = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({ likes: newLikes})
    };

    fetch(toysUrl + toyId, option)
    .then(resp => resp.json())
    .then(resp => likesNode.innerText = newLikes + " Likes")
  };
});
};

  getToys()
  createNewToy()
  likesHandler()



});