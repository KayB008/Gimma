import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Mines extends Actor {

    constructor() {
        super();
        console.log("i am a mine")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mines.toSprite())
        this.pos = new Vector(randomInRange(200, 1000), randomInRange(100, 600))
        this.events.on("exitviewport", (e) => this.minesBottom(e))
    }

    onPostUpdate() {
        
    }

    minesBottom(e) {
        e.target.pos = new Vector(randomInRange(200, 1000), -30)
    }
    
}