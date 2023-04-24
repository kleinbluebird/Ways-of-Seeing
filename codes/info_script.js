class roundText {
    constructor(element, radius, letterSpace, startingDeg, speedRotation) {
        this.el = element;
        this.r = radius;
        this.d = letterSpace;
        this.s = startingDeg;
        this.speedRotation = speedRotation;
    }
    generateRoundText() {
        var string = this.el.textContent;
        var lengthLetters = string.length;

        string.split("");
        this.el.innerHTML = "";

        for (var i=0; i < lengthLetters; i++) {
            this.el.innerHTML += "<span>" + string[i] + "</span>";
        }

        for (var i=0; i < lengthLetters; i++) {
            var arrayLetters = this.el.childNodes;
            arrayLetters[i].style.height = this.r+"px";
            arrayLetters[i].style.transform = "translate(-50%, "+(-this.r)+"px) rotate("+(this.s + (i*this.d))+"deg)";
            this.el.style.transformOrigin = "center";
            this.el.style.animationDuration = this.speedRotation + "s";
        }

    }
}

let text1 = new roundText(document.querySelectorAll(".text_1")[0], 340, 4.5, -180, 25);
text1.generateRoundText();

let text2 = new roundText(document.querySelectorAll(".text_1")[1], 280, 5.5, -90, 40);
text2.generateRoundText();

let text3 = new roundText(document.querySelectorAll(".text_1")[2], 220, 7.8, 0, 30);
text3.generateRoundText();

let text4 = new roundText(document.querySelectorAll(".text_2")[0], 160, 4.5, -180, 25);
text4.generateRoundText();

let text5 = new roundText(document.querySelectorAll(".text_2")[1], 130, 5.5, -90, 40);
text5.generateRoundText();

let text6 = new roundText(document.querySelectorAll(".text_2")[2], 100, 7.8, 0, 30);
text6.generateRoundText();