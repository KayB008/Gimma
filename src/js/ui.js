import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Map } from './map.js'

export class UI extends ScreenElement {

    map = new Map()

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.topMidX = 960
        this.topMidY = 10

        this.backXPbar = new Actor({ x: this.topMidX + 500, y: this.topMidY + 5, z: 9, color: Color.LightGray, width: 400, height: 40, anchor: new Vector(0, 0) })
        this.addChild(this.backXPbar)
        this.XPbar = new Actor({ x: this.topMidX + 500, y: this.topMidY + 5, z: 10, color: Color.Yellow, width: 400, height: 40, anchor: new Vector(0, 0) })
        this.addChild(this.XPbar)
        this.XPbar.scale = new Vector(this.scene.player1.xp / (50 * 1.5 * this.scene.player1.lvl), 1)

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

        this.lvlLabel = new Label({
            text: 'Lvl: 1',
            x: 10,
            y: 10,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.lvlLabel)

        this.upgradeLabel1 = new Label({
            text: `Damage: 1`,
            x: 10,
            y: 70,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.upgradeLabel1)

        this.upgradeLabel2 = new Label({
            text: `ShootingSpeed: 2 bullets per second`,
            x: 10,
            y: 110,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.upgradeLabel2)

        this.upgradeLabel3 = new Label({
            text: `MovementSpeed: 500`,
            x: 10,
            y: 150,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.upgradeLabel3)

        this.upgradeLabel4 = new Label({
            text: `HealthRegen: 0`,
            x: 10,
            y: 190,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.upgradeLabel4)

        this.upgradeLabel5 = new Label({
            text: `Piercing: 1`,
            x: 10,
            y: 230,
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.upgradeLabel5)
    }
}