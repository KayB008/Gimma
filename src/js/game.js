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

            const background = new Actor({
            x: this.drawWidth / 2,
            y: this.drawHeight / 2,
            z: -1
        })
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)


        for (let i = 0; i < 300; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())
            fish.pos = new Vector(randomInRange(700, 1280), randomInRange(0, 720))
            fish.vel = new Vector(randomInRange(-200, -75), 0)
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)
        }

        for (let i = 0; i < 3; i++) {
            const bones = new Actor()
            bones.graphics.use(Resources.Bones.toSprite())
            bones.pos = new Vector(randomInRange(100, 1200), randomInRange(0, 100))
            bones.vel = new Vector(0, randomInRange(5, 10))
            bones.events.on("exitviewport", (e) => this.bonesBottom(e))
            this.add(bones)
        }

        for (let i = 0; i < 100; i++) {
            const bubbles = new Actor()
            bubbles.graphics.use(Resources.Bubbles.toSprite())
            bubbles.pos = new Vector(randomInRange(0, 1280), randomInRange(720, 800))
            bubbles.vel = new Vector(0, randomInRange(-1090, -5))
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

        for (let i = 0; i < 4; i++) {
            const mines = new Actor()
            mines.graphics.use(Resources.Mines.toSprite())
            mines.pos = new Vector(randomInRange(200, 1000), randomInRange(100, 400))
            mines.vel = new Vector(0, randomInRange(10, 20))
            mines.events.on("exitviewport", (e) => this.minesBottom(e))
            this.add(mines)
        }
    }

    fishLeft(e) {
        const currentSpeed = Math.abs(e.target.vel.x);
        const speedLimit = 1200;

        e.target.pos = new Vector(1400, randomInRange(0, 720))
        if (currentSpeed < speedLimit) {
            e.target.vel = new Vector(e.target.vel.x * 1.5, 0)
        }
        if (currentSpeed > speedLimit) {
            e.target.vel = new Vector(e.target.vel.x * 0.7, 0)
        }
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

    minesBottom(e) {
        e.target.pos = new Vector(randomInRange(200, 1000), -30)
    }

}
new Game()
