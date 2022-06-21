//Hiện thời gian hiện tại

var timeElement = document.getElementById('time')
const getDate = new Date()
let day = getDate.getDay()
var date = getDate.getFullYear()+'-'+(getDate.getMonth()+1)+'-'+getDate.getDate()
var time = getDate.getHours() + ":" + getDate.getMinutes() + ":" + getDate.getSeconds()
var dateTime = date+' '+time;

switch (day) {
    case 0:
        timeElement.innerText = `Sunday, ${dateTime}`
        break;
    case 1:
        timeElement.innerText = `Monday, ${dateTime}`
        break;
    case 2:
        timeElement.innerText = `Tuesday, ${dateTime}`
        break;
    case 3:
        timeElement.innerText = `Wednesday, ${dateTime}`
        break;
    case 4:
        timeElement.innerText = `Thursday, ${dateTime}`
        break;
    case 5:
        timeElement.innerText = `Friday, ${dateTime}`
        break;
    case 6:
        timeElement.innerText = `Saturday, ${dateTime}`
        break;
    default:
        break;
}
