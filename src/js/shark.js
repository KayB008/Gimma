import { Actor, Vector, randomInRange, Keys } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'
import { Fish } from "./fish.js"
import { Mines } from './mines.js'


export class Shark extends Actor {

    constructor() {
        super({
            width: Resources.Shark.width,
            height: Resources.Shark.height
        })
        console.log("i am a Shark")
    }

    onInitialize(engine) {
        this.swimSpeed = 500
        this.health = 3
        this.score = 0

        this.graphics.use(Resources.Shark.toSprite())
        this.graphics.flipHorizontal = true
        // this.pos = new Vector(1200, randomInRange(0, 720))
        this.pos = new Vector(600, 300)
    }


    onPostUpdate(engine) {
        // if (this.pos.x < -Math.abs(Resources.Shark.width) / 2) {
        //     this.pos = new Vector(1280 + Math.abs(Resources.Shark.width) / 2, this.pos.y)
        // }
        // if (this.pos.x > 1280 + Math.abs(Resources.Shark.width) / 2) {
        //     this.pos = new Vector(-Math.abs(Resources.Shark.width) / 2, this.pos.y)
        // }
        // if (this.pos.y > 720 + Math.abs(Resources.Shark.height) / 2) {
        //     this.pos = new Vector(this.pos.x, -Math.abs(Resources.Shark.height) / 2)
        // }
        // if (this.pos.y < -Math.abs(Resources.Shark.height) / 2) {
        //     this.pos = new Vector(this.pos.x, 720 + Math.abs(Resources.Shark.height) / 2)
        // }


        //controls
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed -= this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed += this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed -= this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed += this.swimSpeed
        }

        this.vel = new Vector(xspeed, yspeed)

        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
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