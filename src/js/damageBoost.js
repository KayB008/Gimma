import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class DamageBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.DamageBoostCommon.width,
            height: Resources.DamageBoostCommon.height
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
            this.graphics.use(Resources.DamageBoostCommon.toSprite())
            this.multiplayer = 2
        } else if (rarityRandomize <= 55) {
            this.graphics.use(Resources.DamageBoostUncommon.toSprite())
            this.multiplayer = 2.5
        } else if (rarityRandomize <= 75) {
            this.graphics.use(Resources.DamageBoostRare.toSprite())
            this.multiplayer = 3
        } else if (rarityRandomize <= 90) {
            this.graphics.use(Resources.DamageBoostEpic.toSprite())
            this.multiplayer = 3.5
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.DamageBoostLegendary.toSprite())
            this.multiplayer = 4
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.damage *= this.multiplayer
            this.scene.ui.upgradeLabel1.text = `Damage: ${this.scene.player1.damage}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}