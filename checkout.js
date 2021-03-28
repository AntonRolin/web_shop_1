let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
const tbody = document.getElementById('productCheckoutTable');
const totalprice = document.getElementById('totalprice');
const orderbtn = document.getElementById('orderbtn');
const emptyCartMessage = document.getElementById('emptyCartMessage');
let uniqueProductChecker = [];

loadTable();
/**
 * Loads the products from cart in localStorage and displays them in a table
 */
function loadTable(){
    productsInCart.forEach(product => {
        if(checkUniqueID(product.id)){

            let tr = createNode('tr');
            let td1 = createNode('td');
            let td2 = createNode('td');
            let td3 = createNode('td');
            let td4 = createNode('td');
            
            td1.innerHTML = product.title;
            td2.innerHTML = `<img src="${product.image}" alt="Produktbild" ">`;
            td3.innerHTML = `<strong>${product.price}€</strong>`;
            td4.innerHTML = checkQuantity(product.id);
            
            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tr, td4);
            append(tbody, tr);
    }});
    totalprice.innerHTML = `Total Price: ${getTotalPrice()}€`;
}

function checkUniqueID(id){
    let notUnique = true;
    uniqueProductChecker.forEach(element => {
        if(element == id){
            notUnique = false;
        }
    });

    if(notUnique){
        uniqueProductChecker.push(id);
        return true;
    }
}

function getTotalPrice(){
    let sum = 0;
        for(let i = 0; i < productsInCart.length; i++){
            sum += productsInCart[i].price;
        }
    return Math.round(sum);
}
/**
 * Validates that all inputs are correct, and that you have added products to the cart whenever you press the "order" button
 */
function order(){
    let firstName = checkInputName(document.getElementById('inputFirstName'));
    let lastName = checkInputName(document.getElementById('inputLastName'));
    let email = checkInputEmail(document.getElementById('inputEmail'));
    let phone = checkInputPhone(document.getElementById('inputPhoneNumber'));
    let address = checkInputAddress(document.getElementById('inputAddress'));

    if(productsInCart == null){
        emptyCartMessage.innerHTML = "You can't order with an empty cart";
    }
    else{
        emptyCartMessage.innerHTML = "";

    if(firstName){
        if(lastName){
            if(email){
                if(phone){
                    if(address){
                        window.location.href = "order_complete.html";
                        localStorage.clear();
                    }
                }
            }
        }
    }
}
}

function checkInputName(name){
    if(name.value.length > 0){
        name.style.borderColor = "green";
        document.getElementById(name.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        name.style.borderColor = "red";
        document.getElementById(name.getAttribute('aria-describedby')).innerHTML = "Field is empty.";
        return false;
    }
}

function checkInputEmail(email){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.value.match(mailformat)){
        email.style.borderColor = "green";
        document.getElementById(email.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        email.style.borderColor = "red";;
        document.getElementById(email.getAttribute('aria-describedby')).innerHTML = "Invalid e-mail format.";
        return false;
    }
}

function checkInputPhone(phone){
    var phoneformat = /^\d{10}$/;
    if(phone.value.match(phoneformat)){
        phone.style.borderColor = "green";
        document.getElementById(phone.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        phone.style.borderColor = "red";
        document.getElementById(phone.getAttribute('aria-describedby')).innerHTML = "Has to be 10 digits. Spaces and dashes not allowed.";
        return false;
    }
}

function checkInputAddress(address){
    if(address.value.length > 0){
        address.style.borderColor = "green";
        document.getElementById(address.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        address.style.borderColor = "red";
        document.getElementById(address.getAttribute('aria-describedby')).innerHTML = "Field is empty.";
        return false;
    }
}