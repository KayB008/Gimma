import { Actor, Vector, randomInRange, Color, Timer } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { WaterBlob } from "./waterBlob.js"

export class HealthPack extends Actor {

    map = new Map()

    constructor() {
        super({
            width: Resources.HealthPack.width,
            height: Resources.HealthPack.height
        });
    }

    onInitialize(engine) {
        this.scale = new Vector(0.15, 0.15)

        this.graphics.use(Resources.HealthPack.toSprite())
        this.pos = new Vector(randomInRange(0, Math.abs(this.map.mapWidth)),
            randomInRange(0, this.map.mapHeight))

        this.actions.repeatForever((repeatCtx) => {
  repeatCtx.moveBy(0, 10, 10)
  repeatCtx.moveBy(0, -10, 10)
}) 
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof WaterBlob) {
            this.kill()
            if (this.scene.player1.health < 100) {
                other.owner.health += 10
                if (this.scene.player1.health > 100) {
                    this.scene.player1.health = 100
                }
                this.scene.ui.healthbar.scale = new Vector(this.scene.player1.health / 100, 1)
                this.scene.ui.healthLabel.text = `Health: ${this.scene.player1.health}`
            }
        }
    }
}