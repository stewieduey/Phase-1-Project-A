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
    console.log("recipe clicked!");
    let recipeDescription = document.createElement("p");
    recipeDescription.classList = "recipe-description";
    recipeDescription.textContent = recipe.name;
    console.log("Recipe desc:", recipeDescription);
    console.log(recipeContainer);
    recipeContainer.appendChild(recipeDescription);
    let ingredientsList = document.createElement("ul");
  recipe.ingredients.forEach(ingredient => {
    let ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  });

  ingredientsContainer.appendChild(ingredientsList);
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
          heroes.map((recipe) => {
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
    
            recipeContainer.append(card);
            // return card;
          });
    
