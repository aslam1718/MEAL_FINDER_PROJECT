let categoryList = document.getElementById("categoryList");
let categoryCard = document.getElementById("category-card");
let mealCard = document.getElementById("meal-card");
let categoriesTitle = document.getElementsByClassName("categories-title");
let mealTitle = document.querySelector(".mealTitle");

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
        data.categories.forEach((category) => {
            // Offcanvas category list
    categoryList.innerHTML += `
    <a href="second.html?category=${encodeURIComponent(category.strCategory)}"
    class="category">

        ${category.strCategory}

    </a>

    <hr class="hrLine">
`;
            // Category cards
        categoryCard.innerHTML += `
    <div class="category-card">

        <a href="second.html?category=${encodeURIComponent(category.strCategory)}">

            <img src="${category.strCategoryThumb}" 
                alt="${category.strCategory}">

        </a>

        <span class="category-name">
            ${category.strCategory}
        </span>

    </div>
`;
        });

    })
    .catch((error) => {
        console.log(error);
    });

const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

let randomMeal = document.getElementById("randomMeal"); 

if (mealId) {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            if (!data.meals) {
                randomMeal.innerHTML = "<h2>Meal not found</h2>";
                return;
            }

            let meal = data.meals[0];

            randomMeal.innerHTML = `
                <div class="meal">

                    <img 
                        src="${meal.strMealThumb}" 
                        alt="${meal.strMeal}"
                    >

                    <h2>${meal.strMeal}</h2>

                    <p>Category: ${meal.strCategory}</p>

                    <p>Area: ${meal.strArea}</p>

                    <p>Tags: ${meal.strTags || "No tags"}</p>

                    <h3>Instructions</h3>

                    <p>${meal.strInstructions}</p>

                    <h3>Ingredients</h3>

                    <ul>
                        ${getIngredients(meal)}
                    </ul>

                    <a href="${meal.strYoutube}" target="_blank">
                        Watch Recipe
                    </a>

                </div>
            `;

        })
        .catch((error) => {
            console.log(error);
        });

} else {

    randomMeal.innerHTML = "<h2>No meal ID found</h2>";

}


function getIngredients(meal) {

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {

        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients += `
                <li>${measure} ${ingredient}</li>
            `;

        }
    }

    return ingredients;
}