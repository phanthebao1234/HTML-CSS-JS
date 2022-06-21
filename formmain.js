//Dối tượng validator
function Validator(options) {

    var selectorRules = {};

    //xóa lỗi validate
    function removeMess(inputElement) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        errorElement.innerText = "";
        inputElement.parentElement.classList.remove('invalid')
    }
    //hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage;

        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        //lặp qua từng rules và kiểm tra
        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)

            //nếu có lỗi sẽ dừng việc kiểm tra
            if (errorMessage) {
                break;
            }

            return !errorMessage
        }


        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            removeMess(inputElement);
        }
    }
    //lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    if (formElement) {
        //khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;


            //Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                console.log('Khong co loi');
                if (typeof options.onSubmit === 'function') {

                    var enabledInput = formElement.querySelectorAll('[name]');

                    //vì enabledInput là 1 Nodelist không phải là 1 mảng nên ta phải chuyển qua mảng
                    var formValues = Array.from(enabledInput).reduce(function (values, input){
                        values[input.name] = input.value
                        return values;
                    },{});

                    options.onSubmit(formValues)
                   
                }
                
            }
            else {
                console.log('Co loi');
            }

        }

        options.rules.forEach(function(rule) {
            
            //lưu lại các rules cho mỗi input 
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                //Xử lý khi người dùng blur ra ngoài 
                inputElement.onblur = function() {
                   validate(inputElement, rule)
                }

                //Xử lý khi người dùng nhập giá trị
                inputElement.oninput = function() {
                    removeMess(inputElement)
                }
            }
        });
        // console.log(selectorRules);
    }
    
}

//Định nghĩa các luật lệ khi nhập form
//Nguyên tắc các rules: 
//1. Nếu không nhập thì xuất ra message lỗi
//2. Nếu hợp lệ thì không xuất ra gì cả hoặc có thể là undefined
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test : function(value){
            return value.trim() ? undefined : message || "Vui lòng nhập trường này."
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || "Vui lòng nhập lại"
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Vui lòng nhập tối đa ${min} kí tự`
        }
    }
}

Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác`
        }
    }
}