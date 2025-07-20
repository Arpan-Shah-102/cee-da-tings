let startBtn = document.querySelector('.start');
let heading = document.querySelector('.heading');

let testHeading = document.querySelector('.see');
let inputField = document.querySelector('.input');
let scoreField = document.querySelector('.score');
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let testStarted = false;
let score = 0;
let totalRounds = 10;
let gameType = 'normal';
let typeLabel = document.querySelector('.type');

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    heading.style.display = 'none';
    testHeading.textContent = letters[Math.floor(Math.random() * letters.length)];
    inputField.value = '';
    testHeading.style.display = 'block';
    scoreField.style.display = 'block';
    scoreField.textContent = '0/10';
    inputField.style.display = 'block';
    typeLabel.style.display = 'block';
    typeLabel.textContent = `Type: ${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`;
    testStarted = true;
    inputField.focus();
    totalRounds = 10;
    score = 0;
    if (gameType === 'contrast') {
        testHeading.style.color = 'rgb(50, 50, 50)'; // Reset to white text
        document.body.classList.remove('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'grey');
        document.body.classList.add('contrast-bg');
    } else {
        testHeading.style.color = ''; // Reset to default text color
        document.body.classList.remove('contrast-bg');
        if (!document.body.classList.contains('red') && !document.body.classList.contains('orange') && !document.body.classList.contains('yellow') && !document.body.classList.contains('green') && !document.body.classList.contains('blue') && !document.body.classList.contains('purple') && !document.body.classList.contains('pink') && !document.body.classList.contains('brown') && !document.body.classList.contains('black') && !document.body.classList.contains('grey')) {
            document.body.classList.add('white');
        }
    }
    testHeading.style.filter = `blur(0px)`;
    testHeading.style.fontSize = `100pt`;
}

function checkGameOver() {

    if (gameType === 'normal') {
        let currentBlur = parseFloat(getComputedStyle(testHeading).filter.match(/blur\((.+)px\)/)?.[1] || 0);
        testHeading.style.filter = `blur(${currentBlur + 0.5}px)`;
        let currentSize = parseFloat(getComputedStyle(testHeading).fontSize);
        testHeading.style.fontSize = `${currentSize - 10}px`;
    } else if (gameType === 'size') {
        let currentSize = parseFloat(getComputedStyle(testHeading).fontSize);
        testHeading.style.fontSize = `${currentSize - 14}px`;
    } else if (gameType === 'blur') {
        let currentBlur = parseFloat(getComputedStyle(testHeading).filter.match(/blur\((.+)px\)/)?.[1] || 0);
        testHeading.style.filter = `blur(${currentBlur + 2}px)`;
    } else if (gameType === 'contrast') {
        let color = getComputedStyle(testHeading).color;
        let rgb = color.match(/\d+/g);

        let newR = Math.min(255, parseInt(rgb[0]) * 1.195);
        let newG = Math.min(255, parseInt(rgb[1]) * 1.195);
        let newB = Math.min(255, parseInt(rgb[2]) * 1.195);

        testHeading.style.color = `rgb(${newR}, ${newG}, ${newB})`;
    }

    testHeading.textContent = letters[Math.floor(Math.random() * letters.length)];
    inputField.value = '';
    totalRounds--;
    if (totalRounds <= 0) {
        inputField.style.display = 'none';
        testHeading.style.display = 'none';

        if (score >= 8) {
            scoreField.textContent= 'You passed the test! You scored ' + score + '/10';
        } else {
            scoreField.textContent = 'You failed the test. You scored ' + score + '/10';
        }
        testStarted = false;
    }
}

inputField.addEventListener('keypress', function(event) {
    if (testStarted && event.key === 'Enter') {
        if (inputField.value.toLowerCase() === testHeading.textContent) {
            score++;
            scoreField.textContent = score + '/10';
            checkGameOver();
        }
        else if (inputField.value.length == 0) {
            return;
        }
        else {
            checkGameOver();
        }
    }
});

let colorBtn = document.querySelector('.colors-btn');
let colorDiv = document.querySelector('.colors');
let colorsRetracted = true;
colorBtn.addEventListener('click', function() {
    if (colorsRetracted) {
        colorDiv.style.right = '170px';
    } else if (!colorsRetracted) {
        colorDiv.style.right = '0px';
    }
    colorsRetracted = !colorsRetracted;
});
let menuBtn = document.querySelector('.menu-btn');
let menuDiv = document.querySelector('.menu');
let menuRetracted = true;
menuBtn.addEventListener('click', function() {
    if (menuRetracted) {
        menuDiv.style.left = '0px';
    } else if (!menuRetracted) {
        menuDiv.style.left = '-160px';
    }
    menuRetracted = !menuRetracted;
});

let red = document.querySelector('.red.btn');
let orange = document.querySelector('.orange.btn');
let yellow = document.querySelector('.yellow.btn');
let green = document.querySelector('.green.btn');
let blue = document.querySelector('.blue.btn');
let purple = document.querySelector('.purple.btn');
let pink = document.querySelector('.pink.btn');
let brown = document.querySelector('.brown.btn');
let black = document.querySelector('.black.btn');
let white = document.querySelector('.white.btn');
let grey = document.querySelector('.grey.btn');
colors = [red, orange, yellow, green, blue, purple, pink, brown, black, white, grey];

for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', function() {
        document.body.classList.remove('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'grey');
        document.body.classList.add(colors[i].classList[0]);
    });
}

let normal = document.querySelector('.normal');
let size = document.querySelector('.size');
let blur = document.querySelector('.blur');
let contrast = document.querySelector('.contrast');
let modes = [normal, size, blur, contrast];

for (let i = 0; i < modes.length; i++) {
    modes[i].addEventListener('click', function() {
        gameType = modes[i].classList[0];
        if (!testStarted) {
            testHeading.style.color = '';
        }
        startGame();
    });
}
