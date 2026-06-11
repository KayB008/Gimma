import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"
import { LevelUpReward } from "./levelUpReward.js"

export class FireRateBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.FireRateBoostCommon.width,
            height: Resources.FireRateBoostCommon.height
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
            this.graphics.use(Resources.FireRateBoostCommon.toSprite())
            this.multiplayer = 1.2
        } else if (rarityRandomize <= 55) {
            this.graphics.use(Resources.FireRateBoostUncommon.toSprite())
            this.multiplayer = 1.3
        } else if (rarityRandomize <= 75) {
            this.graphics.use(Resources.FireRateBoostRare.toSprite())
            this.multiplayer = 1.4
        } else if (rarityRandomize <= 90) {
            this.graphics.use(Resources.FireRateBoostEpic.toSprite())
            this.multiplayer = 1.5
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.FireRateBoostLegendary.toSprite())
            this.multiplayer = 1.6
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.shootSpeed *= this.multiplayer
            this.scene.ui.upgradeLabel2.text = `ShootSpeed: ${Math.round(this.scene.player1.shootSpeed)} shots per second`
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }
}