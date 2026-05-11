import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

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

        for (let i = 0; i < 60; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())
            fish.pos = new Vector(randomInRange(700, 1280), randomInRange(0, 720))
            fish.vel = new Vector(randomInRange(-200, -1), 0)
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)
        }

        for (let i = 0; i < 10; i++) {
            const bones = new Actor()
            bones.graphics.use(Resources.Bones.toSprite())
            bones.pos = new Vector(randomInRange(100, 1200), randomInRange(50, 300))
            bones.vel = new Vector(0, randomInRange(5, 50))
            bones.events.on("exitviewport", (e) => this.bonesBottom(e))
            this.add(bones)
        }

        for (let i = 0; i < 100; i++) {
            const bubbles = new Actor()
            bubbles.graphics.use(Resources.Bubbles.toSprite())
            bubbles.pos = new Vector(randomInRange(0, 1280), randomInRange(720, 800))
            bubbles.vel = new Vector(0, randomInRange(-50, -5))
            bubbles.events.on("exitviewport", (e) => this.bubblesTop(e))
            this.add(bubbles)
        }
        
        for (let i = 0; i < 5; i++) {
            const shark = new Actor()
            shark.graphics.use(Resources.Shark.toSprite())
            shark.pos = new Vector(50, randomInRange(200, 650))
            shark.vel = new Vector(randomInRange(12, 120), 0)
            shark.events.on("exitviewport", (e) => this.sharkRight(e))
            this.add(shark)
        }
    }

    fishLeft(e) {
        e.target.pos = new Vector(1400, randomInRange(0, 720))
    }

    bonesBottom(e) {
        e.target.pos = new Vector(randomInRange(100, 1200), -30)
    }

    bubblesTop(e) {
        e.target.pos = new Vector(randomInRange(0, 1280), 750)
    }
    
    sharkRight(e) {
        e.target.pos = new Vector(-50, randomInRange(200, 650))
    }

}
new Game()
