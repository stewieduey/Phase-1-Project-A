document.addEventListener("DOMContentLoaded", () => {
    changeBackgroundColor();
    renderRecipes();
    });

    function changeBackgroundColor() {
        const colors = ["#F8EAD6", "#E5A28A", "#BF5A36", "#A87100", "#704214"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        document.body.style.backgroundColor = colors[randomIndex];
        }
  
  let showAllRecipes = true;
  
  const recipeForm = document.getElementById("recipeForm");
  const recipeContainer = document.getElementById("recipe-container");
  const ingredientsContainer = document.getElementById("ingredients-container");
  const instructionsContainer = document.getElementById("instructions-container");
  
  recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submitted Successfully!");
  
    let formData = {
      name: e.target.recipeName.value,
      image: e.target.recipeImage.value,
      ingredients: e.target.recipeIngredients.value,
      instructions: e.target.recipeInstructions.value
    };
  
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New recipe added:", data);
        renderRecipes();
      })
      .catch((error) => {
        console.error("Error adding new recipe:", error);
      });
  
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
    img.addEventListener("error", (e) => {
      console.error("Error loading image:", e);
    });
    recipeContainer.appendChild(img);
  
    if (showAllRecipes) {
      let ingredientsList = document.createElement("ul");
      let ingredients = recipe.ingredients.split(",").map(ingredient => ingredient.trim());
      ingredients.forEach(ingredient => {
        let ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
      });
  
      ingredientsContainer.appendChild(ingredientsList);
  
      let instructionsText = document.createElement("p");
      instructionsText.textContent = recipe.instructions;
      instructionsContainer.appendChild(instructionsText);
    }
  }
  
  function renderRecipes() {
    recipeContainer.replaceChildren();
    fetch("http://localhost:3000/recipes")
      .then((resp) => resp.json())
      .then((recipes) => {
        recipes.forEach((recipe) => {
          const card = document.createElement("div");
          card.classList = "recipe-card";
          const img = document.createElement("img");
          img.src = recipe.image;
          img.addEventListener("error", (e) => {
            console.error("Error loading image:", e);
          });
          const name = document.createElement("p");
          name.textContent = recipe.name;
  
          card.appendChild(img);
          card.appendChild(name);
  
          card.addEventListener("click", () => {
            showRecipes(recipe);
          });
  
          recipeContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  
  const showAllButton = document.getElementById("showAllButton");
  showAllButton.addEventListener("click", () => {
    showAllRecipes = true;
    ingredientsContainer.replaceChildren();
    instructionsContainer.replaceChildren();
    renderRecipes();
  });
  
  //The display my faves toggle button event listener
  const showFavesButton = document.getElementById("showFavesButton");
  showFavesButton.addEventListener("click", toggleFavoriteRecipes);
  
  let showOnlyFavorites = false;
  
  function toggleFavoriteRecipes() {
    showOnlyFavorites = !showOnlyFavorites;
    renderRecipes();
  }