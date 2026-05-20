import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Bones extends Actor {

    map = new Map()

    constructor() {
        super();
        console.log("i am a bone")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bones.toSprite())
        this.pos = new Vector(randomInRange(0, this.map.mapWidth), randomInRange(0, this.map.mapHeight))
        this.vel = new Vector(0, randomInRange(5, 10))
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y < -Resources.Bones.height) {
            this.pos = new Vector(randomInRange(0, this.map.mapWidth), -Resources.Bones.height)
        }
    }
    
}