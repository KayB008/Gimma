import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"


export class LevelUpReward extends Actor {

    constructor(x, y) {
        super()
        this.X = x
        this.Y = y - 500
    }

    async onInitialize(engine) {
        // Laad upgrade classes dynamisch
        const { DamageBoost } = await import('./damageBoost.js')
        const { FireRateBoost } = await import('./fireRateBoost.js')
        const { MovementSpeedBoost } = await import('./movementSpeedBoost.js')
        const { AutomaticHealthRegen } = await import('./healthRegen.js')
        const { PiercingBoost } = await import('./piercingBoost.js')
        const { XpValueBoost } = await import('./xpValueBoost.js')
        const { XpPickupRangeBoost } = await import('./xpPickupRangeBoost.js')

        const chance = 100 / 7

        if (!this.card1 && !this.card2 && !this.card3) {
            //upgrade cards
            this.randomize1 = randomInRange(1, 100)
            if (this.randomize1 <= chance * 1) {
                this.card1 = new DamageBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 2) {
                this.card1 = new FireRateBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 3) {
                this.card1 = new MovementSpeedBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 4) {
                this.card1 = new AutomaticHealthRegen(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 5) {
                this.card1 = new PiercingBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 6) {
                this.card1 = new XpValueBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            } else if (this.randomize1 <= chance * 7) {
                this.card1 = new XpPickupRangeBoost(this.X - 400, this.Y)
                this.scene.add(this.card1)
            }


            this.randomize2 = randomInRange(1, 100)
            if (this.randomize2 <= chance * 1) {
                this.card2 = new DamageBoost(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 2) {
                this.card2 = new FireRateBoost(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 3) {
                this.card2 = new MovementSpeedBoost(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 4) {
                this.card2 = new AutomaticHealthRegen(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 5) {
                this.card2 = new PiercingBoost(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 6) {
                this.card2 = new XpValueBoost(this.X, this.Y)
                this.scene.add(this.card2)
            } else if (this.randomize2 <= chance * 7) {
                this.card2 = new XpPickupRangeBoost(this.X, this.Y)
                this.scene.add(this.card2)
            }

            this.randomize3 = randomInRange(1, 100)
            if (this.randomize3 <= chance * 1) {
                this.card3 = new DamageBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 2) {
                this.card3 = new FireRateBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 3) {
                this.card3 = new MovementSpeedBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 4) {
                this.card3 = new AutomaticHealthRegen(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 5) {
                this.card3 = new PiercingBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 6) {
                this.card3 = new XpValueBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            } else if (this.randomize3 <= chance * 7) {
                this.card3 = new XpPickupRangeBoost(this.X + 400, this.Y)
                this.scene.add(this.card3)
            }
        }
    }
}