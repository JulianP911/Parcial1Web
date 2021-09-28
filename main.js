// Url de donde se encuentra el json con la informacion
const urlInfo = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

// Obtener la informacion correspondiente del restaurante
fetch(urlInfo).then(res => res.json()).then(restaurantEjecution)

// 
function restaurantEjecution (arrayFood) {
    let listCategories = document.getElementById("listCategories");
    arrayFood.forEach(foodCategorie => {
        let li = document.createElement("li");
        li.className = "nav-item ";
        let a = document.createElement("a");
        a.className = "nav-link"
        a.textContent = foodCategorie.name;
        li.appendChild(a);
        listCategories.appendChild(li);
    });

    console.log(arrayFood)

    document.querySelectorAll(".nav-link").forEach(itemNav => {
        itemNav.addEventListener("click", (event) => {
            // Variable de la categoria
            let category = event.target.text;

            // Cambio de nombre de titulo para desplegar la categoria seleccionada
            let titleCategory = document.getElementById("titleCategory");
            titleCategory.textContent = category;

            let listCategory = arrayFood.find(elementFood => elementFood.name == category);
            let divProductsCards = document.getElementById("products");

            listCategory.products.forEach(item => {
                let divCard = document.createElement("div");
                divCard.className = "card col-3";
                divCard.setAttribute("style", "width: 18rem;")
                let imgCard = document.createElement("img");
                imgCard.className = "card-img-top"
                imgCard.setAttribute("src", item.image);
                imgCard.setAttribute("alt", item.name);
                let divCardBody = document.createElement("div");
                divCard.className = "card-body";
                let h5 = document.createElement("h5");
                h5.className = "card-title";
                h5.textContent = item.name;
                let pDescription = document.createElement("p");
                pDescription.className = "card-text";
                pDescription.textContent = item.description;
                let pPrice = document.createElement("p");
                pPrice.className = "card-text";
                pPrice.textContent = item.price;
                let buttomAdd = document.createElement("a");
                buttomAdd.className = "btn btn-primary";
                buttomAdd.setAttribute("type", "button");
                buttomAdd.textContent = "Add to card";

                divCard.appendChild(imgCard);
                divProductsCards.appendChild(divCard);

                divCardBody.appendChild(h5);
                divCardBody.appendChild(pDescription);
                divCardBody.appendChild(pPrice);
                divCardBody.appendChild(buttomAdd);
                divProductsCards.appendChild(divCardBody);

                console.log(divCardBody)
            })
        })
    }) ;  
}

