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

        //upgrade cards
        this.randomize1 = randomInRange(1, 100)
        if (this.randomize1 <= 33) {
            this.card1 = new DamageBoost(this.X - 400, this.Y)
            this.scene.add(this.card1)
        } else if (this.randomize1 <= 66) {
            this.card1 = new FireRateBoost(this.X - 400, this.Y)
            this.scene.add(this.card1)
        } else if (this.randomize1 <= 100) {
            this.card1 = new MovementSpeedBoost(this.X - 400, this.Y)
            this.scene.add(this.card1)
        }

        this.randomize2 = randomInRange(1, 100)
        if (this.randomize2 <= 33) {
            this.card2 = new DamageBoost(this.X, this.Y)
            this.scene.add(this.card2)
        } else if (this.randomize2 <= 66) {
            this.card2 = new FireRateBoost(this.X, this.Y)
            this.scene.add(this.card2)
        } else if (this.randomize2 <= 100) {
            this.card2 = new MovementSpeedBoost(this.X, this.Y)
            this.scene.add(this.card2)
        }

        this.randomize3 = randomInRange(1, 100)
        if (this.randomize3 <= 33) {
            this.card3 = new DamageBoost(this.X + 400, this.Y)
            this.scene.add(this.card3)
        } else if (this.randomize3 <= 66) {
            this.card3 = new FireRateBoost(this.X + 400, this.Y)
            this.scene.add(this.card3)
        } else if (this.randomize3 <= 100) {
            this.card3 = new MovementSpeedBoost(this.X + 400, this.Y)
            this.scene.add(this.card3)
        }
    }
}