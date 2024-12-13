let vehicles = [];
let numAgents = 100;
let maxSpeed = 4;
let maxForce = 0.1;

// Function to update settings from inputs
function updateSettings() {
    const numAgentsInput = document.getElementById("numAgents");
    const maxSpeedInput = document.getElementById("maxSpeed");
    const maxForceInput = document.getElementById("maxForce");

    numAgents = parseInt(numAgentsInput.value);
    maxSpeed = parseFloat(maxSpeedInput.value);
    maxForce = parseFloat(maxForceInput.value);

    // Adjust number of agents dynamically
    if (vehicles.length > numAgents) {
        vehicles.splice(numAgents); // Remove extra vehicles
    } else {
        for (let i = vehicles.length; i < numAgents; i++) {
            vehicles.push(new Vehicle(random(width), random(height)));
        }
    }

    // Update vehicle parameters
    vehicles.forEach(vehicle => {
        vehicle.maxSpeed = maxSpeed;
        vehicle.maxForce = maxForce;
    });
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');

    // Initialize vehicles
    for (let i = 0; i < numAgents; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }

    // Add event listeners to inputs
    document.getElementById("numAgents").addEventListener("change", updateSettings);
    document.getElementById("maxSpeed").addEventListener("input", updateSettings);
    document.getElementById("maxForce").addEventListener("input", updateSettings);
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

// Vehicle class
class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
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
