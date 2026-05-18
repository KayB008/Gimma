import { Actor, Rectangle, Vector, randomInRange, resetObsoleteCounter } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Bubbles extends Actor {

    constructor() {
        super();
        console.log("i am a bubble")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(randomInRange(0, 1280), randomInRange(720, 800))
        this.vel = new Vector(0, randomInRange(-1090, -5))
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y < -Resources.Bubbles.height) {
            this.pos = new Vector(randomInRange(0, 1280), 720 + Resources.Bubbles.height)
        }
    }

}