import { Actor, Vector, randomInRange, Color, Timer } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class XP extends Actor {

    map = new Map()

    constructor(x, y) {
        super({
            width: Resources.XP.width,
            height: Resources.XP.height
        });
        this.posX = x
        this.posY = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.06, 0.06)

        this.graphics.use(Resources.XP.toSprite())
        this.pos = new Vector(this.posX + randomInRange(-50, 50), this.posY + randomInRange(-50, 50))

        this.time = 0
        this.inRange = false
        this.accelerate = 100
    }

    onPostUpdate(delta) {
        let distance = this.scene.player1.pos.distance(this.pos)
        if (distance < this.scene.player1.xpPickupRange) {
            this.inRange = true
        }

        if (this.inRange) {
            let toPlayer = this.scene.player1.pos.sub(this.pos).normalize()
            this.accelerate += 20
            this.vel = toPlayer.scale(this.accelerate)
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.kill()
            other.owner.xp += this.scene.player1.xpValue
            this.scene.ui.XPbar.scale = new Vector(this.scene.player1.xp / (50 * 1.5 * this.scene.player1.lvl), 1)
        }
    }
}