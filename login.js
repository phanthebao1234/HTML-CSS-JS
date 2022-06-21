// Get the modal
var modal = document.getElementById('id01');
    
// Khi người dùng nhấp vào bất kỳ đâu bên ngoài phương thức, hãy đóng nó
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var usersApi = 'http://localhost:3000/users';

var loginBtn = document.getElementById('login')

fetch(usersApi)
    .then(response => response.json())
    .then(function(users){
        loginBtn.onclick = function (e) {
            var userValue = document.querySelector('#userlogin').value
            var passValue = document.querySelector('#passwordlogin').value
            var errorElement = document.querySelector('#error');
            console.log(userValue);
            e.preventDefault();
            console.log(users);
           
            for (const user of users){
                
                var dataEmail = user.email;
                var dataPassword = user.password;
                var dataId = user.id;
                var data = new Object();

                data.email = dataEmail;
                data.password = dataPassword;
                data.id = dataId;
                localStorage.setItem("Id", data.id);
                if (userValue === data.email && passValue === data.password) {
                    errorElement.innerHTML = `Đăng nhập thành công, bấm vào <a href="./shop/shop.html">đây để chuyển trang</a>`;
                }
                else {
                    errorElement.innerText = 'Tài khoản hoặc mật khẩu đăng nhập sai...'
                }
            }
        }
    })