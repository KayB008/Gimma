import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Fish extends Actor {

    map = new Map()

    constructor() {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height
        });
        console.log("i am a Fish")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(randomInRange(0, (Math.abs(this.map.mapWidth) * 0.8)), randomInRange(0, this.map.mapHeight))
        this.fishSpeed = randomInRange(100, 300)

        if (randomInRange(1, 10) <= 5) {
            this.fishSpeed *= -1
        }

        this.vel = new Vector(this.fishSpeed, 0)

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true
        }

        this.startY = this.pos.y
        this.time = 0
        this.wobbleSpeed = randomInRange(1, 5)
        this.amplitude = randomInRange(25, 100)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x > this.map.mapWidth + Resources.Fish.width) {
            this.pos = new Vector(-Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }
        if (this.pos.x < -Resources.Fish.width) {
            this.pos = new Vector(this.map.mapWidth + Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }

        this.time += delta / 1000

        this.pos.y = this.startY + Math.sin(this.time * this.wobbleSpeed) * this.amplitude
    }

}