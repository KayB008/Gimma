import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"
import { LevelUpReward } from "./levelUpReward.js"

export class FireRateBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.FireRateBoost.width,
            height: Resources.FireRateBoost.height
        })
        this.X = x
        this.Y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.FireRateBoost.toSprite())
        this.pos = new Vector(this.X, this.Y)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.shootSpeed *= 1.2
            this.scene.ui.upgradeLabel2.text = `ShootSpeed: ${Math.round(this.scene.player1.shootSpeed)} shots per second`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }
}