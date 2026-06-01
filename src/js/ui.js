import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources.js"
import { Map } from './map.js'

export class UI extends ScreenElement {

    map = new Map()

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.topMidX = 960
        this.topMidY = 10

        this.healthbar = new Actor({ x: this.topMidX - 300, y: this.topMidY, z: 10, color: Color.Green, width: 600, height: 50, anchor: new Vector(0, 0) })
        this.addChild(this.healthbar)

        this.healthLabel = new Label({
            text: 'Health: 100',
            x: this.topMidX - 80,
            y: this.topMidY + 13,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.healthLabel)

        this.scoreLabel = new Label({
            text: 'Score: 0',
            x: 10,
            y: 10,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 60,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.scoreLabel)
    }
}