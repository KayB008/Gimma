import { Actor, Vector, randomInRange, Keys } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { Fish } from "./fish.js"
import { Mines } from './mines.js'
import { Player } from './player.js'


export class Shark extends Player {

    map = new Map()

    constructor() {
        super({
            width: Resources.Shark.width,
            height: Resources.Shark.height
        })
        console.log("i am a Shark")
    }

    onInitialize(engine) {
        this.health = 3
        this.score = 0

        this.graphics.use(Resources.Shark.toSprite())
        this.graphics.flipHorizontal = true
        this.pos = new Vector(Math.abs(this.map.mapWidth)/2, Math.abs(this.map.mapHeight)/2)
    }


    onPostUpdate(engine) {
        if (this.pos.x <= Math.abs(Resources.Shark.width) / 2) {
            this.pos.x = Math.abs(Resources.Shark.width) / 2
        }
        if (this.pos.x >= this.map.mapWidth - Math.abs(Resources.Shark.width) / 2) {
            this.pos.x = this.map.mapWidth - Math.abs(Resources.Shark.width) / 2
        }
        if (this.pos.y >= this.map.mapHeight - Math.abs(Resources.Shark.height) / 2) {
            this.pos.y = this.map.mapHeight - Math.abs(Resources.Shark.height) / 2
        }
        if (this.pos.y <= Math.abs(Resources.Shark.height) / 2) {
            this.pos.y = Math.abs(Resources.Shark.height) / 2
        }
        

        if (this.health <= 0) {
            this.kill()
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Fish) {
            this.score += 1
            this.scene.engine.scoreLabel.text = `Score: ${this.score}`
            other.owner.kill()
        }

        if (other.owner instanceof Mines) {
            this.health -= 1
            other.owner.kill()
        }
    }

}