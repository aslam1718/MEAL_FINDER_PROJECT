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

            let home = document.getElementById("mealname")
            home.innerHTML=`${meal.strMeal}`
            randomMeal.innerHTML = `

                <div class="meal3">
                    <div class="mealTop">
                        <div class="imageBox">
                            <img
                                src="${meal.strMealThumb}"
                                alt="${meal.strMeal}"
                                class="img1"
                            >
                        </div>
                        <div class="mealDetails">

                            <h2 class="head2">
                                ${meal.strMeal}
                            </h2>

                            <p class="cat1">
                                <b>CATEGORY :</b>
                                ${meal.strCategory}
                            </p>

                            <p class="source">
                                <b>Source :</b>
                                ${meal.strSource || "No source available"}
                            </p>

                            <p class="tags">
                                <b>Tags:</b>

                                ${
                                    meal.strTags
                                    ? `<span>${meal.strTags}</span>`
                                    : `<span>No tags</span>`
                                }
                            </p>

                            <div class="ingredientBox">

                                <h3 class="ing">
                                    Ingredients
                                </h3>

                                <ul class="getIng">
                                    ${getIngredients(meal)}
                                </ul>

                            </div>

                        </div>

                    </div>

                    <div class="measureSection">

                        <h4>
                            Measure:
                        </h4>

                        <div class="measureBox">
                            ${getMeasures(meal)}
                        </div>

                    </div>

                    <div class="instructionSection">

                        <h4>
                            Instructions:
                        </h4>

                        <div class="instruct">
                            ${getInstructions(meal.strInstructions)}
                        </div>

                    </div>

                </div>
            `;

        })
        .catch((error) => {
            console.log(error);
        });

} else {

    randomMeal.innerHTML = "<h2>No meal ID found</h2>";

}


/* INGREDIENTS */

function getIngredients(meal) {

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {

        let ingredient = meal[`strIngredient${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients += `
                <li>${ingredient}</li>
            `;
        }
    }

    return ingredients;
}


/* MEASURES */

function getMeasures(meal) {

    let measures = "";

    for (let i = 1; i <= 20; i++) {

        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            measures += `
                <div class="measureItem">
                <p>
                    <span><img src="spoon.png" alt="" class="spoon"></span>
                    ${measure || ""}
                    <span>${ingredient}</span>
                    </p>
                </div>
            `;
        }
    }

    return measures;
}


/* INSTRUCTIONS */

function getInstructions(instructions) {

    let steps = instructions
        .split(/\r?\n/)
        .filter(step => step.trim() !== "");

    return steps.map(step => {

        return `
            <div class="instructionItem">

                <span class="check">☑</span>

                <span>
                    ${step}
                </span>

            </div>
        `;

    }).join("");
}