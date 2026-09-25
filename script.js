let categoryList = document.getElementById("categoryList");
let categoryCard = document.getElementById("category-card");
let search = document.getElementById("search");
let mealCard = document.getElementById("meal-card");
let searchBtn = document.getElementById("searchBtn");
let categoriesTitle = document.getElementsByClassName("categories-title");
let mealTitle = document.querySelector(".mealTitle");

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
        // categories = data.categories;
        data.categories.forEach((category) => {
            // Offcanvas category list
            categoryList.innerHTML += `
                <a href="" class="category">
                    ${category.strCategory} 
                </a>
                <hr>
            `;
            // Category cards
            categoryCard.innerHTML += `
                <div class="category-card">
                    <a href = ""><img src="${category.strCategoryThumb}" 
                            alt="${category.strCategory}"></a>
                    <span class="category-name">
                            ${category.strCategory}
                    </span>
                </div>
            `;
        });


        // Offcanvas category click
        let categoriesLinks = document.querySelectorAll(".category");

        categoriesLinks.forEach((category) => {

            category.addEventListener("click", function (e) {

                e.preventDefault();

                let categoryName = this.innerText;

                console.log(categoryName);

            });

        });

    })
    .catch((error) => {
        console.log(error);
    });


searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let searchValue = search.value.trim();

    mealCard.innerHTML = "";
    mealTitle.innerHTML = "";

    if (searchValue === "") {
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {

            if (!data.meals) {
                mealTitle.innerHTML = "";
                mealCard.innerHTML = `
                <div class="noMeal">
                    <h2>No meals found</h2>
                    </div>
                `;
                return;
            }

            // MEALS title
            mealTitle.innerHTML = `
        <div class="meal-title">
                    <h1>MEALS</h1>
                    <div class="meal-line"></div>
                    </div>
            
            `;

            // Meal cards
            data.meals.forEach((meal) => {

                mealCard.innerHTML += `
                    <a href="#" class="item-click">
                        <div class="meal-card">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <p>${meal.strArea}</p>
                            <h5>${meal.strMeal}</h56>
                            <span class="itemName">${meal.strCategory}</span>
                        </div>
                    </a>
                `;

            });

        });

});


// let mealDes = document.getElementById("mealDes");

// category.addEventListener("click",(e)=>{
//     e.preventDefault()


//     fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
//     .then((res) => res.json())
//     .then((data) => {
//         // categories = data.categories;
//         data.categories.forEach((category) => {
//             // Offcanvas category list
//             categoryList.innerHTML += `
//                 <a href="" class="category">
//                     ${category.strCategory} 
//                 </a>
//                 <hr>
//             `;
        
//         });
// })

