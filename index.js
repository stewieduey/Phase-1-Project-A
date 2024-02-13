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
  let showOnlyFavorites = false;
  
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
      instructions: e.target.recipeInstructions.value,
      favorite: false, //new recipes wont be favorites to save time
    };
  
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
    ingredientsContainer.innerHTML = "";
    instructionsContainer.innerHTML = "";
  
    let ingredientsList = document.createElement("ul");
    let ingredients = recipe.ingredients.split(",").map((ingredient) => ingredient.trim());
    ingredients.forEach((ingredient) => {
      let ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    });
  
    ingredientsContainer.appendChild(ingredientsList);
  
    let instructionsText = document.createElement("p");
    instructionsText.textContent = recipe.instructions;
    instructionsContainer.appendChild(instructionsText);
  }
  
  function renderRecipes() {
    recipeContainer.innerHTML = "";
    ingredientsContainer.innerHTML = "";
    instructionsContainer.innerHTML = "";
  
    fetch("http://localhost:3000/recipes")
      .then((resp) => resp.json())
      .then((recipes) => {
        recipes.forEach((recipe) => {
          if (showAllRecipes || recipe.favorite) {
            const card = document.createElement("div");
            card.classList = "recipe-card";
            const img = document.createElement("img");
            img.src = recipe.image;
            img.alt = "Recipe Image";
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
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  
  const showAllButton = document.getElementById("showAllButton");
  showAllButton.addEventListener("click", () => {
    showAllRecipes = true;
    renderRecipes();
  });
  
  const showFavesButton = document.getElementById("showFavesButton");
  showFavesButton.addEventListener("click", () => {
    showAllRecipes = false;
    renderRecipes();
  });