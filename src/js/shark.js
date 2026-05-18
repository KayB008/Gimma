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

        this.startY = this.pos.y
        this.time = 0
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x > 1280 + Resources.Shark.width) {
            this.pos = new Vector(-Resources.Shark.width, randomInRange(200, 650))
        }

        this.time += delta / 1000

        this.pos.y = this.startY + Math.sin(this.time * 1) * 50
    }

}