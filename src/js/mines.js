import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Mines extends Actor {

    constructor() {
        super();
        console.log("i am a mine")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mines.toSprite())
        this.pos = new Vector(randomInRange(200, 1000), randomInRange(100, 600))

        this.startY = this.pos.y
        this.time = 0
    }

    onPostUpdate(engine, delta) {
        this.time += delta / 1000

        this.pos.y = this.startY + Math.sin(this.time * 2) * 20
    }
 
}