import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Game } from './game.js'
import { Map } from './map.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Bubbles } from './bubbles.js'
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
        this.health = 5
        this.score = 0

        this.graphics.use(Resources.Shark.toSprite())
        this.graphics.flipHorizontal = true
        this.pos = new Vector(Math.abs(this.map.mapWidth) / 2, Math.abs(this.map.mapHeight) / 2)
        
        this.startY = this.pos.y
        this.time = 0
    }


    onPostUpdate(engine, delta) {
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
            // this.scene.engine.stop()
        }

        this.time += delta / 1000

        this.pos.y = this.pos.y + Math.sin(this.time * 3) * 2
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Fish) {
            this.score += 1
            this.scene.engine.scoreLabel.text = `Score: ${this.score}`
            other.owner.kill()
        }

        if (other.owner instanceof Mines) {
            this.health -= 1
            this.scene.engine.healthLabel.text = `Health: ${this.health}/5`
            other.owner.kill()
        }
    }

}