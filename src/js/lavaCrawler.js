import { Actor, Vector, randomInRange, Color, Timer } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { Bubbles } from './bubbles.js'

export class LavaCrawler extends Actor {

    map = new Map()

    constructor(h, c) {
        super({
            width: Resources.LavaCrawler.width,
            height: Resources.LavaCrawler.height
        });
        this.startHealth = h
        this.startChaseSpeed = c
    }

    onInitialize(engine) {
        this.scale = new Vector(0.15, 0.15)

        this.chaseSpeed = this.startChaseSpeed
        this.health = this.startHealth
        this.lastThirtySeconds = 0
        this.healthPre = this.health


        this.graphics.use(Resources.LavaCrawler.toSprite())
        this.pos = new Vector(randomInRange(0, Math.abs(this.map.mapWidth)),
            randomInRange(0, this.map.mapHeight))
        const distance = this.scene.player1.pos.distance(this.pos)
        this.vel = new Vector(0, 0)


        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true
        }

        this.time = 0
        this.wobbleSpeed = randomInRange(1, 5)
        this.amplitude = randomInRange(2, 4)

        if (distance < 500) {
            this.kill()
        }
    }


    onPostUpdate(engine, delta) {
        this.time += delta / 1000


        if (this.health < this.healthPre) {
            this.actions.blink(100, 100, 2)
            this.healthPre = this.health
        }

        if (this.health <= 0) {
            this.scene.player1.score += 1
            this.scene.ui.scoreLabel.text = `Score: ${this.scene.player1.score}`
            this.kill()
        }

        this.pos.y = this.pos.y + Math.sin(this.time * this.wobbleSpeed) * this.amplitude

        this.actions.meet(this.scene.player1, this.chaseSpeed)
        this.graphics.flipHorizontal = this.vel.x > 0

    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Bubbles) {
            this.health -= this.scene.player1.damage
            other.owner.bubbleHealth -= 1
        }
    }

}