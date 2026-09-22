let categoryList = document.getElementById("categoryList");

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

        let categories = document.querySelectorAll(".category");

        categories.forEach((category) => {

            category.addEventListener("click", function (e) {

                e.preventDefault();

                let categoryName = this.innerText;

            });

        });

    })
    .catch((error) => {
        console.log(error);
    });


