// Count Down

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let again = 1;

document.getElementById("time_count").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

startTimer();

function onTimesUp() {

    // clearInterval(timerInterval);
    timePassed = -1;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    remainingPathColor = COLOR_CODES.info.color;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `00:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(alert.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    } else if (timeLeft > alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(alert.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(info.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

// Slides Change
var slideInterval = setInterval(nextSlide, 31000);
function nextSlide() {
    var current = $('.flex--active').data('slide'),
        // get button data-slide
        next = (current + 1) % 4;

    $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
    $('.flex--active').addClass('animate--end');
    setTimeout(function() {
        $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
        $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
    }, 800);

    if (current === 3) {
        window.location.replace("./info.html");
    }
}

// P5.JS

// let blocks = [];
// let graphics;
// let letters = [" ", "Small", "Elephant", "A", "Cow", "in", "the", "Grass", "Football", "Near", "the",  "Lake", "Football", "with", "a", "Headphone", "on", "the", "Playground"];
// let counter = 0;
// let word;
// let num = 0;
//
//
// function setup() {
//     let cnv = createCanvas(437, 800);
//     cnv.parent('container');
//     graphics = createGraphics(width, height);
//     graphics.noStroke();
//     for (let i = 0; i < (width * height * 3) / 100; i++) {
//         let x = random(width);
//         let y = random(height);
//         let w = random(3);
//         let h = random(3);
//         let a = random(TWO_PI);
//         graphics.fill(random(255), 30);
//         graphics.push();
//         graphics.translate(x, y);
//         graphics.rotate(a);
//         graphics.ellipse(0, 0, w, h);
//         graphics.pop();
//     }
//     matter.init();
//     matter.changeGravity(0,-0.1);
//     platform_top = matter.makeBarrier(width / 2, 0, width, 100);
//     platform_bottom = matter.makeBarrier(width / 2, height, width, 100);
//     platform_left = matter.makeBarrier(0, height/2, 5, height);
//     platform_right = matter.makeBarrier(width, height/2, 5, height);
//
//     makeWord(random(width), random(height), random(width / 10));
// }
//
// function makeWord(x, y, d) {
//     tSize = random(d / 2, d);
//     textSize(tSize);
//     textFont('Shadows Into Light');
//     let b = matter.makeSign(letters[num], x, y);
//     b.textSize = tSize;
//     blocks.push(b);
//     num++;
// }
//
// function draw() {
//     clear();
//     textFont('Shadows Into Light');
//
//     fill(255);
//     noStroke();
//     // platform_bottom.show();
//     // platform_left.show();
//     // platform_right.show();
//
//     if (frameCount % 60 == 0) {
//         let d = random(width / 9, width / 5);
//         let x = random(width/2 - d / 2, width / 2 + d / 2);
//         let y = random(height - d / 3, height - d / 2);
//         makeWord(x, y, d);
//     }
//
//     for (let i = blocks.length - 1; i >= 0; i--) {
//         let b = blocks[i];
//         let p = b.body.position;
//         push();
//         translate(p.x, p.y, 0);
//         rotate(b.body.angle);
//         fill(255, 255, 255);
//         textAlign(CENTER, CENTER);
//         // textStyle(BOLD);
//         textSize(b.textSize);
//         text(b.text, 0, 0);
//         pop();
//
//         if (b.isOffCanvas()) {
//             matter.forget(b);
//             blocks.splice(i, 1);
//         }
//     }
//
//     push();
//     let g = get();
//     clear();
//     background(0, 0, 0);
//
//     drawingContext.shadowColor = color(0, 0, 0, 33);
//     drawingContext.shadowBlur = width / 40;
//     drawingContext.shadowOffsetX = width / 100;
//     drawingContext.shadowOffsetY = width / 50;
//     image(g, 0, 0);
//     pop();
// }

// access the mic
// let mic;

// speech recognition object
let myRec = new p5.SpeechRec();
// allow partial recognition (faster, less accurate)
myRec.interimResults = false;
// do continuous recognition
myRec.continuous = true;

let word;
let words = [];
let textRec;
let textPre = "";

// for words print
let blocks = [];
let graphics;
let letters = [];
let single;
let num = 0;

// extention
let amplitude = 0;

function setup() {
    let cnv = createCanvas(437, 800);
    cnv.parent('container');
    // mic = new p5.AudioIn();
    // mic.start();
    myRec.start();

    // bind callback function to trigger when speech is recognized
    myRec.onResult = getVolume;

    // for words print
    matter.init();
    matter.changeGravity(0, -0.1);
    platform_top = matter.makeBarrier(width / 2, 0, width, 100);
    platform_bottom = matter.makeBarrier(width / 2, height, width, 100);
    platform_left = matter.makeBarrier(0, height / 2, 5, height);
    platform_right = matter.makeBarrier(width, height / 2, 5, height);
}

// add word ti blocks
function makeWord(x, y, d) {
    tSize = random(d / 2, d);
    textSize(tSize);
    let b = matter.makeSign(letters[num], x, y);
    b.textSize = tSize;
    blocks.push(b);
    num++;
}

function draw() {
    background(0);

    startRecognize();
}

function startRecognize() {
    background(0);
    textFont("Shadows Into Light");

    // convert the speech into string
    if (myRec.resultValue == true) {
        textRec = myRec.resultString;
        words = split(textRec, " ");
        // print(words);

        // store words into the letters
        if (textRec != textPre) {
            // print('textRec:'+textRec);
            for (let i = 0; i < words.length; i++) {
                append(letters, words[i]);
                // further work: decide the d depending on amplitude
                let d = random(width / 9, width / 5);
                let x = random(width / 2 - d / 2, width / 2 + d / 2);
                let y = random(height - d / 3, height - d / 2);
                makeWord(x, y, d);
            }
            // print(letters);
        }
        textPre = textRec;
    }

    printWords();
}

function printWords() {
    for (let i = blocks.length - 1; i >= 0; i--) {
        let b = blocks[i];
        let p = b.body.position;
        push();
        translate(p.x, p.y, 0);
        rotate(b.body.angle);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        // textStyle(BOLD);
        textSize(b.textSize);
        text(b.text, 0, 0);
        pop();
    }

    push();
    let g = get();
    clear();
    background(0, 0, 0);
    image(g, 0, 0);
    pop();
}

function getVolume() {
    // amplitude = mic.getLevel();
    // print(`Amplitude: ${amplitude}`);
}
