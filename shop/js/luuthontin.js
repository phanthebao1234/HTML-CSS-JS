
var userId = localStorage.getItem('Id')
var usersApi = "http://localhost:3000/users";
console.log(userId);
function start() {
    getListUsers(renderUser);
    renderCart()
}

start();

function getListUsers(callback) {
    fetch(usersApi + '/' + userId)
        .then(response => response.json())
        .then(callback)
}

function renderUser(users) {
  var formElement = document.querySelector("#listform");
  var usersArray = []
  usersArray.push(users)
  console.log(users);
  var html = usersArray.map(function(user) {
    return `
        <div class="form-group">
            <label for="exampleInputEmail1">Your name</label>
            <input type="text" placeholder="Nguyen Van A" class="form-control" id="name"
                aria-describedby="emailHelp" value="${user.fullname}" disabled>
            <span class="text-danger" id="errName"></span>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" placeholder="example@gmail.com" class="form-control" id="email"
                aria-describedby="emailHelp" value="${user.email}" disabled>
            <span class="text-danger" id="errMail"></span>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input type="email" placeholder="example@gmail.com" class="form-control" id="password"
                aria-describedby="emailHelp" value="${user.password}" disabled>
            <span class="text-danger" id="errMail"></span>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Password Confirmation</label>
            <input type="email" placeholder="example@gmail.com" class="form-control" id="password_confirmation"
                aria-describedby="emailHelp" value="${user.password_confirmation}" disabled>
            <span class="text-danger" id="errMail"></span>
        </div>
        <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" onclick="handleUpdateUser(${user.id})" type="button" id="update">Chỉnh sửa thông tin</button>
            
        </div>

        `
  });

  formElement.innerHTML = html.join('')
}

function handleUpdateUser(id, callback) {
    var nameElement = document.getElementById('name').removeAttribute('disabled')
    var emailElement = document.getElementById('email').removeAttribute('disabled')
    var passwordElement = document.getElementById('password').removeAttribute('disabled')
    var passwordconfirmElement = document.getElementById('password_confirmation').removeAttribute('disabled')

    var nameValue = document.querySelector("#name").value
    var emailValue = document.querySelector("#email").value
    var passwordValue = document.querySelector("#password").value
    var passconfirmValue = document.querySelector("#password_confirmation").value

    var updateElement = document.querySelector("#update")

    //tạo btn save
    

    updateElement.textContent = 'Lưu thông tin';
    updateElement.id = 'savedata'

    var saveData = document.getElementById('savedata')
    saveData.onclick
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            fullname: nameValue,
            email: emailValue,
            password: passwordValue,
            password_confirmation: passconfirmValue
            
        })
    }
    fetch(usersApi + '/' +id, options)
        .then(response =>response.json)
        .then(callback);

    
}


//render giỏ hàng

function renderCart() {
  let userCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) : [];
  var tableContent;
  var htmls = userCart.map(function (value, index) {
    return `<tr>
      <td scope="row">${index + 1}</td>
      <td>${value.tensanpham}</td>
      <td><img src="./images/${value.anhsanpham}" width="50%" class="mx-auto d-block" style="width: 200px"></td>
      <td>${value.giasanpham} VNĐ</td>
      <td>
        <button class="btn btn-primary" onclick="deleteCart(${index})">Delete</button>
      </td>
    </tr>`
  })
  console.log(typeof userCart.giasanpham);
  document.getElementById('cart').innerHTML = htmls.join('');
}


function deleteCart(key) {
  let userCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) : [];
  if (confirm("Bạn có chắc muốn xóa không ?")) {
    userCart.splice(key, 1);
  }
  localStorage.setItem('cart', JSON.stringify(userCart));
  renderCart()
}