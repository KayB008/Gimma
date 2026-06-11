import { Actor, Rectangle, Vector, randomInRange, resetObsoleteCounter } from "excalibur"
import { Resources } from "./resources.js"
import { Game } from './game.js'
import { Map } from './map.js'
import { LavaCrawler } from './lavaCrawler.js'
import { LavaBeast } from './lavaBeast.js'

export class Bubbles extends Actor {

    map = new Map()


    constructor(x, y, health) {
        super({
            width: Resources.Bubbles.width,
            height: Resources.Bubbles.height
        });

        this.posX = x
        this.posY = y
        this.health = health
    }

    onInitialize(engine) {
        this.scale = new Vector(0.15, 0.15)
        this.bubbleHealth = this.health
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(this.posX, this.posY)

        const maxDist = 800
        const speed = 1500
        let speedX = speed
        let speedY = speed

        let target = null
        let bestDist = Infinity
        for (const actor of this.scene.actors) {
            if (actor instanceof LavaCrawler || actor instanceof LavaBeast) {
                const distance = actor.pos.distance(this.pos)
                if (distance <= maxDist && distance < bestDist) {
                    bestDist = distance
                    target = actor
                }
            }
        }

        if (target) {
            const dir = new Vector(target.pos.x - this.pos.x, target.pos.y - this.pos.y).normalize()
            this.vel = new Vector(dir.x * speed, dir.y * speed)
        } else {
            this.wereToX = randomInRange(1, 100)
            if (this.wereToX <= 50) {
                speedX *= -1
            }
            this.wereToY = randomInRange(1, 100)
            if (this.wereToY <= 50) {
                speedY *= -1
            }
            this.vel = new Vector(speedX, speedY)
        }
    }

    onPostUpdate(engine) {
        if (this.bubbleHealth <= 0) {
            this.kill()
        }
    }
}