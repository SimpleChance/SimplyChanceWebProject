let vehicles = [];
let maxSpeed = 4;
let maxForce = 0.1;
let numAgents = 100;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    initializeVehicles(numAgents);

    // Link sliders to variables
    const numAgentsInput = document.getElementById('numAgents');
    const maxSpeedSlider = document.getElementById('maxSpeed');
    const maxForceSlider = document.getElementById('maxForce');

    numAgentsInput.addEventListener('input', () => {
        numAgents = parseInt(numAgentsInput.value);
        initializeVehicles(numAgents);
    });

    maxSpeedSlider.addEventListener('input', () => {
        maxSpeed = parseFloat(maxSpeedSlider.value);
        document.getElementById('maxSpeedValue').textContent = maxSpeed;
    });

    maxForceSlider.addEventListener('input', () => {
        maxForce = parseFloat(maxForceSlider.value);
        document.getElementById('maxForceValue').textContent = maxForce;
    });
}

function draw() {
    background(51);
    for (let v of vehicles) {
        let mouse = createVector(mouseX, mouseY);
        v.seek(mouse);
        v.update();
        v.display();
    }
}

function initializeVehicles(count) {
    vehicles = [];
    for (let i = 0; i < count; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }
}

class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector(0, 0);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(maxSpeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(maxForce);

        this.applyForce(steer);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        fill(127);
        stroke(200);
        strokeWeight(2);
        ellipse(this.position.x, this.position.y, 16, 16);
    }
}
