var starSpeed = 1 / 100;
var stars = newStars(300);

function newStars(starCount) {
    stars = [];
    for (var i = 0; i < starCount; i++) {
        stars[i] = new Star();
    }
    return stars;
}

function Star() {
    randomize.apply(this);

    function randomize() {
        this.x = (Math.random() - 0.5) * 1.2;
        this.y = (Math.random() - 0.5) * 1.2;
        this.z = Math.random() * 2;

        this.s = Math.random() * 2;
        temp = Math.pow(10, Math.random() * 1.68 + 3.4);
        color = colorTemperature2rgb(temp);
        this.color = "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
    }

    this.move = function move() {
        this.z -= starSpeed;
        if (this.z <= 0) {
            randomize.apply(this);
            this.z = 1;
        }
        return this;
    }
}

(function () {
    function $(id) { return document.getElementById(id) }

    var ls = $('saber'); ls.style.position = 'absolute';
    var txt = $('text'); txt.style.position = 'absolute';
    var canvas = $('canvas'); window.addEventListener('resize', resizeCanvas, false);
    var c = canvas.getContext("2d");

    var f;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        f = Math.max(canvas.width, canvas.height) / 2;
        ls.style.left = (canvas.width - ls.clientWidth) / 2 + 'px';
        ls.style.top = (canvas.height - ls.clientHeight) / 2 + 'px';
        txt.style.left = (canvas.width - txt.clientWidth) / 2 + 'px';
        txt.style.top = (canvas.height - txt.clientHeight) / 2 + 'px';
    }
    resizeCanvas();

    function draw() {
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < stars.length; i++) {
            stars[i].draw().move();
        }
    }

    Star.prototype.draw = function draw() {
        var x, y, s;
        x = this.x / this.z;
        y = this.y / this.z;
        s = this.s / this.z;

        c.beginPath();
        c.fillStyle = this.color;
        c.arc(x * f + canvas.width / 2, y * f + canvas.height / 2, s * f / 1000, 0, Math.PI * 2);
        c.fill();

        return this;
    }

    var cArray = new Array("#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF");
    var saberColorTimer = setInterval(function saberColor() {
        $('blade').style.backgroundColor = cArray.shift();
        cArray.push($('blade').style.backgroundColor);
    }, 1000);

    function update() {
        draw();
        window.requestAnimationFrame(update);
    }
    update();
})();