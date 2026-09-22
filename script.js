let categoryList = document.getElementById("categoryList");
let mealList = document.getElementById("mealList");

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {

        data.categories.forEach((category) => {

            categoryList.innerHTML += `
                <a href="#" class="category">
                    ${category.strCategory}
                </a>
            `;

        });

        // Add click event to every category
        let categories = document.querySelectorAll(".category");

        categories.forEach((category) => {

            category.addEventListener("click", function (e) {

                e.preventDefault();

                let categoryName = this.innerText;

                getMeals(categoryName);

            });

        });

    })
    .catch((error) => {
        console.log(error);
    });


function getMeals(categoryName) {

    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php}`)
        .then((res) => res.json())
        .then((data) => {

            mealList.innerHTML = "";

            data.meals.forEach((meal) => {

                mealList.innerHTML += `
                    <div class="meal-card">

                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                        <h3>${meal.strMeal}</h3>

                    </div>
                `;

            });

        })
        .catch((error) => {
            console.log(error);
        });
}