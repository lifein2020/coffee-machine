"use strict";
let state = "waiting"; //глобальная переменная
let progressBar = document.querySelector(".progress-bar");

let cupImg = document.querySelector(".coffee-cup img"); //глобальная переменная, ищем кружку
cupImg.onclick = takeCoffee; //  вешаем на кружку событие - функцию нажатия на кофе, takeCoffee - тело функции, саму функцию опишем ниже

function buyCoffee(name, price, element) {
  if (state != "waiting") {
    return;
  }
  let balanceInput = document.querySelector("input[placeholder='Баланс']");
  
  if (+balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.background = "red" // обращаемся из JS к CSS
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = "";
    state = "cooking";
    cookCoffee(name, element);
  }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится");
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
  
  cupImg.setAttribute('src', cupSrc);
  cupImg.classList.remove('d-none');
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%";
    cupImg.style.opacity = i + "%"; // кружка появляется при заказе
    if (i==110) {
      clearInterval(interval);
      changeDisplayText("Ваш " + name + " готов!");
      cupImg.style.cursor = "pointer";
      state = "ready";
    }
  }, 50);
}

function takeCoffee() {
  if (state != "ready") {
    return;
  }
  state = "waiting";
  cupImg.style.opacity = 0;
  cupImg.style.cursor = ""; // "" к прежнему значению
  cupImg.classList.add("d-none");
  changeDisplayText("Выберите кофе");
  progressBar.style.width = 0;
} 

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text; // обращаемся к внутреннему содержимому переменной displayText и записывает туда параметр text
}

//----------Купюры---------

let bills = document.querySelectorAll('.bills img');
for (let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney; // повесили событие сразу на все купюры
  /* bills[i].onmousedown = function (event) {
    takeMoney(event);
  } второй способ вешания события */
}

function takeMoney(event) {
  // alert("Вы нажали на купюру");
  //console.log(event)
  event.preventDefault(); // вызываем метод preventDefault объекта event. Функция preventDefault () - прерывание действия по умолчанию.
  //console.log(this) либо
  let bill = event.target;//цель события - возвращает элемент на который мы нажали
  
  bill.style.position = "absolute"; //чтобы двигать по всей странице, absolute вытягивает элемент из DOM-дерева, следовательно их позиции сбрасываются и они накладываются друг на друга при нажатии
  bill.style.transform = "rotate(90deg)";
  bill.style.margin = 0;
  
    let billCoords = bill.getBoundingClientRect(); //вернет размер элемента(купюры) в зависимости от величины экрана
    let billWidth = billCoords.width;
    let billHeight = billCoords.height;
    // console.log(event.clientX, event.clientY); //clientX clientY отображают положение курсора при нажатии на мышь по оси X,Y на экране без привязки полосам прокрутки
    
    bill.style.top = event.clientY - billWidth/2 + "px";// при нажатии на купюру её центр совпадает с курсором
    bill.style.left = event.clientX - billHeight/2 + "px";// когда элемент переворачивается на 90гр.( rotate(90deg) ) оси x y меняются местами
    
    window.onmousemove = function(event) { // отловили передвижение мыши по всему экрану, чтобы знать где в текущий момент мышь и подгонять предыдущие значения под текущее положение мыши
      bill.style.top = event.clientY - billWidth/2 + "px";
      bill.style.left = event.clientX - billHeight/2 + "px";
    }
    
    bill.onmouseup = function () { // отжатие мыши
      window.onmousemove = null; // чтобы купюра не двигилась за мышью
      console.log(inAtm(bill) );
    }
    
}

function inAtm(bill) {
  let atm = document.querySelector('.atm img');
  
  let atmCoords = atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y};
  let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y};
  
  // определяем область ATM, куда должна "вставляться" купюра. Получаем значения по X, Y.
  let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y};
  let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y};
  let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3 };
  
  // Сравниваем значения по X купюры и ATM
  if (billLeftTopCorner.x > atmLeftTopCorner.x
      && billRightTopCorner.x < atmRightTopCorner.x
      && billLeftTopCorner.y > atmLeftTopCorner.y
      && billLeftTopCorner.y < atmLeftBottomCorner.y
    ) {
      return true;
    } else {
      return false;
    }
  
}

// Как отключить стандартное браузерное событие(призрак купюры), которое висит onmousedown. Любое событие (onmousedown и пр.) автоматически передает в функцию первым параметром event-событие. Чтобы его отловить, укажем в скобках. Т.е. любое событие содержит в себе по умолчанию event.