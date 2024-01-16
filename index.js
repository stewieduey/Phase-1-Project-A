document.addEventListener("DOMContentLoaded", () => {
  renderRecipes();
});

function fetchData() {
  fetch('https://localhost:3000/recipes')
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

const recipeForm = document.getElementById("recipeForm");
const recipeContainer = document.getElementById("recipe-container");
const ingredientsContainer = document.getElementById("ingredients-container");
const instructionsContainer = document.getElementById("instructions-container");

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted Successfully!");

  let newRecipe = {
    name: e.target.recipeName.value,
    image: e.target.recipeImage.value,
    ingredients: e.target.recipeIngredients.value,
    instructions: e.target.recipeInstructions.value
  };

  createNewRecipe(newRecipe);
  recipeForm.reset();
});

function showRecipes(recipe) {
    recipeContainer.replaceChildren();
    ingredientsContainer.replaceChildren();
    instructionsContainer.replaceChildren();
  
    let recipeDescription = document.createElement("p");
    recipeDescription.classList = "recipe-description";
    recipeDescription.textContent = recipe.name;
    recipeContainer.appendChild(recipeDescription);
  
    let img = document.createElement("img");
    img.src = recipe.image;
    recipeContainer.appendChild(img);
  
    let ingredientsList = document.createElement("ul");
    let ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients.split(",");
    ingredients.forEach((ingredient) => {
      let ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient.trim();
      ingredientsList.appendChild(ingredientItem);
    });
  
    ingredientsContainer.appendChild(ingredientsList);
  
    let instructionsText = document.createElement("p");
    instructionsText.textContent = recipe.instructions;
    instructionsContainer.appendChild(instructionsText);
  }
  
  function renderRecipes() {
    recipeContainer.replaceChildren();
    fetch("http://localhost:3000/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((recipes) => {
        recipes.forEach((recipe) => {
          const card = document.createElement("div");
          card.classList = "recipe-card";
          const img = document.createElement("img");
          img.src = recipe.image;
          const name = document.createElement("p");
          name.textContent = recipe.name;
  
          card.appendChild(img);
          card.appendChild(name);
  
          card.addEventListener("click", () => {
            showRecipes(recipe);
            console.log(recipe);
          });
  
          recipeContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }