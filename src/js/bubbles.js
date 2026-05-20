import { Actor, Rectangle, Vector, randomInRange, resetObsoleteCounter } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Bubbles extends Actor {

    map = new Map()


    constructor() {
        super();
        console.log("i am a bubble")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubbles.toSprite())
        this.pos = new Vector(randomInRange(0, this.map.mapWidth), randomInRange(this.map.mapHeight - 50, this.map.mapHeight))
        this.vel = new Vector(0, randomInRange(-1090, -5))
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y < -Resources.Bubbles.height) {
            this.pos = new Vector(randomInRange(0, this.map.mapWidth), this.map.mapHeight + Resources.Bubbles.height)
        }
    }

}