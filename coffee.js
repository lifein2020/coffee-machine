"use strict";

let balanceInput = document.querySelector("input[placeholder='Баланс']");

function buyCoffee(name, price, element) {

  if (+balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.background = "red" // обращаемся из JS к CSS
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = "";
    cookCoffee(name, element);
  }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится");
  let progressBar = document.querySelector(".progress-bar");
  console.log(progressBar);
}

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text; // обращаемся к внутреннему содержимому переменной displayText и записывает туда параметр text
}


