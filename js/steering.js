let vehicles = [];

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    for (let i = 0; i < 100; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }
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

class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 4;
        this.maxForce = 0.1;
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
