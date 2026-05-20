import { Actor, Vector, Keys } from "excalibur"

export class Player extends Actor {

    swimSpeed = 500

    onPreUpdate(engine) {
        //controls
        let xspeed = 0
        let yspeed = 0
    
        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            xspeed -= this.swimSpeed
        }
    
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            xspeed += this.swimSpeed
        }
    
        if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld(Keys.W)) {
            yspeed -= this.swimSpeed
        }
    
        if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld(Keys.S)) {
            yspeed += this.swimSpeed
        }
    
        this.vel = new Vector(xspeed, yspeed)
    
        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }
}