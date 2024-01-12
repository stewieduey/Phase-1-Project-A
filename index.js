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

 