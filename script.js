let categoryList = document.getElementById("categoryList");
let categoryCard = document.getElementById("category-card");
let search = document.getElementById("search");

let categories = [];

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
             categories = data.categories;
        categories.forEach((category) => {

            // Offcanvas category list
            categoryList.innerHTML += `
                <a href="#" class="category">
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

    search.addEventListener("input",()=>{
        let searchValue = search.value.toLowerCase();
        
        categoryCard.innerHTML = "";

        categories.forEach((category)=>{

            if(category.strCategory.toLowerCase().includes(searchValue)){
                categoryCard.innerHTML += `
                <div class="category-card">

                    <a href = ""><img src="${category.strCategoryThumb}" 
                            alt="${category.strCategory}"></a>

                    <span class="category-name">
                        ${category.strCategory}
                    </span>

                </div>
            `;

            }
        })
    })
