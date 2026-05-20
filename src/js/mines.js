import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class Mines extends Actor {

    map = new Map()

    constructor() {
        super({
            width: Resources.Mines.width,
            height: Resources.Mines.height
        });
        console.log("i am a mine")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mines.toSprite())
        this.pos = new Vector(randomInRange(0, this.map.mapWidth), randomInRange(0, this.map.mapHeight))

        this.startY = this.pos.y
        this.time = 0
        this.randomSpeed = randomInRange(Math.abs(this.map.mapHeight)/2000, Math.abs(this.map.mapHeight)/500)
    }

    onPostUpdate(engine, delta) {
        this.time += delta / 1000

        this.pos.y = this.startY + Math.sin(this.time * this.randomSpeed) * Math.abs(this.map.mapHeight)/100
    }
 
}