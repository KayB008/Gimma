import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class PiercingBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.PiercingBoost.width,
            height: Resources.PiercingBoost.height
        })
        this.X = x
        this.Y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.PiercingBoost.toSprite())
        this.pos = new Vector(this.X, this.Y)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.piercing += 1
            this.scene.ui.upgradeLabel5.text = `Piercing: ${this.scene.player1.piercing}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}