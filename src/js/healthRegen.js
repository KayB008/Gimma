import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class AutomaticHealthRegen extends Actor {

    constructor(x, y) {
        super({
            width: Resources.AutomaticHealthRegen.width,
            height: Resources.AutomaticHealthRegen.height
        })
        this.X = x
        this.Y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.AutomaticHealthRegen.toSprite())
        this.pos = new Vector(this.X, this.Y)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.healthRegen += 1
            this.scene.ui.upgradeLabel4.text = `HealthRegen: ${this.scene.player1.healthRegen}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}