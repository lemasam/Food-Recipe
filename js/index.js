const searchBtn = document.getElementById("search-btn");

const mealList = document.getElementById("meal");

const mealDetailsContent = document.querySelector(".meal-details-content");

const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event listener
searchBtn.addEventListener("click", getMealList);

mealList.addEventListener("click", getMealRecipe);

recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
  let searchInputText = document.getElementById("search-input").value.trim();
  //The trim method in JavaScript is a built-in string method that removes whitespace characters from the beginning and end of a string. The whitespace characters include spaces, tabs, and newline characters.
  //   console.log(searchInputText);

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      //    console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meal-item" data-id ="${meal.idMeal}">
                        <div class="meal-img" >
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn"> Recipe</a>
                            </div>
                        </div>
                    `;
        });

        mealList.classList.remove("notFound");
      } else {
        html = "Oops! No Meal Found";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    })
    .catch((error) => console.log(error));
}

//getting  recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  //console.log(e.target);
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    //console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then(
        (data) => mealRecipeModel(data.meals)
        // {
        // console.log(data);

        // }
      );
  }
}

//model creation
function mealRecipeModel(meal) {
  meal = meal[0];
  //   mealList.classList.add('hide')
  let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
                <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions} </p>
                </div>
                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt=" "> 
                </div>
                `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
  
}
