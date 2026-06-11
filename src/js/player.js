import { Actor, Vector, Keys } from "excalibur"

export class Player extends Actor {

    movementSpeed = 500

    onPreUpdate(engine) {
        //controls
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.A) && this.playerNum === "player1") {
            xspeed -= this.movementSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.playerNum === "player1") {
            xspeed += this.movementSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.W) && this.playerNum === "player1") {
            yspeed -= this.movementSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.S) && this.playerNum === "player1") {
            yspeed += this.movementSpeed
        }

        this.vel = new Vector(xspeed, yspeed)
    }
}