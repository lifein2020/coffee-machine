"use strict" 
//работа начинается с поиска элементов в DOM дереве
// window.document.documentElement.body
// Изучаем методы спускающиеся вниз

//---------Устаревшие методы---------
/* let coffeeMachine = document .getElementById("coffee"); // Поиск по ID спускаясь по DOM дереву начиная с body, который содержится в document
console.log(coffeeMachine);
let images = document.getElementsByTagName("img"); // поиск по тэгу
console.log(images);
let coffeeItems = document.getElementsByClassName("coffee-item"); // поиск по классу
console.log(coffeeItems);
let firstImage = coffeeItems[0].getElementsByTagName("img");
console.log(firstImage[0]); */
// -----------------------------------

// -------------Современные методы------
// querySelector - для поиска одного элемента или одного из
// querySelectorAll - для поиска сразу всех элементов (коллекцию элементов)

/* let coffeeMachine = document.querySelector("#coffee"); //используем селектор для поиска по ID
console.log(coffeeMachine);
let image = document.querySelector("img"); // поиск по тэгу. Если querySelector видит несколько элементов с одинаковым селекторам то возвращает только первый который найдет
console.log(image);
let coffeeItems = document.querySelectorAll(".coffee-item"); // поиск по классу
console.log(coffeeItems);

// Находим все картинки внутри div с классом .coffee-item
let itemImages = document.querySelectorAll(".coffee-item img");
console.log(coffeeItems);

//Выводим коллекцию картинок с кружками (из .coffee-item и .coffee-cup)
let cupImages = document.querySelectorAll(".coffee-item img, .coffee-cup img");
console.log(cupImages); */
//------------------------------------
//--------------Работа с элементами-----
// 1. Изменение свойств css
// Напримет перекрасим рамку
/* let coffeeMachine = document.querySelector(".coffee-machine");
coffeeMachine.style.border = "10px solid darkblue"; // coffeeMachine - элемент, style - свойство в css, border - название css свойства = "присваиваем новые параметры"

// Если свойство состоит из нескольких слов, то превращается в верблюжью нотацию:
coffeeMachine.style.borderRadius = "25px";

//Задаем свойство:
coffeeMachine.style.position = "absolute"; 
coffeeMachine.style.top = "15px"; // подвинуть позицию элемента сверху на 15 пикселей
coffeeMachine.style.left = "150px"; // подвинуть слева на 150px

// Получить свойство чтобы делать вычисления с ним:
let coffeeMachineTop = coffeeMachine.style.top; // записываем в переменную 15px
console.log(parseInt(coffeeMachineTop) ); // parseInt отрезает px от 15px */

//--------Изменение атрибутов-------
// работаем с input Баланс
/* let balance = document.querySelector("input[type='text']"); 
 let balanceType = balance.getAttribute("type");
console.log(balanceType);
balance.setAttribute("type", "date"); // теперь вместо ввода текста календарь

// Проверить существует ли такой атрибут вообще методом hasAttribute

console.log(balance.hasAttribute("placeholder") );

//Удалить атрибут
balance.removeAttribute("aria-label"); 

// Обратились к атрибуту value как к свойству объекта balance. Так можем только в отношении уже существующих атрибутов(вложенных в стандартный HTML), но не к атрибутам которые можем сами создавать:
balance.value = 500; // == balance.setAttribute('value', 500);
console.log(balance.value); // == balance.getAttribute('value');
/*К собственным атрибутам обращаемся только так:
balance.setAttribute('value', 500);
balance.getAttribute('value'); */

//-----------Изменение классов-------
/* let changeButton = document.querySelector(".btn");
console.log(changeButton.classList);
changeButton.classList.remove("btn-primary"); // btn-primary голубой цвет
changeButton.classList.add("btn-success"); // btn-success зеленый цвет

// changeButton.classList.toggle("ml-5") // Вкл / Выкл событие, в данном случае движение кнопки вправо ml-5 (margin left 5)

let displayText = document.querySelector(".display-text");
console.log( displayText.innerHTML );// получаем внутреннее содержание тэга р
console.log( displayText.innerText );
//displayText.innerHTML = "<b>Готовим кофе</b>";
displayText.innerText = "<b>Готовим кофе</b>"; // меняем содержимое тэга*/
//-----События и слушатели событий-----
// события click mouseover mouseup mousemove ...
// 1. Повесить событие с помощью атрибута. (Будем обращаться к файлу индекс для svetofor.)
// Атрибут содержится в тэге. Есть атрибуты слушателей событий. Вешают слушателей событий: onclick, onmouseover

// Ключевое слово this - возвращает объект, к которому обращено свойство или метод (см index.php)
// <div class="coffee-item" onclick="buyCoffee('Американо', 50, this)">
// то же самое
  /*let elem = document.querySelectorAll(".coffee item");
  elem[1].onclick = function () {
    buyCoffee('Американо', 50, this);
  } */
  
  //------- Планирование---------
  // в learn.javascript.ru часть 1, Продвинутая работа с функциями, 6.8
  // таймаут
  /* let timeout = setTimeout(paintBody, 5000, 'aqua');
  
  let changeButton = document.querySelector(".btn");
  changeButton.onclick = function () {
    clearTimeout(timeout);
  }
/*setTimeout(function() {
  paintBody();
}, 5000); // либо см ниже */

/* function paintBody(color) {
  document.body.style.background = color;
} */



let interval = setInterval(trashConsole, 1000);
let changeButton = document.querySelector(".btn"); // нашли кнопку
changeButton.onclick = function () { // повесили на кнопку событие
  clearInterval(interval); //при нажатии на кнопку очищается интервал и соотв. перестает работать
}

function trashConsole(){
  console.log(Math.random());
} 






