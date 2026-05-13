import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Fish extends Actor {

    constructor() {
        super()
        console.log("i am a fish")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(randomInRange(700, 1280), randomInRange(0, 720))
        this.vel = new Vector(randomInRange(-200, -75), 0)
        this.events.on("exitviewport", (e) => this.fishLeft(e))
    }

    fishLeft(e) {
            const currentSpeed = Math.abs(e.target.vel.x);
            const speedLimit = 30000;
    
            e.target.pos = new Vector(1400, randomInRange(0, 720))
            if (currentSpeed < speedLimit) {
                e.target.vel = new Vector(e.target.vel.x * 1.1, 0)
            }
            if (currentSpeed > speedLimit) {
                e.target.vel = new Vector(e.target.vel.x * 0.1, 0)
            }
        }
    
}