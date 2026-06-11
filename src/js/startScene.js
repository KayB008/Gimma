import { Scene, Actor, Vector, Label, Font, FontUnit, Color } from "excalibur"
import { Resources } from './resources.js'

export class StartScene extends Scene {
    onInitialize(engine) {
        // achtergrond
        this.bg = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            anchor: new Vector(0.5, 0.5),
            z: -1
        })
        this.bg.graphics.use(Resources.StartBackground.toSprite())
        this.add(this.bg)

        // titel
        this.title = new Label({
            text: "The Last Droplet",
            color: Color.White,
            font: new Font({ size: 100, unit: FontUnit.Px })
        })
        this.add(this.title)

        // instructie
        this.instruct = new Label({
            text: "Druk op ENTER om te beginnen",
            color: Color.White,
            font: new Font({ size: 40, unit: FontUnit.Px })
        })
        this.add(this.instruct)

        // input
        engine.input.keyboard.on("press", (evt) => {
            if (evt.key === "Enter") this.startGame(engine)
        })

        this.updateLayout(engine)
    }

    onPreUpdate(engine) {
        this.updateLayout(engine)
    }

    updateLayout(engine) {
        const cx = engine.halfDrawWidth
        const cy = engine.halfDrawHeight

        this.bg.pos = new Vector(cx, cy)
        const sprite = Resources.StartBackground.toSprite()
        const scale = Math.max(engine.drawWidth / sprite.width, engine.drawHeight / sprite.height)
        this.bg.scale = new Vector(scale, scale)

        this.title.pos = new Vector(cx - 350, cy - 120)
        this.instruct.pos = new Vector(cx - 270, cy + 80)
    }

    startGame(engine) {
        engine.resetGameScene()
        engine.goToScene("game")
    }
}