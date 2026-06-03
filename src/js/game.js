import '../css/style.css'
import { Engine, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScene } from './startScene.js'
import { GameScene } from './gameScene.js'


export class Game extends Engine {

    constructor() {
        super({
            width: 1280*1.5,
            height: 720*1.5,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.setupScenes())
    }

    setupScenes() {
        const start = new StartScene()
        const game = new GameScene()

        this.addScene("start", start)
        this.addScene("game", game)

        this.goToScene("start")
    }
}

new Game()