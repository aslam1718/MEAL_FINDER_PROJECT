let categoryList = document.getElementById("categoryList");
let mealCard = document.getElementById("meal-card");
let mealTitle = document.querySelector(".mealTitle");
let mealDes = document.getElementById("mealDes");

// Get category from URL
let urlParams = new URLSearchParams(window.location.search);
let categoryName = urlParams.get("category");


// Load category menu
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {

        data.categories.forEach((category) => {

            categoryList.innerHTML += `
                <a href="second.html?category=${encodeURIComponent(category.strCategory)}"
                    class="category">
                    ${category.strCategory}
                </a>
                <hr class="hrLine">
            `;

        });

    })
    .catch((error) => {
        console.log(error);
    });


// If category exists in URL, load it
if (categoryName) {

    // Fetch category description
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => {

            let selectedCategory = data.categories.find(
                (category) => category.strCategory === categoryName
            );

            if (!selectedCategory) {
                return;
            }

            mealDes.innerHTML = `
                <div class="category-description">
                    <h2>${selectedCategory.strCategory}</h2>
                    <p>${selectedCategory.strCategoryDescription}</p>
                </div>
            `;

        })
        .catch((error) => {
            console.log(error);
        });


    // Fetch meals
    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
    )
        .then((res) => res.json())
        .then((data) => {

            mealTitle.innerHTML = `
                <div class="meal-title">
                    <h1>MEALS</h1>
                    <div class="meal-line"></div>
                </div>
            `;

            mealCard.innerHTML = "";

            if (!data.meals) {
                mealCard.innerHTML = `
                    <div class="noMeal">
                        <h2>No meals found</h2>
                    </div>
                `;
                return;
            }

            data.meals.forEach((meal) => {

                mealCard.innerHTML += `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" 
                                alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                `;

            });

        })
        .catch((error) => {
            console.log(error);
        });
}