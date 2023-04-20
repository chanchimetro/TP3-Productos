const loadAllItems = () => {
    axios.get('https://dummyjson.com/products')
        .then(response => {
            console.log(response);
            const itemList = document.getElementById("catalog");

            response.data.products.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.setAttribute("style", "width: 18rem;");
                card.innerHTML = `<img src="${item.images[4]}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>`;

                itemList.appendChild(card);
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

loadAllItems();