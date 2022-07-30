let shared
let font

function preload() {
    // connect to the party server
    partyConnect(
        "wss://p5partyserver.herokuapp.com/",
        "party",
        "main"
    )

    font = loadFont("roboto-mono/RobotoMono-Thin.ttf")

    // begin loading shared object
    // setup() won't be called until the shared object is loaded
    // provide default values for shared data

    shared = partyLoadShared("globals");
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    noStroke()


    if (partyIsHost()) {
        partySetShared(shared, {
            points: []
        })
    }
}

function draw() {
    background(51)

    fill(255)
    textFont(font)
    textAlign(LEFT, TOP)
    textSize(20)
    text("click to draw\n\nspace to clear\n", 50, 50)

    if (mouseIsPressed) {
        shared.points.push({ x1: mouseX, y1: mouseY, x2: pmouseX, y2: pmouseY })
    }

    for (let i = 0; i < shared.points.length; i++) {
        let point = shared.points[i]

        stroke(255)
        // ellipse(point1.x, point1.y, 20, 20)
        line(point.x1, point.y1, point.x2, point.y2)

        // point1.life--
        // if (point1.life <= 0) {
        //     shared.points.splice(i, 1)
        //     i--
        // }
    }
}


function keyPressed() {
    if (key === " ") {
        shared.points = [];
        return false;
    }
}