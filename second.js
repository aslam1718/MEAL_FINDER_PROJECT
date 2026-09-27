let categoryList = document.getElementById("categoryList");
let search = document.getElementById("search");
let mealCard = document.getElementById("meal-card");
let mealTitle = document.querySelector(".mealTitle");
let mealDes = document.getElementById("mealDes");

// Fetch all categories
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {

        data.categories.forEach((category) => {

            categoryList.innerHTML += `
                <a href="#" class="category"
                    data-category="${category.strCategory}">
                    ${category.strCategory}
                </a>
                <hr>
            `;

        });

    })
    .catch((error) => {
        console.log(error);
    });


// Click category from menu
categoryList.addEventListener("click", (e) => {

    if (e.target.classList.contains("category")) {

        e.preventDefault();

        let categoryName = e.target.dataset.category;

        // Fetch category description
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((res) => res.json())
            .then((data) => {

                let selectedCategory = data.categories.find(
                    (category) => category.strCategory === categoryName
                );
                mealDes.innerHTML = `
                    <div class="category-description">
                        <h2>${selectedCategory.strCategory}</h2>
                        <p>${selectedCategory.strCategoryDescription}</p>
                    </div>
                `;

            });

        // Fetch meals of selected category
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
            .then((res) => res.json())
            .then((data) => {

                mealTitle.innerHTML = `
                    <div class="meal-title">
                    <h1>MEALS</h1>
                    <div class="meal-line"></div>
                    </div>
                `;

                mealCard.innerHTML = "";

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

});