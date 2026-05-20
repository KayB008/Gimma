import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Map } from './map.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Bubbles } from './bubbles.js'
import { Shark } from './shark.js'
import { Mines } from './mines.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        console.log("start de game!")

        this.scoreLabel = new Label({
            text: 'Score: 0',
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.add(this.scoreLabel)

        this.healthLabel = new Label({
            text: 'Health: 5/5',
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.add(this.healthLabel)


        this.map = new Map()
        this.add(this.map)

        this.time = 0


        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 100); i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 30); i++) {
            const bubbles = new Bubbles()
            this.add(bubbles)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 50); i++) {
            const fish = new Fish()
            this.add(fish)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 100); i++) {
            const mines = new Mines()
            this.add(mines)
        }

        const shark = new Shark()
        this.add(shark)
        this.currentScene.camera.strategy.lockToActor(shark)
        this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))
    }

    onPostUpdate(engine, delta) {
        const camPos = this.currentScene.camera.pos
        const topLeft = camPos.add(new Vector(-this.drawWidth / 2, -this.drawHeight / 2))
        this.scoreLabel.pos = topLeft.add(new Vector(50, 50))
        const topRight = camPos.add(new Vector(-this.drawWidth / 2 + this.drawWidth - 250, -this.drawHeight / 2))
        this.healthLabel.pos = topRight.add(new Vector(50, 50))


        this.time += delta / 1000
        
        if (this.time > 20) {
            this.time = 0

            for (let i = 0; i < (Math.abs(this.map.mapWidth) / 50); i++) {
                const fish = new Fish()
                this.add(fish)
                console.log("nieuwe vissen in de kom")
            }
        }
    }

}
new Game()

