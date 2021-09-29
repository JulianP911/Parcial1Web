// Url de donde se encuentra el json con la informacion
const urlInfo = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

// Obtener la informacion correspondiente del restaurante y ejecutar la funcion restaurantEjecution
fetch(urlInfo).then(res => res.json()).then(restaurantEjecution)

// Arreglo donde se almacenan los items seleccionados
let a = [];

// Ejecucion de las funcionalidades establecias 
function restaurantEjecution (arrayFood) {

    // Obtener el elemento con el id listCategories
    let listCategories = document.getElementById("listCategories");

    // Recorrer el arreglo obtendio de categorias con sus productos correspondientes
    arrayFood.forEach(foodCategorie => {

        // Creacion de elementos li, a con su repsectiva configuracion de clases y contenido
        let li = document.createElement("li");
        li.className = "nav-item ";
        let a = document.createElement("a");
        a.className = "nav-link"
        a.textContent = foodCategorie.name;

        // Adicionar el elemento a en li
        li.appendChild(a);

        // Adicionar el elemento li en listCategories para la creacion del navbar
        listCategories.appendChild(li);
    });

    // Obtener el elemento con el id products
    let divProductsCards = document.getElementById("products");

    // Obtener el elemento con el id tableItems
    let tableItems = document.getElementById("tableItems");

    // Obtener el elemento con el id optionsItems
    let optionsItems = document.getElementById("optionsItems");

    // Arreglo de objetos items con su informacion correspondiente
    let quantity = [];

    // Obtener los selectores con la clase .nav-link
    document.querySelectorAll(".nav-link").forEach(itemNav => {

        // Al hacer click en la opcion del navbar mostrar los items mediante cards
        itemNav.addEventListener("click", (event) => {
            // Variable de la categoria
            let category = event.target.text;

            // Cambio de nombre de titulo para desplegar la categoria seleccionada
            let titleCategory = document.getElementById("titleCategory");
            titleCategory.textContent = category;

            // Encontrar en el arreglo el elemento donde el nombre y la categoria concidan
            let listCategory = arrayFood.find(elementFood => elementFood.name == category);

            // Numero de cards
            let numCards = 0;

            // Eliminar nodos que presenten al elemento divProductsCards
            while (divProductsCards.lastElementChild) {
                divProductsCards.removeChild(divProductsCards.lastElementChild);
            }

            // Por cada item en categoria se crea su repsectiva card asociada
            listCategory.products.forEach(item => {

                // Creacion de elementos necesarios para la creacion de la card
                let divCard = document.createElement("div");
                divCard.className = "card cardItem";
                divCard.setAttribute("style", "width: 18rem;")
                let imgCard = document.createElement("img");
                imgCard.className = "card-img-top imgFood"
                imgCard.setAttribute("src", item.image);
                imgCard.setAttribute("alt", item.name);
                let divCardBody = document.createElement("div");
                divCardBody.className = "card-body";
                let h5 = document.createElement("h5");
                h5.className = "card-title";
                h5.textContent = item.name;
                let pDescription = document.createElement("p");
                pDescription.className = "card-text";
                pDescription.textContent = item.description;
                let pPrice = document.createElement("p");
                pPrice.className = "card-text";
                pPrice.setAttribute("id", "itemPrice")
                pPrice.textContent = "$" + item.price;
                let buttomAdd = document.createElement("a");
                buttomAdd.className = "btn btn-dark btn-item";
                buttomAdd.setAttribute("type", "button");
                buttomAdd.setAttribute("id", "button-" + category + "-" + item.name)
                buttomAdd.textContent = "Add to card";

                // Funciones que se ejecutan al dar click en el boton estas son aumentar el contadr de items y almacenar el objeto del item con su informacion respectiva
                buttomAdd.addEventListener("click", function() {
                    countItems(item, quantity)
                });
                buttomAdd.addEventListener("click", function () {
                    addItems(item)
                });

                // Adicionar el elemento imgCard a divCard
                divCard.appendChild(imgCard);
            
                // Adicionar los elementos h5, pDescription, pPrice, buttomAdd a divCardBody
                divCardBody.appendChild(h5);
                divCardBody.appendChild(pDescription);
                divCardBody.appendChild(pPrice);
                divCardBody.appendChild(buttomAdd);

                // Adicionar el elemento divCardBody a divCard
                divCard.appendChild(divCardBody);

                // Adicionar el elemento div card a divProductsCards y aumentar el numero de cards
                divProductsCards.appendChild(divCard)
                numCards++;
            });

            // No desplegar tableItems y optionsItems
            tableItems.innerHTML = "";
            optionsItems.innerHTML = "";
        });
    });
    
    // Variable que representa si la cabezera de la tabla ya fue desplegada
    let tableHead = false;

    // Obtener el elemnto carItems y aplicarle la funcionalidad de click para desplegar la tabla con la orden de items
    document.getElementById("carItems").addEventListener("click", function () {

        // No desplegar tableItems y optionsItems
        tableItems.innerHTML = "";
        optionsItems.innerHTML = "";

        // Eliminar nodos que presenten al elemento divProductsCards
        while (divProductsCards.lastElementChild) {
            divProductsCards.removeChild(divProductsCards.lastElementChild);
        }

         // Cambio de nombre de titulo para desplegar el texto Order datail
        let title = document.getElementById("titleCategory");
        title.textContent = "Order detail"

        // Cambio de la clase del elemento table para configurar la clase table-striped
        let table = document.createElement("table");
        table.className ="table table-striped";
        
        // Si la cabacera de la tabla no ha sido desplegada, se despiga con los elementos correspondientes
        if(tableHead == false)
        {
            let tHead = document.createElement("thead");
            let trHead = document.createElement("tr");
            let nameColumns = ["Item", "Qty.", "Description", "Unit Price", "Amount", "Modify"]

            for (let i = 0; i < nameColumns.length; i++) {
                let trHd = document.createElement("th");
                trHd.textContent = nameColumns[i];
                trHd.setAttribute("scope", "col")
                trHead.appendChild(trHd);
            }

            // Adicionar los elementos trHead a tHead y tHead a table
            tHead.appendChild(trHead);
            table.appendChild(tHead);
            tableHead = true;
        }

        // Variables requeridas para el despliegue de las filas de la tabla
        let tBody = document.createElement("tbody");
        let spanTotal;
        let index = 0;
        let total = 0;

        // Por cada elemento adicionado a la orden se crea su propia fila con la informacion respectiva
        quantity.forEach(element => {

            // Creacion de elementos necesarios para la creacion de la fila de la tabla
            let tr = document.createElement("tr");
            let thIndex = document.createElement("th");
            thIndex.setAttribute("scope", "col");
            thIndex.textContent = index;
            let tdQty = document.createElement("td");
            tdQty.textContent = element.quantity;
            let tdDescription = document.createElement("td");
            tdDescription.textContent = element.food;
            let tdUnitPrice = document.createElement("td");
            tdUnitPrice.textContent = element.unitPrice;
            let tdAmount = document.createElement("td");
            tdAmount.textContent = element.amount;
            let tdButtons = document.createElement("td")

            // Creacion del elemento a que corresponde al botton +
            let buttomAdd = document.createElement("a");
            buttomAdd.className = "btn btn-dark btn-row";
            buttomAdd.textContent = "+";
            
            // Funcion para adicioanar nuevo item al hacer click al boton con sus respectivas funcionalidades
            buttomAdd.addEventListener("click", function() {
                tdQty.textContent = ++element.quantity;
                tdAmount.textContent = element.quantity * element.unitPrice;
                element.amount = element.quantity * element.unitPrice;
                spanTotal.textContent = "Total $" + recalTotalA(quantity);
            });

            // Creacion del elemento a que corresponde al botton -
            let buttomLess = document.createElement("a");
            buttomLess.className = "btn btn-dark btn-row";
            buttomLess.textContent = "-";

            // Funcion para eleiminar item al hacer click al boton con sus respectivas funcionalidades
            buttomLess.addEventListener("click", function() {
                tdQty.textContent = --element.quantity;
                if(tdQty.textContent !== 0)
                {
                    tdAmount.textContent = element.quantity * element.unitPrice;
                    element.amount = element.quantity * element.unitPrice;
                    spanTotal.textContent = "Total $" + recalTotalD(quantity);
                }
                if(tdQty.textContent === "0")
                {
                    tr.innerHTML = "";
                    descountItems();
                }
            });

            // Adicionar los elementos thIndex, tdQty, tdDescription, tdUnitPrice, tdAmount a tr
            tr.appendChild(thIndex);
            tr.appendChild(tdQty);
            tr.appendChild(tdDescription);
            tr.appendChild(tdUnitPrice);
            tr.appendChild(tdAmount)

            // Adicionar los elementos buttomAdd, buttomLess a tdButtoms
            tdButtons.appendChild(buttomAdd);
            tdButtons.appendChild(buttomLess);

            // Adicionar el elemnto tdButtons a tr y tr a tBody y actualizacion de varibles total e index
            tr.appendChild(tdButtons);
            tBody.appendChild(tr);
            total += element.amount;
            index++;
        });

        // Creacion de elementos necesarios para la creacion de la fila que contiene el total y los botones correspondientes
        let divRow = document.createElement("div");
        divRow.className = "row"
        let divSpan = document.createElement("div");
        divSpan.className = "col"
        spanTotal = document.createElement("span");
        spanTotal.textContent = "Total: $" + total;
        spanTotal.setAttribute("id", "spanTotalItems");
        divSpan.appendChild(spanTotal);
        let divButtoms = document.createElement("div");
        divButtoms.className = "col d-flex justify-content-end"
        divButtoms.setAttribute("id", "divButtoms");
        let buttomCancel = document.createElement("button");
        buttomCancel.className = "btn btn-danger btn-order";
        buttomCancel.textContent = "Cancel";
        buttomCancel.setAttribute("data-target", "#cancelModal");
        buttomCancel.setAttribute("data-toggle", "modal");
        let buttomConfirm = document.createElement("a");
        buttomConfirm.className = "btn btn-light btn-order";
        buttomConfirm.textContent = "Confirm order";

        // Funcion para el boton confirm que imprime en consola la informacion de la orden
        buttomConfirm.addEventListener("click", function () {
            let i = 1;
            let order = [];
            quantity.forEach(element => {
                let objectOrder = {};
                objectOrder["item"] = i;
                objectOrder["quantity"] = element.quantity;
                objectOrder["description"] = element.food;
                objectOrder["unitPrice"] = element.unitPrice;
                order.push(objectOrder);
            })
            console.log(order);
        });

        // Adicionar los elementos buttomCancel, buttomConfirm a divButtoms
        divButtoms.appendChild(buttomCancel);
        divButtoms.appendChild(buttomConfirm);

        // Adicionar los elementos divSpan, divButtoms a divRow
        divRow.appendChild(divSpan);
        divRow.appendChild(divButtoms);
        
        // Adicionar el elemento tBody a table, table a tableItems y divRow a optionsItems
        table.appendChild(tBody)
        tableItems.appendChild(table)
        optionsItems.appendChild(divRow);
    });

    // Obtener el elemnto buttonYes y aplicarle la funcionalidad de click para limpiar la tabla al confirmar la cancelacion
    document.getElementById("buttonYes").addEventListener("click", function() {
        tableItems.innerHTML = "";
        optionsItems.innerHTML = "";
        clearCar();
    });
}

// Variables para manejar el numero de items y obtener el elemento con id itemCar
let numItems = 0;
let itemCar = document.getElementById("itemsAdd")

// Reiniciar el contador de los items seleccionados en la orden
function clearCar () {
    itemCar.textContent = (0) + " items";
}

// Contar los items seleccionados en la orden y adicionarlos en arreglo de objetos con su informacion respectiva
function countItems(item, quantity) {
    itemCar.textContent = (numItems + 1) + " items";
    let encontrado = quantity.find(elementFood =>  elementFood.food == item.name);
    if(encontrado === undefined)
    {
        let event = {};
        event["food"] = item.name;
        event["quantity"] = 1;
        event["unitPrice"] = item.price;
        event["amount"] = item.price;
        quantity.push(event);
    } else {
        encontrado.quantity ++;
        encontrado.amount = encontrado.quantity * encontrado.unitPrice;
    }
    numItems = numItems + 1;
}

// Descontar items de la orden actualizando el label relacionado al tag con id itemCar
function descountItems() {
    itemCar.textContent = (numItems - 1) + " items";
}

// Adiciona alimentos seleccionados al arreglo de la orden
function addItems(item) {
    a.push(item)
}

// Funcion que recalcula el valor total de una orden cuando se adiciona alguna comida a la orden
function recalTotalA(quantity) {
    let total = 0;
    quantity.forEach(element => {
        total += element.amount;
    });
    return total;
}

// Funcion que recalcula el valor total de una orden cuando se elimina alguna comida a la orden
function recalTotalD(quantity) {
    let total = 0;
    quantity.forEach(element => {
        total -= (-element.amount);
    });
    return total;
}