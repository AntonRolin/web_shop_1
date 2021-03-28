const tbody = document.getElementById('productTable');
const customerCartList = document.getElementById('customerCart');
const viewCartButton = document.getElementById('viewCartButton');
document.getElementById('dropdownMenu').addEventListener('click', function (e) {
    e.stopPropagation();
  });

const url = 'https://webacademy.se/fakestore/';
let allProducts; 
let productsInCart = [];

loadData();

/**
 * Fetches products from API and displays them in product table
 */
function loadData(){
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        allProducts = data;
        return allProducts.map(function(product) {
            let tr = createNode('tr');
            let td1 = createNode('td');
            let td2 = createNode('td');
            let td3 = createNode('td');
            let td4 = createNode('td');
            let td5 = createNode('td');
            
            
            td1.innerHTML = product.title;
            td2.innerHTML = `<img src="${product.image}" alt="Produktbild" ">`;
            td3.innerHTML = product.description;
            td4.innerHTML = `<strong>${product.price}€</strong>`;
            td5.innerHTML = `<button type="button" class="btn btn-outline-success" onclick="addToCart(${product.id})">Add to cart</button>`;

            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tr, td4);
            append(tr, td5);
            append(tbody, tr);
     })
})
.catch(function(error) {
    console.log.error;
});
}

function addToCart(id){
    allProducts.forEach(element => {
        if(element.id === id)
            productsInCart.push(element);
    });
    updateCart();
}

function removeFromCart(id){
    for(let i = 0; i < productsInCart.length; i++){

        if(productsInCart[i].id === id){
            productsInCart.splice(i, 1)
            break;
        }
    }
    updateCart();
}
/**
 * Updates cart whenever a product is added or removed
 */
function updateCart(){
    customerCartList.innerHTML = "";
    productSet = new Set(productsInCart);
    productSet.forEach(element => {
        let li = createNode('li');

        li.innerHTML = `<p>${element.title}<br><strong>${element.price}€</strong><br>
            <button type="button" class="btn btn-success" onclick="addToCart(${element.id})">+</button>
            <span class="fw-bold px-3">${checkQuantity(element.id)}</span>
            <button type="button" class="btn btn-danger" onclick="removeFromCart(${element.id})">-</button></p>`;
        append(customerCartList, li);
    });
    viewCartButton.innerHTML = `View cart (${productsInCart.length})`;

    //Local storage stores customer cart
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
}


