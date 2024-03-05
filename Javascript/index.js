let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let circle = [];

let colors = ["#ff1d58",
    "#f75990",
    "#fff685",
    "#00DDFF",
    "#0049B7"
];

let gravity = 1;
let friction = 0.9;

window.addEventListener("resize", function () {    //To resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener("click", function () {
    circle = []; // Clear the circle array
    for (let i = 0; i < 100; i++) {
        circle.push(Circle());
    }
});
function randomColor(colors) {             // Random color function
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomIntFromRange(min, max) {     //Random number for height and width 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function Circle() {         // ball structure function
    let radius = randomIntFromRange(30, 40);
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(0, (canvas.height / 2) - radius);
    let color = randomColor(colors);
    let dx = randomIntFromRange(3, -3);
    let dy = 10;

    function draw() {
        c.beginPath();
        c.fillStyle = color;
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
        c.stroke();
    }

    function update() {
        if (y + radius + dy > canvas.height) {
            dy = -dy * friction;
        } else {
            dy += gravity;
        }
        if (x + radius > canvas.width || x - radius < 0) {
            dx = -dx;
        }
        x += dx;
        y += dy;
        
        draw();
    }

    return {
        draw: draw,
        update: update
    };
}

for (let i = 0; i < 100; i++) {
    circle.push(Circle());
}

function animate() {           // Animation function :- animation clears up and then reanimated
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circle.length; i++) {
        circle[i].update();
    }
}
animate();
