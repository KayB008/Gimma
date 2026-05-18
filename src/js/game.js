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
            pos: new Vector(50, 50),
            z: 10,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.add(this.scoreLabel)


        this.map = new Map()
        this.add(this.map)


        for (let i = 0; i < 10; i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < 100; i++) {
            const bubbles = new Bubbles()
            this.add(bubbles)
        }

        for (let i = 0; i < 200; i++) {
            const fish = new Fish()
            this.add(fish)
        }

        for (let i = 0; i < 6; i++) {
            const mines = new Mines()
            this.add(mines)
        }

        const shark = new Shark()
        this.add(shark)
        this.currentScene.camera.strategy.lockToActor(shark)
        this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))
    }

}
new Game()

