import { Actor, Vector, randomInRange, Keys } from "excalibur"
import { Resources } from "./resources.js"

export class Fish extends Actor {

    constructor() {
        super()
        console.log("i am a fish")
    }

    onInitialize(engine) {
        this.swimSpeed = 500

        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(1200, randomInRange(0, 720))
    }


    onPostUpdate(engine) {
        if (this.pos.x < -Resources.Fish.width) {
            this.pos = new Vector(1280 + Resources.Fish.width, this.pos.y)
        }
        if (this.pos.x > 1280 + Resources.Fish.width) {
            this.pos = new Vector(-Resources.Fish.width, this.pos.y)
        }
        if (this.pos.y > 720 + Resources.Fish.height) {
            this.pos = new Vector(this.pos.x, -Resources.Fish.height)
        }
        if (this.pos.y < -Resources.Fish.height) {
            this.pos = new Vector(this.pos.x, 720 + Resources.Fish.height)
        }


        //controls
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed -= this.swimSpeed
            this.scale.x = 1
        }

        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed += this.swimSpeed
            this.scale.x = -1
        }

        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed -= this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed += this.swimSpeed
        }

        this.vel = new Vector(xspeed, yspeed)
    }
    
}