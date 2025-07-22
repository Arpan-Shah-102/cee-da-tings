let startBtn = document.querySelector('.start');
let heading = document.querySelector('.heading');
let test = document.querySelector('.test');

let menuSFX = new Audio('./assets/sounds/menuSFX.mp3');
let right = new Audio('./assets/sounds/right.mp3');
let wrong = new Audio('./assets/sounds/wrong.mp3');
let win = new Audio('./assets/sounds/win.mp3');
let lose = new Audio('./assets/sounds/lose.mp3');
let muteBtn = document.querySelector('.mute-sfx');

let testHeading = document.querySelector('.see');
let inputField = document.querySelector('.input');
let scoreField = document.querySelector('.score');
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let testStarted = false;
let score = 0;
let totalRounds = 10;
let gameType = 'normal';
let typeLabel = document.querySelector('.type');

let controls = document.querySelector('.controls');
let blurSlider = document.querySelector('.blur-slider');
let sizeSlider = document.querySelector('.size-slider');
let contrastSlider = document.querySelector('.contrast-slider');

let sizeValue = document.querySelector('.size-value');
let blurValue = document.querySelector('.blur-value');
let contrastValue = document.querySelector('.contrast-value');

let previousBgColor = 'white';
let astigmatismView = document.querySelector('.astigmatism-view');
startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    heading.style.display = 'none';
    testHeading.textContent = letters[Math.floor(Math.random() * letters.length)];
    inputField.value = '';
    menuSFX.play();

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
        document.body.classList.remove('pink', 'crimson', 'red', 'brown', 'orange', 'yellow', 'lime', 'green', 'forest', 'cyan', 'dark-grey', 'blue', 'navy', 'purple', 'black', 'grey');
        document.body.classList.add('contrast-bg');
        controls.style.display = 'none';
        astigmatismView.style.display = 'none';
        test.style.display = 'flex';
    } else if (gameType == 'custom') {
        controls.style.display = 'block';
        testHeading.style.fontSize = `${sizeSlider.value}pt`;
        testHeading.style.filter = `blur(${blurSlider.value}px)`;

        testHeading.style.color = '';
        document.body.classList.remove('contrast-bg');
        test.style.display = 'flex';
        astigmatismView.style.display = 'none';
        if (!document.body.classList.contains('pink') && !document.body.classList.contains('crimson') && !document.body.classList.contains('red') && !document.body.classList.contains('brown') && !document.body.classList.contains('orange') && !document.body.classList.contains('yellow') && !document.body.classList.contains('lime') && !document.body.classList.contains('green') && !document.body.classList.contains('forest') && !document.body.classList.contains('cyan') && !document.body.classList.contains('dark-grey') && !document.body.classList.contains('blue') && !document.body.classList.contains('navy') && !document.body.classList.contains('purple') && !document.body.classList.contains('black') && !document.body.classList.contains('grey') && !document.body.classList.contains('white')) {
            document.body.classList.add(previousBgColor);
        }

        const percent = contrastSlider.value / 100;
        const [targetR, targetG, targetB] = getRGBFromClass();
        if (isDarkColor(document.body.classList[0])) {
            // Fade from white to target color
            const r = 255 - ((255 - targetR) * percent);
            const g = 255 - ((255 - targetG) * percent);
            const b = 255 - ((255 - targetB) * percent);
            testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
        } else {
            // Fade from black to target color
            const r = targetR * percent;
            const g = targetG * percent;
            const b = targetB * percent;
            testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
        }
        return;
    } else if (gameType === 'astigmatism') {
        astigmatismView.style.display = 'block';
        test.style.display = 'none';
        controls.style.display = 'none';
        document.body.classList.remove('contrast-bg');
        if (!document.body.classList.contains('pink') && !document.body.classList.contains('crimson') && !document.body.classList.contains('red') && !document.body.classList.contains('brown') && !document.body.classList.contains('orange') && !document.body.classList.contains('yellow') && !document.body.classList.contains('lime') && !document.body.classList.contains('green') && !document.body.classList.contains('forest') && !document.body.classList.contains('cyan') && !document.body.classList.contains('dark-grey') && !document.body.classList.contains('blue') && !document.body.classList.contains('navy') && !document.body.classList.contains('purple') && !document.body.classList.contains('black') && !document.body.classList.contains('grey') && !document.body.classList.contains('white')) {
            document.body.classList.add(previousBgColor);
        }

        const [targetR, targetG, targetB] = getRGBFromClass();
        const r = 255 - targetR;
        const g = 255 - targetG;
        const b = 255 - targetB;
        lines.forEach(line => {
            line.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        });
    } else {
        testHeading.style.color = ''; // Reset to default text color
        document.body.classList.remove('contrast-bg');
        controls.style.display = 'none';
        test.style.display = 'flex';
        astigmatismView.style.display = 'none';
        if (!document.body.classList.contains('pink') && !document.body.classList.contains('crimson') && !document.body.classList.contains('red') && !document.body.classList.contains('brown') && !document.body.classList.contains('orange') && !document.body.classList.contains('yellow') && !document.body.classList.contains('lime') && !document.body.classList.contains('green') && !document.body.classList.contains('forest') && !document.body.classList.contains('cyan') && !document.body.classList.contains('dark-grey') && !document.body.classList.contains('blue') && !document.body.classList.contains('navy') && !document.body.classList.contains('purple') && !document.body.classList.contains('black') && !document.body.classList.contains('grey') && !document.body.classList.contains('white')) {
            document.body.classList.add(previousBgColor);
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
        controls.style.display = 'none';

        if (score >= 8) {
            scoreField.textContent= 'You passed the test! You scored ' + score + '/10';
            win.play();
        } else {
            scoreField.textContent = 'You failed the test. You scored ' + score + '/10';
            lose.play();
        }
        testStarted = false;
    }
}

inputField.addEventListener('keypress', function(event) {
    if (testStarted && event.key === 'Enter') {
        if (inputField.value.toLowerCase() === testHeading.textContent) {
            score++;
            scoreField.textContent = score + '/10';
            right.play();
            checkGameOver();
        }
        else if (inputField.value.length == 0) {
            return;
        }
        else {
            wrong.play();
            checkGameOver();
        }
    }
});

let colorBtn = document.querySelector('.colors-btn');
let colorDiv = document.querySelector('.colors');
let colorsRetracted = true;
colorBtn.addEventListener('click', function() {
    menuSFX.play();
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
    menuSFX.play();
    if (menuRetracted) {
        menuDiv.style.left = '0px';
    } else if (!menuRetracted) {
        menuDiv.style.left = '-160px';
    }
    menuRetracted = !menuRetracted;
});
function checkScreenWidth() {
    if (window.innerWidth > 850) {
        colorDiv.style.right = '170px';
        menuDiv.style.left = '0px';
        colorsRetracted = false;
        menuRetracted = false;
    }
}
document.addEventListener('DOMContentLoaded', checkScreenWidth);

let pink = document.querySelector('.pink.btn');
let crimson = document.querySelector('.crimson.btn');
let red = document.querySelector('.red.btn');
let brown = document.querySelector('.brown.btn');
let orange = document.querySelector('.orange.btn');
let yellow = document.querySelector('.yellow.btn');
let lime = document.querySelector('.lime.btn');
let green = document.querySelector('.green.btn');
let forest = document.querySelector('.forest.btn');
let cyan = document.querySelector('.cyan.btn');
let darkTeal = document.querySelector('.dark-grey.btn');
let blue = document.querySelector('.blue.btn');
let navy = document.querySelector('.navy.btn');
let purple = document.querySelector('.purple.btn');
let black = document.querySelector('.black.btn');
let grey = document.querySelector('.grey.btn');
let white = document.querySelector('.white.btn');
colors = [pink, crimson, red, brown, orange, yellow, lime, green, forest, cyan, darkTeal, blue, navy, purple, black, grey, white];

for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', function() {
        document.body.classList.remove(document.body.classList);
        document.body.classList.add(colors[i].classList[0]);
        previousBgColor = colors[i].classList[0];
        menuSFX.play();

        // Update text color immediately if in custom mode
        if (gameType === 'custom' && testStarted) {
            const [targetR, targetG, targetB] = getRGBFromClass();
            const percent = contrastSlider.value / 100;
            
            if (isDarkColor(colors[i].classList[0])) {
                const r = 255 - ((255 - targetR) * percent);
                const g = 255 - ((255 - targetG) * percent);
                const b = 255 - ((255 - targetB) * percent);
                testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
            } else {
                const r = targetR * percent;
                const g = targetG * percent;
                const b = targetB * percent;
                testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
            }
        } else if (gameType == 'astigmatism') {
            const [targetR, targetG, targetB] = getRGBFromClass();
            const r = 255 - targetR;
            const g = 255 - targetG;
            const b = 255 - targetB;
            lines.forEach(line => {
                line.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            });
        }
    });
}
let lines = document.querySelectorAll('.line');

let normal = document.querySelector('.normal');
let size = document.querySelector('.size');
let blur = document.querySelector('.blur');
let contrast = document.querySelector('.contrast');
let custom = document.querySelector('.custom');
let astigmatism = document.querySelector('.astigmatism');
let modes = [normal, size, blur, contrast, custom, astigmatism];

for (let i = 0; i < modes.length; i++) {
    modes[i].addEventListener('click', function() {
        gameType = modes[i].classList[0];
        if (!testStarted) {
            testHeading.style.color = '';
        }
        startGame();
    });
}

sizeSlider.addEventListener('input', function() {
    if (gameType === 'custom' && testStarted) {
        testHeading.style.fontSize = `${this.value}pt`;
        sizeValue.textContent = `${this.value}pt`;
    }
});

blurSlider.addEventListener('input', function() {
    if (gameType === 'custom' && testStarted) {
        testHeading.style.filter = `blur(${this.value}px)`;
        blurValue.textContent = `${this.value}px`;
    }
});

contrastSlider.addEventListener('input', function() {
    if (gameType === 'custom' && testStarted) {
        const [targetR, targetG, targetB] = getRGBFromClass();
        const percent = this.value / 100;
        
        if (isDarkColor(document.body.classList[0])) {
            // Fade from white to target color
            const r = 255 - ((255 - targetR) * percent);
            const g = 255 - ((255 - targetG) * percent);
            const b = 255 - ((255 - targetB) * percent);
            testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
        } else {
            // Fade from black to target color
            const r = targetR * percent;
            const g = targetG * percent;
            const b = targetB * percent;
            testHeading.style.color = `rgb(${r}, ${g}, ${b})`;
        }
        
        contrastValue.textContent = this.value+'%';
    }
});

function isDarkColor(color) {
    const darkColors = ['crimson', 'red', 'forest', 'dark-grey', 'navy', 'green', 'blue', 'purple', 'brown', 'black', 'grey'];
    return darkColors.includes(color);
}

function getRGBFromClass() {
    const bodyClasses = document.body.classList;
    const colorClass = Array.from(bodyClasses).find(cls => 
    ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'grey', 'forest', 'cyan', 'navy', 'lime', 'crimson', 'dark-grey'].includes(cls)
    );
    
    // Define RGB values for each color
    const colorValues = {
        crimson: [220, 20, 60],
        red: [255, 0, 0],
        orange: [255, 165, 0],
        yellow: [255, 255, 0],
        lime: [0, 255, 0],
        green: [0, 128, 0],
        forest: [0, 60, 0],
        cyan: [0, 255, 255],
        'dark-grey': [47, 79, 79],
        blue: [0, 0, 255],
        navy: [0, 0, 128],
        purple: [128, 0, 128],
        pink: [255, 192, 203],
        brown: [210, 105, 30],
        black: [0, 0, 0],
        white: [255, 255, 255],
        grey: [169, 169, 169]
    };
    
    return colorValues[colorClass] || [255, 255, 255];
}

muteBtn.addEventListener('click', function() {
    menuSFX.muted = !menuSFX.muted;
    right.muted = !right.muted;
    wrong.muted = !wrong.muted;
    win.muted = !win.muted;
    lose.muted = !lose.muted;
    if (menuSFX.muted) {muteBtn.textContent = 'Unmute'; muteBtn.style.backgroundColor = 'rgba(129, 0, 0, 0.5)';}
    else {muteBtn.textContent = 'Mute'; muteBtn.style.backgroundColor = 'rgba(0, 129, 0, 0.5)';}
});