import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
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

            const background = new Actor({
            x: this.drawWidth / 2,
            y: this.drawHeight / 2,
            z: -1
        })
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)


        for (let i = 0; i < 100; i++) {
            const fish = new Fish()
            this.add(fish)
        }

        for (let i = 0; i < 3; i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < 100; i++) {
            const bubbles = new Bubbles()
            this.add(bubbles)
        }
        
        for (let i = 0; i < 5; i++) {
            const shark = new Shark()
            this.add(shark)
        }

        for (let i = 0; i < 8; i++) {
            const mines = new Mines()
            this.add(mines)
        }
    }

}
new Game()

