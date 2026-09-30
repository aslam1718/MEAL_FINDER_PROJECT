let categoryList = document.getElementById("categoryList");
let mealCard = document.getElementById("meal-card");
let mealTitle = document.querySelector(".mealTitle");
let mealDes = document.getElementById("mealDes");

// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get("category");

//  Load category menu
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {

        // Create category menu
        data.categories.forEach((category) => {

            categoryList.innerHTML += `
                <a href="second.html?category=${encodeURIComponent(category.strCategory)}"
                    class="category"><h6>
                    ${category.strCategory}
                    </h6>
                </a>

                <hr class="hrLine">
            `;

        });


        //  Find selected category
        const selectedCategory = data.categories.find(
            (category) => category.strCategory === categoryName
        );


        //  Show category description
        if (selectedCategory) {

            mealDes.innerHTML = `
                <div class="category-description">

                    <h2>${selectedCategory.strCategory}</h2>

                    <p>
                        ${selectedCategory.strCategoryDescription}
                    </p>

                </div>
            `;

        }

    })
    .catch((error) => {
        console.log(error);
    });


// 5. Get meals for selected category
if (categoryName) {

    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
    )
        .then((res) => res.json())
        .then((data) => {

            // 6. Show MEALS title
            mealTitle.innerHTML = `
                <div class="meal-title">

                    <h4>MEALS</h4>

                    <div class="meal-line"></div>

                </div>
            `;
            // 7. Clear meal cards
            mealCard.innerHTML = "";
            // 8. Check if meals exist
            if (!data.meals) {

                mealCard.innerHTML = `
                    <div class="noMeal">
                        <h2>No meals found</h2>
                    </div>
                `;

                return;
            }
            // 9. Display meals
            data.meals.forEach((meal) => {

                mealCard.innerHTML += `

<a href="third.html?id=${meal.idMeal}" class="mealItems">
                    <div class="meal">

                        <img src="${meal.strMealThumb}" 
                                alt="${meal.strMeal}">

                        <h3>${meal.strMeal}</h3>

                    </div>
                    </a>
                `;

            });

        })
        .catch((error) => {
            console.log(error);
        });
}