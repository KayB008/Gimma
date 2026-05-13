import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Shark extends Actor {

    constructor() {
        super();
        console.log("i am a shark")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Shark.toSprite())
        this.pos = new Vector(50, randomInRange(200, 650))
        this.vel = new Vector(randomInRange(12, 120), 0)
        this.events.on("exitviewport", (e) => this.sharkRight(e))
    }

    sharkRight(e) {
        e.target.pos = new Vector(-50, randomInRange(200, 650))
    }

}