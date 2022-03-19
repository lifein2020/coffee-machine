"use strict";
//global variables
let state = "waiting"; 

let progressBar = document.querySelector(".progress-bar");
let balanceInput = document.querySelector("input[placeholder='Balance sheet']");
let cupImg = document.querySelector(".coffee-cup img"); //find cup
cupImg.onclick = takeCoffee; //  hang an event on a cup - the function of clicking on coffee

function buyCoffee(name, price, element) {
  if (state != "waiting") {
    return;
  }
  
  if (+balanceInput.value < price) {
    changeDisplayText("Insufficient funds");
    balanceInput.style.background = "red" 
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = "";
    balanceInput.style.background = ""; // the input changes color to the original one if the balance is greater than the price
    state = "cooking";
    cookCoffee(name, element);
  }

}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Your " + name + " is being prepared");
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
  
  cupImg.setAttribute('src', cupSrc);
  cupImg.classList.remove('d-none');
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%";
    cupImg.style.opacity = i + "%"; // cup appears when ordering
    if (i==110) {
      clearInterval(interval);
      changeDisplayText("Your " + name + " is ready!");
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
  cupImg.style.cursor = ""; // "" means to the previous value
  cupImg.classList.add("d-none");
  changeDisplayText("Select coffee");
  progressBar.style.width = 0;
} 

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text; // we access the internal content of the displayText variable and write the text parameter there
}

// ---------- Banknotes ---------

let bills = document.querySelectorAll('.bills img');
for (let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney; // hung the event on all banknotes at once
}

function takeMoney(event) {
  //console.log(event)
  event.preventDefault(); // call the preventDefault method of the event object. The preventDefault() function is to interrupt the default action.
  //console.log(this) or
  let bill = event.target; // event target - returns the element we clicked on
  
  bill.style.position = "absolute"; // to move across the page, absolute pulls the element out of the DOM tree, so their positions are reset and they overlap when clicked
  bill.style.transform = "rotate(90deg)";
  bill.style.margin = 0;
  
  let billCoords = bill.getBoundingClientRect(); // will return the size of the element (banknote) depending on the size of the screen
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
  // console.log(event.clientX, event.clientY); // display the position of the cursor when the mouse is pressed along the X, Y axis on the screen without binding to the scroll bars
    
  bill.style.top = event.clientY - billWidth/2 + "px";// when you click on a banknote, its center coincides with the cursor
  bill.style.left = event.clientX - billHeight/2 + "px";// when the element is rotated 90deg.( rotate(90deg) ) the x and y axes are swapped
    
  window.onmousemove = function(event) { // caught mouse movement across the entire screen in order to know where the mouse is at the current moment and adjust the previous values ​​to the current mouse position
    bill.style.top = event.clientY - billWidth/2 + "px";
    bill.style.left = event.clientX - billHeight/2 + "px";
  }
    
  bill.onmouseup = function () { 
    window.onmousemove = null; // so that the banknote comes off the mouse when moving
    if ( inAtm(bill) ) { // if the bill got into atm
      let billCost = +bill.getAttribute('cost');
      balanceInput.value = +balanceInput.value + billCost;
      bill.remove();
      balanceInput.style.background = ""; // the input changes color to the original one when a bill enters the receiver
    }
  }
    
}

function inAtm(bill) {
  let atm = document.querySelector('.atm img');
  
  let atmCoords = atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y};
  let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y};
  
  // we define the ATM area where the bill should be "inserted". We get values for X, Y.
  let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y};
  let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y};
  let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3 };
  
  // Compare values for X bills and ATM
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

// -------- Change --------

let changeButton = document.querySelector(".change-btn");

changeButton.onclick = function () {
  let changeBox = document.querySelector(".change-box");
  let coins = changeBox.querySelectorAll("img");
  if (coins.length == 0) {
    if(balanceInput.value == 0) {
      return;
    }
    changeButton.innerHTML = "Get change";
    takeChange();
  } else{
    // Take all coins
    changeButton.innerHTML = "Your change";
    for (let i = 0; i < coins.length; i++) {
      coins[i].remove();
    }
  }
}

function takeChange() {
  if(balanceInput.value == 0) {
    return;
  }
  if (balanceInput.value >=10) {
    balanceInput.value -= 10;
    tossCoin("10");
    takeChange();
  }else if (balanceInput.value >=5) {
    balanceInput.value -= 5;
    tossCoin("5");
    takeChange();
  }else if (balanceInput.value >=2) {
    balanceInput.value -= 2;
    tossCoin("2");
    takeChange();
  }else {
    balanceInput.value -= 1;
    tossCoin("1");
    takeChange();
  }
}

function tossCoin(cost) { // dumps coins into a div with class .change-box
  let imgSrc  = ""; // allows you to see what is supposed to put in a variable
  switch (cost) { 
    case "10":
      imgSrc = "img/10rub.png";
      break;
    case "5":
      imgSrc = "img/5rub.png";
      break;
    case "2":
      imgSrc = "img/2rub.png";
      break;
    case "1":
      imgSrc = "img/1rub.png";
      break;
  }
  let changeBox = document.querySelector(".change-box"); 
  changeBox.style.position = "relative";
  
  let changeBoxCoords = changeBox.getBoundingClientRect();
  let randomWidth = getRandomInt(0, changeBoxCoords.width - 50);
  let randomHeight = getRandomInt(0, changeBoxCoords.height - 50);// 50 the width of the image so that it fits within the width of the image
  console.log(randomWidth, randomHeight);
  
  let coin = document.createElement("img"); // creates an element of the tag (img), which we enter into the parameters
  coin.setAttribute('src', imgSrc);
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";
  coin.style.top = randomHeight + "px";
  coin.style.left = randomWidth + "px";
  
  changeBox.append(coin); // append - add a coin element to the end of the previous (parent) changeBox element.
  coin.onclick = function() { // Check how many coins are left in the container
    coin.remove();
  }
  
}

function getRandomInt(min, max) { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Maximum not included, minimum included
}

