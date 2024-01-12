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
    