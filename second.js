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

