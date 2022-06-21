
//Mua hàng

var tongtien = document.querySelector('#tongtien')
var insertData = document.querySelector('#data')

let arr = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let s = 1,storeprice = 0;


let MuaHang = (tensp, hinhsp, giasp) => {

    var price = parseInt(giasp.replace('.','').replace('.',''));
    
    storeprice += price; //tongtien
    console.log(storeprice);

    let sanpham = {tensanpham:tensp, anhsanpham:hinhsp, giasanpham:giasp};
    arr.push(sanpham);

    
    localStorage.setItem('cart', JSON.stringify(arr));

}

//khi người dùng bấm vào logo cart 
function View(params) {
    
    var insertData = document.querySelector('#data')

    var htmls = arr.map(function(data) {
        return `
        <tr>
            <th>Tên sản phẩm</th>
            <th>Hình sản phẩm</th>
            <th>Giá sản phẩm</th>
        </tr>
        <tr>
            <td>${data.tensanpham}</td>
            <td><img src="./images/${data.anhsanpham}"  width=80% class ='img-fluid mx-auto d-block' style='height:325px'></td>
            <td>${data.giasanpham}</td>
        </tr>
        `

        
    })
    insertData.innerHTML = htmls.join('')
}

//Xử lý với API để hiện sản phẩm

var productApi = 'http://localhost:3000/products'

function start() {
    getProduct(renderProduct)
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
            <div class="col-6 col-xl-3" >
                <div class="noidungsanpham shadow p-3 mb-5 bg-body rounded ">
                    <div class="tag">
                        ${product.tag}
                    </div>
                    <a href="#">
                        <img src="./images/${product.image}" alt="sanpham">
                    </a>
                    <h1>
                        <a href="#">${product.name}</a>
                    </h1>
                    <div class="star" style="font-size: 10px; padding-bottom: 8px;">
                        <p id="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>

                            <span style="color: black">|</span>
                            <span style="color: black">Đã bán ${product.amount}</span>
                        </p>
                    </div>
                    <h3>
                        <span>${product.price} ₫</span>
                    </h3>
                    <div class="cart d-flex justify-content-between align-items-center">
                        <button class="text-uppercase btn border-0 "
                            onclick="MuaHang('${product.name}','${product.image}','${product.price}');">add to
                            cart</button>
                        <a href="#"><i class="fas fa-heart"></i></a>
                    </div>
                </div>
            </div>
            `
        })

        divElement.innerHTML = htmls.join('')
    
}


//Read more
let sukien = document.getElementById("docthem")
let read = document.getElementById("readmore")

let Readmore = () => {  
    
    if (read.style.display === "none") {
        read.style.display = "block"
        
    } else {
        read.style.display = "none"
        
    }
}
