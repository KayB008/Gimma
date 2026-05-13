import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Bubbles extends Actor {

    constructor() {
        super();
        console.log("i am a bubble")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(randomInRange(0, 1280), randomInRange(720, 800))
        this.vel = new Vector(0, randomInRange(-1090, -5))
        this.events.on("exitviewport", (e) => this.bubblesTop(e))
    }

    bubblesTop(e) {
        e.target.pos = new Vector(randomInRange(0, 1280), 750)
    }
}