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


