const loadAllItems = () => {
    axios.get('https://dummyjson.com/products')
        .then(response => {
            console.log(response);
            renderCatalog(response.data.products);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = (e) => {
    const searchQuery = document.getElementById("searchQuery").value;
    e.preventDefault();
    axios.get('https://dummyjson.com/products/search', {
        params: {
            q: searchQuery
        }
    })
        .then(function (response) {
            console.log(response);
            renderCatalog(response.data.products);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const renderCatalog = (content) => {
    const catalog = document.getElementById("catalog");

    content.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-md-2");
        card.innerHTML = `<div class="card h-100" style="">
        <img src="${item.thumbnail}" class="card-img-top" alt="No Image Available">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.rating}/5 ⭐</p>
        </div>
        <div class="card-footer">
        <a href="#" class="btn btn-primary">Show details</a>
        </div>
        </div>`;

        catalog.appendChild(card);
    });
}

loadAllItems();