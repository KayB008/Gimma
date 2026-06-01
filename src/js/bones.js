import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Bones extends Actor {

    map = new Map()

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bones.toSprite())
        this.pos = new Vector(randomInRange(0, this.map.mapWidth), randomInRange(0, this.map.mapHeight))
        this.vel = new Vector(0, randomInRange(10, 20))
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y < -Resources.Bones.height) {
            this.pos = new Vector(randomInRange(0, this.map.mapWidth), -Resources.Bones.height)
        }
    }
    
}