import { Actor, Vector, randomInRange, BoundingBox } from "excalibur"
import { Resources } from "./resources.js"

export class Map extends Actor {

    constructor() {
        super({
            anchor: new Vector(0, 0)
        });
        this.mapWidth = 10000
        this.mapHeight = 5000
    }

    onInitialize(engine) {
        // gebruik sprite om schaal te berekenen
        const sprite = Resources.Background.toSprite()
        this.graphics.use(sprite)

        // bereken schaal op basis van sprite maat
        const scaleX = this.mapWidth / sprite.width
        const scaleY = this.mapHeight / sprite.height
        this.scale = new Vector(scaleX, scaleY)
    }

}