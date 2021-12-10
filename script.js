let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://market-6d33.restdb.io/rest';

xhr.open('GET',url + '/products');

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "61b3ca4f72a03f5dae8222ad");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType = 'json'
xhr.onload = function() {
    productsArray = xhr.response
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
        productsArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('product');
        pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-price'><b>Price: </b>${p.price}$</p>
            <p class='product-description'><b>Description: </b>${p.description}</p>
            <button onclick="addProductToCart(${p.id})">Buy</button>
        `;
        productsGrid.append(pElem);
    });
}
xhr.send();

// CART ----------------

let cartProd = document.getElementById('cart-products');

let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}


function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p.id == id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button').classList.remove('active');
    },500);
}

function drawCartProducts() {
    if(cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p){
        cartProd.innerHTML += `
            <p><img src="${p.photo_url}"> ${p.name} |${p.price}$</p>
            <hr>
        `;
        sum += p.price;
    });
    cartProd.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}

function buyAll() {
    cart = [];
    cartProd.innerHTML = 'Money was withdrawn from your credit card';
    localStorage.setItem("cart", '[]');
}

function openCart() {
    cartProd.classList.toggle('hide');
}