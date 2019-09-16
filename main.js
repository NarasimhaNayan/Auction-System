const form = document.querySelector('.get')
const display = document.querySelector('.data');

form.addEventListener('click', () => {
    const url = "http://localhost:9000/products"
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
            let ok = data.products
            console.log(ok)
            ok.forEach((item) => {
                display.innerHTML += `<div class="card col-lg-4 col-md-4 col-sm-6" >
                    <img src="./${item.productImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Product</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">${item.name}</li>
                      <li class="list-group-item">${item.price}</li>
                    </ul>
                    <div class="card-body">
                      <a href="http://localhost:9000/products/${item._id}" class="card-link">Product Details</a>
                                      </div>
                  </div>`
            })
        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })
})