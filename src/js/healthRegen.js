import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class AutomaticHealthRegen extends Actor {

    constructor(x, y) {
        super({
            width: Resources.AutomaticHealthRegenCommon.width,
            height: Resources.AutomaticHealthRegenCommon.height
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
            this.graphics.use(Resources.AutomaticHealthRegenCommon.toSprite())
            this.multiplayer = 1
        } else if (rarityRandomize <= 55) {
            this.graphics.use(Resources.AutomaticHealthRegenUncommon.toSprite())
            this.multiplayer = 1.5
        } else if (rarityRandomize <= 75) {
            this.graphics.use(Resources.AutomaticHealthRegenRare.toSprite())
            this.multiplayer = 2
        } else if (rarityRandomize <= 90) {
            this.graphics.use(Resources.AutomaticHealthRegenEpic.toSprite())
            this.multiplayer = 2.5
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.AutomaticHealthRegenLegendary.toSprite())
            this.multiplayer = 3
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.healthRegen += this.multiplayer
            this.scene.ui.upgradeLabel4.text = `HealthRegen: ${this.scene.player1.healthRegen}`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}