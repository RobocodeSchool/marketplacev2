let productForm = document.getElementById('add_product_form');

productForm.addEventListener('submit', function(event){
    event.preventDefault();
    let data = JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    });

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "https://market-6d33.restdb.io/rest/products");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "61b3ca4f72a03f5dae8222ad");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
})

let orders = document.getElementById('admin_page_orders');

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://market-6d33.restdb.io/rest/orders");
xhr.responseType = 'json'
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "61b3ca4f72a03f5dae8222ad");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.onload = function() {
    xhr.response.forEach(function(order){
        orders.innerHTML += `
            <h2>Order ${order._id}</h2>
            <p><b>Status:</b> ${order.status}</p>
            <p><b>Customer name:</b> ${order.name}</p>
            <p><b>Address:</b> ${order.address}</p>
            <p><b>Phone:</b> ${order.phone}</p>
            <p><b>Post Office Number:</b> ${order.post_number}</p>
        `;  
        let sum = 0;
        order.products.forEach(function(p){
            orders.innerHTML += `
                <p><img height="50" src="${p.photo_url}"> ${p.name} |${p.price}$</p>
            `;
            sum += +p.price;
        });
        orders.innerHTML += `
        <p>Total Price: ${sum}$</p> 
        <button>Mark as Completed</button> 
        <hr>
        `;
    })
}

xhr.send();