import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { Bubbles } from './bubbles.js'

export class Fish extends Actor {

    map = new Map()

    constructor(h, c) {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height
        });
        this.startHealth = h
        this.startChaseSpeed = c
    }

    onInitialize(engine) {

        this.chaseSpeed = this.startChaseSpeed
        this.health = this.startHealth
        this.lastThirtySeconds = 0

        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(randomInRange(0, Math.abs(this.map.mapWidth)),
            randomInRange(0, this.map.mapHeight))
        const distance = this.scene.engine.player1.pos.distance(this.pos)
        this.vel = new Vector(0, 0)
        // this.fishSpeedX = randomInRange(100, 300)
        // this.fishSpeedY = randomInRange(10, 20)

        // if (randomInRange(1, 10) <= 5) {
        //     this.fishSpeedX *= -1
        // }
        // if (randomInRange(1, 10) <= 5) {
        //     this.fishSpeedY *= -1
        // }

        // this.vel = new Vector(this.fishSpeedX, this.fishSpeedY)

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true
        }

        this.time = 0
        this.wobbleSpeed = randomInRange(1, 5)
        this.amplitude = randomInRange(2, 5)

        if (distance < 500) {
            this.kill()
        }
    }


    onPostUpdate(engine, delta) {
        if (this.pos.x > this.map.mapWidth + Resources.Fish.width) {
            this.pos = new Vector(-Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }
        if (this.pos.x < -Resources.Fish.width) {
            this.pos = new Vector(this.map.mapWidth + Resources.Fish.width, randomInRange(0, this.map.mapHeight))
        }

        this.time += delta / 1000


        if (this.health <= 0) {
            this.scene.engine.player1.score += 1
            this.scene.engine.ui.scoreLabel.text = `Score: ${this.scene.engine.player1.score}`
            this.kill()
        }

        this.pos.y = this.pos.y + Math.sin(this.time * this.wobbleSpeed) * this.amplitude


        this.distance = Vector.distance(this.scene.engine.player1.pos, this.pos)

        const dx = this.scene.engine.player1.pos.x - this.pos.x
        const dy = this.scene.engine.player1.pos.y - this.pos.y
        const d = Math.hypot(dx, dy)
        this.vel.setTo((dx / d) * this.chaseSpeed, (dy / d) * this.chaseSpeed)
        this.graphics.flipHorizontal = this.vel.x > 0

    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Bubbles) {
            this.health -= this.scene.engine.player1.damage
            other.owner.bubbleHealth -= 1
        }
    }

}