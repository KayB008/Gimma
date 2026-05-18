import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Fish extends Actor {

    constructor() {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height
        });
        console.log("i am a Fish")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.graphics.flipHorizontal = true
        this.pos = new Vector(randomInRange(0, 720), randomInRange(0, 720))
        this.vel = new Vector(randomInRange(12, 120), 0)

        this.startY = this.pos.y
        this.time = 0
        this.wobbleSpeed = randomInRange(1, 5)
        this.amplitude = randomInRange(25, 100)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x > 1280 + Resources.Fish.width) {
            this.pos = new Vector(-Resources.Fish.width, randomInRange(0, 720))
        }

        this.time += delta / 1000

        this.pos.y = this.startY + Math.sin(this.time * this.wobbleSpeed) * this.amplitude
    }

}