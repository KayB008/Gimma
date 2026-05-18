import { Actor, Vector, randomInRange, BoundingBox } from "excalibur"
import { Resources } from "./resources.js"

export class Map extends Actor {

    constructor() {
        super({
            anchor: new Vector(0, 0)
        });
        this.mapWidth = 2560
        this.mapHeight = 1440
        this.graphics.use(Resources.Background.toSprite())
    }


}