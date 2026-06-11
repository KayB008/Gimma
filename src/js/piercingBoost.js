import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class PiercingBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.PiercingBoostCommon.width,
            height: Resources.PiercingBoostCommon.height
        })
        this.X = x
        this.Y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.pos = new Vector(this.X, this.Y)
        this.multiplayer = 0

        //rarity chance
        const rarityRandomize = randomInRange(1, 100)
        if (rarityRandomize <= 55) {
            this.graphics.use(Resources.PiercingBoostCommon.toSprite())
            this.multiplayer = 1
        } else if (rarityRandomize <= 85) {
            this.graphics.use(Resources.PiercingBoostRare.toSprite())
            this.multiplayer = 2
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.PiercingBoostLegendary.toSprite())
            this.multiplayer = 3
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.piercing += this.multiplayer
            this.scene.ui.upgradeLabel5.text = `Piercing: ${this.scene.player1.piercing}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}