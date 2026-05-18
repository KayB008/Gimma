import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Bones extends Actor {

    constructor() {
        super();
        console.log("i am a bone")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bones.toSprite())
        this.pos = new Vector(randomInRange(100, 1200), randomInRange(0, 100))
        this.vel = new Vector(0, randomInRange(5, 10))
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y < -Resources.Bones.height) {
            this.pos = new Vector(randomInRange(0, 1280), -Resources.Bones.height)
        }
    }
    
}