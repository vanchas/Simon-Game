const wrapper = document.querySelector('.wrapper');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const start = document.querySelector('.start');
const btnCollection = document.querySelectorAll('.btn');
const display = document.querySelector('.display');

let sequence = [];
    
function bright(btn) {
  btn.style.opacity = '1';
  if (btn.value == 'red') sequence.push( btn.value );
  if (btn.value == 'blue') sequence.push( btn.value );
  if (btn.value == 'yellow') sequence.push( btn.value );
  if (btn.value == 'green') sequence.push( btn.value );
  setTimeout(() => {
    btn.style.opacity = '0.5';
  }, 500);  
  console.log(sequence);
}

function randomBtn() {
  let randomNumber = (Math.random() * (4 - 1) + 1).toFixed();
  for (let btnItem of btnCollection) {
    if (btnItem.getAttribute('data-id') == parseInt(randomNumber)) {
      bright(btnItem);
    }
  }
}

let counter = [];
let timer = 1;

function startLevel() {
  counter.push(1);
  counter.forEach(() => { 
    setTimeout(() => {
      randomBtn();
    }, timer++ * 1000);
  });
}

start.addEventListener('click', () => {
  counter = [];
  sequence = [];
  timer = 1;
  display.innerText = '';
  startLevel();
});

function newLevel(event) {
  if (sequence.length == false) {
    startLevel();
    display.append('New level');
    setTimeout(() => {
      display.innerText = '';
    }, 800);
    timer = 1;
  }
}

function checkGameOver() {
  if (event.target.value != sequence[0]) {
    display.textContent = 'false. Game over!';
    setTimeout(() => {
      display.innerText = '';
      display.innerHTML = `Your score: 
        ${counter.length - 1}`;
    }, 1000);
  } else {
    sequence.shift();
    newLevel();
  }
}

wrapper.addEventListener('click', event => {
  checkGameOver();
});