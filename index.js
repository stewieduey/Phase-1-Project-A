document.addEventListener("DOMContentLoaded", () => 
renderRecipes()
);

 function fetchData(){
    fetch('https://localhost:3000/recipes')
    .then((resp) => resp.json())
    .then((data) => console.log(data))
 };

 const recipeForm  = document.getElementById("recipeForm");
 const recipeContainer = document.getElementById("recipe-container");
 const ingredientsContainer = document.getElementById("ingredients-container");
 const instructionsContainer  = document.getElementById("instructions-container");

 recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submitted Successfully!");

    let newRecipe = {
        name:e.target.recipeName.value,
        image:e.target.recipeImage.value,
        ingredients: e.target.recipeIngredients.value,
        instructionsContainer: e.target.recipeInstructions.value
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
    console.log("Recipe desc:", recipeDescription);
    console.log(recipeContainer);
    recipeContainer.appendChild(recipeDescription);
  
    if (Array.isArray(recipe.ingredients)) {
      let ingredientsList = document.createElement("ul");
      recipe.ingredients.forEach(ingredient => {
        let ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
      });
  
      ingredientsContainer.appendChild(ingredientsList);
    } else {
      let errorText = document.createElement("p");
      errorText.textContent = "Ingredients not available";
      ingredientsContainer.appendChild(errorText);
    }
  
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
  //The display my faves toggle button event listener
  const showFavesButton = document.getElementById("showFavesButton");
  showFavesButton.addEventListener("click", toggleFavoriteRecipes);
  
  let showOnlyFavorites = false;
  
  function toggleFavoriteRecipes() {
    showOnlyFavorites = !showOnlyFavorites;
    renderRecipes();
  }