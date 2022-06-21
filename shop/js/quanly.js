var productApi = 'http://localhost:3000/products'

function start() {
    getProduct(renderProduct)
    handleCreateProduct()
    
}

start();

function getProduct(callback) {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}


function renderProduct(products) {
    
        var divElement = document.querySelector('#listproduct');
        var htmls = products.map(function (product) {
            return `
            <div class="col-6 col-xl-3 product-item-${product.id}" >
                <div class="noidungsanpham shadow p-3 mb-5 bg-body rounded ">
                    <div class="tag">
                        ${product.tag}
                    </div>
                    <div class="img">
                        <a href="#">
                            <img src="./images/${product.image}" alt="${product.image}">
                        </a>
                    </div>
                    <h1 class='name'>
                        <a href="#">${product.name}</a>
                    </h1>
                    
                    <h3 class='price'>
                        <span>${product.price}</span>
                    </h3>
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" id="delete" onclick="handleDeleteProduct(${product.id})">Delete</button>
                        <button class="btn btn-primary" type="button" id="update" onclick="handleUpdateProduct(${product.id})">Edit</button>
                    </div>
                </div>
            </div>
            `

        })

        divElement.innerHTML = htmls.join('')
    
}

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(productApi, options)
        .then(response => response.json())
        .then(callback)
}
function handleDeleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        
    }
    fetch(productApi + '/' + id, options)
        .then(response => response.json())
        .then(function () {
            var productItem = document.querySelector('.product-item-' + id)
            if (productItem) {
                productItem.remove()
            }
        })
}

function handleCreateProduct() {
    var addBtn = document.querySelector('#add')
    addBtn.onclick = function() {
        var tagValue = document.querySelector('#tag').value
        var nameValue = document.querySelector('#name').value
        var imgValue = document.querySelector('#img').value
        var priceValue = document.querySelector('#price').value
        

        var formData = {
            tag: tagValue,
            name: nameValue,
            image: imgValue,
            price: priceValue
        }

        createProduct(formData, function(){
            getProduct(renderProduct)
        })
    }
}

function handleUpdateProduct(id, data) {
    var productItem = document.querySelector('.product-item-' + id);
    var tagValue = productItem.querySelector('.tag').textContent.trim();
    var nameValue = productItem.querySelector('.name').textContent.trim();
    var imgValue = productItem.querySelector('.img').querySelector('img').alt;
    var priceValue = productItem.querySelector('.price').querySelector('span').textContent.trim();
    var addBtn = document.querySelector('#add')
    addBtn.removeAttribute('id');
    addBtn.innerText = 'Save';
    addBtn.id = 'save';
    console.log(productItem, tagValue, nameValue, imgValue, priceValue);
    


    //input form
    var inputTag = document.querySelector('#tag')
    var inputName = document.querySelector('#name')
    var inputImg = document.querySelector('#img')
    var inputPrice = document.querySelector('#price')

    inputTag.value = tagValue
    inputName.value = nameValue
    inputImg.value = imgValue
    inputPrice.value = priceValue

    handleSaveProduct(id)
}

function handleSaveProduct(id) {
    var saveBtn = document.getElementById('save')
    saveBtn.onclick = function () {
        var tagValue = document.querySelector('#tag').value
        var nameValue = document.querySelector('#name').value
        var imgValue = document.querySelector('#img').value
        var priceValue = document.querySelector('#price').value
        

        var formData = {
            tag: tagValue,
            name: nameValue,
            image: imgValue,
            price: priceValue
        }

        var options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData)
        }
        fetch(productApi + '/' + id, options)
            .then(response => response.json())
            .then(function() {
                getProduct(renderProduct)
            });
        
        var tagValue = document.querySelector('#tag').value = '';
        var nameValue = document.querySelector('#name').value = '';
        var imgValue = document.querySelector('#img').value = '';
        var priceValue = document.querySelector('#price').value = '';
        
        window.location.reload()
            
    }

    
}