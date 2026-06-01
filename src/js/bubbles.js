import { Actor, Rectangle, Vector, randomInRange, resetObsoleteCounter } from "excalibur"
import { Resources } from "./resources.js"
import { Game } from './game.js'
import { Map } from './map.js'
import { Fish } from './fish.js'

export class Bubbles extends Actor {

    map = new Map()


    constructor(x, y, side, health) {
        super({
            width: Resources.Bubbles.width,
            height: Resources.Bubbles.height
        });

        this.posX = x
        this.posY = y
        this.shootingSide = side
        this.health = health
    }

    onInitialize(engine) {
        this.bubbleHealth = this.health
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(this.posX + this.scene.engine.player1.width / 2 * this.shootingSide, this.posY)
         
        const maxDist = 800
        const speed = 1500
        
        let target = null
        let bestDist = Infinity
        for (const actor of this.scene.actors) {
            if (!(actor instanceof Fish)) continue
            const distance = actor.pos.distance(this.pos)
            if (distance <= maxDist && distance < bestDist) {
                bestDist = distance
                target = actor
            }
        }

        if (target) {
            const dir = new Vector(target.pos.x - this.pos.x, target.pos.y - this.pos.y).normalize()
            this.vel = new Vector(dir.x * speed, dir.y * speed)
        } else {
            this.vel = new Vector(1000 * this.shootingSide, 0)
        }
    }

    onPostUpdate(engine) {
        if (this.bubbleHealth <= 0) {
            this.kill()
        }
    }
}