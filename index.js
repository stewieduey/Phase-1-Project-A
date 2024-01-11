document.addEventListener("DOMContentLoaded", () => fetchData);

 function fetchData(){
    fetch('https://localhost:3000/recipes')
    .then((resp) => resp.json())
    .then((data) => console.log(data))
 };