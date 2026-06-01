import { Actor, Rectangle, Vector, randomInRange, resetObsoleteCounter } from "excalibur"
import { Resources } from "./resources.js"
import { Game } from './game.js'
import { Map } from './map.js'
import { Fish } from './fish.js'

export class Bubbles extends Actor {

    map = new Map()


    constructor(x, y, side) {
        super({
            width: Resources.Bubbles.width,
            height: Resources.Bubbles.height
        });
        console.log("i am a bubble")

        this.posX = x
        this.posY = y
        this.shootingSide = side
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(this.posX + this.scene.engine.player1.width / 2 * this.shootingSide, this.posY)
         
        const maxDist = 600
        const speed = 1500
        
        let target = null
        let bestDist = Infinity
        for (const actor of this.scene.actors) {
            if (!(actor instanceof Fish)) continue
            const d = actor.pos.distance(this.pos)
            if (d <= maxDist && d < bestDist) {
                bestDist = d
                target = actor
            }
        }

        if (target) {
            const dir = target.pos.sub(this.pos).normalize()
            this.vel = new Vector(dir.x * speed, dir.y * speed)
        } else {
            this.vel = new Vector(1000 * this.shootingSide, 0)
        }
    }

    onPostUpdate(engine, delta) {

    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Fish) {
            this.scene.engine.player1.score += 1
            this.scene.engine.scoreLabel.text = `Score: ${this.scene.engine.player1.score}`
            other.owner.kill()
            this.kill()
        }
    }
}