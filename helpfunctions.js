
function createNode(element){
    return document.createElement(element);
}

function append(parent, element){
    return parent.appendChild(element);
}

function checkQuantity(id){
    let qtity = 0;

    productsInCart.forEach(element => {
        if(element.id === id)
            qtity += 1;
    });
    return qtity;
}

function clearLocalStorage(){
    localStorage.clear();
}