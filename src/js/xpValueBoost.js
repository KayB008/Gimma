import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class XpValueBoost extends Actor {

    constructor(x, y) {
        super({
            width: Resources.XpValueBoostCommon.width,
            height: Resources.XpValueBoostCommon.height
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
            this.graphics.use(Resources.XpValueBoostCommon.toSprite())
            this.multiplayer = 1.5
        } else if (rarityRandomize <= 55) {
            this.graphics.use(Resources.XpValueBoostUncommon.toSprite())
            this.multiplayer = 1.75
        } else if (rarityRandomize <= 75) {
            this.graphics.use(Resources.XpValueBoostRare.toSprite())
            this.multiplayer = 2
        } else if (rarityRandomize <= 90) {
            this.graphics.use(Resources.XpValueBoostEpic.toSprite())
            this.multiplayer = 2.25
        } else if (rarityRandomize <= 100) {
            this.graphics.use(Resources.XpValueBoostLegendary.toSprite())
            this.multiplayer = 2.5
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.scene.player1.xpValue *= this.multiplayer
            this.scene.player1.levelUpBoost.card1.kill()
            this.scene.player1.levelUpBoost.card2.kill()
            this.scene.player1.levelUpBoost.card3.kill()
        }
    }

}