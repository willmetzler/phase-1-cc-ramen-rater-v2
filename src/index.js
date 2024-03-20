// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  document.querySelector("#rating-display").textContent = ramen.rating;
  document.querySelector("#comment-display").textContent = ramen.comment;
}



const addSubmitListener = () => {
  document.querySelector("#new-ramen").addEventListener("submit", event => {
    event.preventDefault();
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector("form").name.value,
            restaurant: document.querySelector("form").restaurant.value,
            image: document.querySelector("form").image.value,
            rating: document.querySelector("form").rating.value,
            comment: document.getElementById("new-comment").value,
        })
    })
    .then (response => response.json())
  .then (ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.setAttribute("id", ramen.id);
      document.querySelector("#ramen-menu").append(img);
      location.reload();
    });
})
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(menu => {
    menu.forEach (e => {
      const image = document.createElement("img");
      image.src = e.image;
      image.setAttribute("id", e.id)
      document.querySelector("#ramen-menu").append(image);
    })
    handleClick(menu[0])
    const image = document.querySelector("#ramen-menu")
    image.addEventListener("click", event => {
      menu.forEach(e => {
        if (e.id == event.target.id)
          handleClick(e)
      })
    })
  })
}

const main = () => {
  displayRamens();
  addSubmitListener();
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};