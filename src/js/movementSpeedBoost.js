import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class MovementSpeedBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.MovementSpeedBoost.width,
            height: Resources.MovementSpeedBoost.height
        })
        this.X = x
        this.Y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.MovementSpeedBoost.toSprite())
        this.pos = new Vector(this.X, this.Y)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.movementSpeed *= 1.1
            this.scene.ui.upgradeLabel3.text = `MovementSpeed: ${this.scene.player1.movementSpeed}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}