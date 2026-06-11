import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class MovementSpeedBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.MovementSpeedBoostCommon.width,
            height: Resources.MovementSpeedBoostCommon.height
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
        if (rarityRandomize <= 30) {
            this.graphics.use(Resources.MovementSpeedBoostCommon.toSprite())
            this.multiplayer = 1.1
        } else if (rarityRandomize <= 55) {
            this.graphics.use(Resources.MovementSpeedBoostUncommon.toSprite())
            this.multiplayer = 1.15
        } else if (rarityRandomize <= 75) {
            this.graphics.use(Resources.MovementSpeedBoostRare.toSprite())
            this.multiplayer = 1.2
        } else if (rarityRandomize <= 90) {
            this.graphics.use(Resources.MovementSpeedBoostEpic.toSprite())
            this.multiplayer = 1.25
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.MovementSpeedBoostLegendary.toSprite())
            this.multiplayer = 1.3
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.movementSpeed *= this.multiplayer
            this.scene.ui.upgradeLabel3.text = `MovementSpeed: ${this.scene.player1.movementSpeed}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
            this.scene.player1.cardsOnMap = false
        }
    }

}