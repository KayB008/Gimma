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
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(randomInRange(0, Math.abs(this.map.mapWidth)),
            randomInRange(0, this.map.mapHeight))
        const distance = Vector.distance(this.scene.engine.player1.pos, this.pos)
        console.log(this.scene.engine.player1.pos)
        this.fishSpeedX = randomInRange(100, 300)
        this.fishSpeedY = randomInRange(10, 20)

        if (randomInRange(1, 10) <= 5) {
            this.fishSpeedX *= -1
        }
        if (randomInRange(1, 10) <= 5) {
            this.fishSpeedY *= -1
        }

        this.vel = new Vector(this.fishSpeedX, this.fishSpeedY)

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true
        }

        this.time = 0
        this.wobbleSpeed = randomInRange(1, 5)
        this.amplitude = randomInRange(2, 5)

        if (distance < 500) {
            this.kill()
        }

        this.chaseSpeed = 200
    }


    onPostUpdate(engine, delta) {
        if (this.pos.x > this.map.mapWidth + Resources.Fish.width) {
            this.pos = new Vector(-Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }
        if (this.pos.x < -Resources.Fish.width) {
            this.pos = new Vector(this.map.mapWidth + Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }

        this.time += delta / 1000

        this.pos.y = this.pos.y + Math.sin(this.time * this.wobbleSpeed) * this.amplitude


        this.distance = Vector.distance(this.scene.engine.player1.pos, this.pos)
        if (this.distance < 500) {
            const dx = this.scene.engine.player1.pos.x - this.pos.x
            const dy = this.scene.engine.player1.pos.y - this.pos.y
            const d = Math.hypot(dx, dy)
            this.vel.setTo((dx / d) * this.chaseSpeed, (dy / d) * this.chaseSpeed)
            this.graphics.flipHorizontal = this.vel.x > 0
        }
    }

}