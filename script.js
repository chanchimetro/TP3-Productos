let itemSkip = 0;

const getCategories = () => {
    axios.get('https://dummyjson.com/products/categories')
        .then(response => {
            console.log(response);
            renderCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const getItemInfo = () => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    itemId = searchParams.get('id');
    axios.get(`https://dummyjson.com/products/${itemId}`)
        .then(response => {
            console.log(response.data);
            renderListing(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const loadAllItems = () => {
    axios.get('https://dummyjson.com/products', {
        params: {
            skip: itemSkip
        }
    })
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

const getByCategory = (cat) => {
    axios.get(`https://dummyjson.com/products/category/${cat}`)
        .then(response => {
            console.log(response);
            renderCatalog(response.data.products);
        })
        .catch(function (error) {
            console.log(error);
        })
    
}

const renderCatalog = (content) => {
    const catalog = document.getElementById("catalog");
    const productQ = document.getElementById("productQ");
    catalog.innerHTML = "";
    productQ.innerHTML = content.length;
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
        <a href="./listing.html?id=${item.id}" class="btn btn-primary">Mostrar detalles</a>
        </div>
        </div>`;

        catalog.appendChild(card);
    });
}

const renderCategories = (cats) => {
    const catList = document.getElementById("catList");
    catList.innerHTML = "";
    cats.forEach(cat => {
        const catLi = document.createElement("li");
        catLi.innerHTML = `<a class="dropdown-item" onclick="getByCategory('${cat}')">${cat}</a>`
        catList.appendChild(catLi);
    });
}

const renderListing = (product) => {
    const carousel = document.getElementById("carouselInner");
    const brandCat = document.getElementById("brandCat");
    const title = document.getElementById("productTitle");
    const desc = document.getElementById("productDesc");
    const price = document.getElementById("productPrice");

    product.images.forEach(img => {
        console.log(img);
        const imgCont = document.createElement("div");
        imgCont.classList.add("carousel-item");
        imgCont.classList.add("active");
        imgCont.innerHTML = `<img src="${img}" class="d-block w-100 rounded" alt="No image available">`;
        carousel.appendChild(imgCont);
    });
    brandCat.innerHTML = `${product.category} - ${product.brand}`;
    title.innerHTML = `${product.title}`;
    desc.innerHTML = `${product.description}`;
    price.innerHTML = `$ ${product.price}`;
}