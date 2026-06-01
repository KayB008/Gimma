import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Map } from './map.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Bubbles } from './bubbles.js'
import { Shark } from './shark.js'
import { Mines } from './mines.js'
import { UI } from './ui.js'

export class Game extends Engine {

    player1
    ui

    constructor() {
        super({
            width: 1280*1.5,
            height: 720*1.5,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        console.log("start de game!")

        this.player1
        this.ui

        this.map = new Map()
        this.add(this.map)

        this.ui = new UI()
        this.add(this.ui)

        this.time = 0
        this.lastThirtySeconds = 0
        this.newFish = 0 
        this.fishHealth = 1
        this.fishChaseSpeed = 150


        this.player1 = new Shark(0, "player1")
        this.add(this.player1)
        this.currentScene.camera.strategy.lockToActor(this.player1)
        this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))


        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 100); i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 1000); i++) {
            const fish = new Fish(this.fishHealth, this.fishChaseSpeed)
            this.add(fish)
        }

    }

    onPostUpdate(engine, delta) {

        this.time += delta / 1000
        this.SecondsPast = this.time

        this.time += delta / 1000

        if (this.time > 0 && Math.round(this.time) % 60 == 0 && this.lastThirtySeconds !== Math.round(this.time)) {
            this.fishHealth += 1
            this.fishChaseSpeed += 5
            this.lastThirtySeconds = Math.round(this.time)
        }

        this.newFish++

        if (Math.abs(this.newFish) % 60 == 0) {

            for (let i = 0; i < (Math.abs(this.map.mapWidth) / 2000); i++) {
                const fish = new Fish(this.fishHealth, this.fishChaseSpeed)
                this.add(fish)
            }
        }
    }

}
new Game()
