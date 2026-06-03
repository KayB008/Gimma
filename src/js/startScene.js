import { Scene, Actor, Vector, Label, Font, FontUnit, Color } from "excalibur"
import { Resources } from './resources.js'

export class StartScene extends Scene {

    onInitialize(engine) {
        // achtergrond actor
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
            font: new Font({ size: 48, unit: FontUnit.Px })
        })
        this.add(this.title)

        // instructie
        this.instruct = new Label({
            text: "Druk op SPACE om te beginnen",
            color: Color.White,
            font: new Font({ size: 28, unit: FontUnit.Px })
        })
        this.add(this.instruct)

        // keyboard start
        engine.input.keyboard.on("press", (evt) => {
            if (evt.key === " " || evt.key === "Space" || evt.key === "Enter") {
                this.startGame(engine)
            }
        })

        // klik/tap start
        this.on("pointerup", () => this.startGame(engine))

        // track size for layout
        this._lastSize = { w: 0, h: 0 }
        this.adjustLayout(engine)
    }

    onPreUpdate(engine) {
        // pas layout aan bij grootte verandering
        this.adjustLayout(engine)
    }

    adjustLayout(engine) {
        if (engine.drawWidth === this._lastSize.w && engine.drawHeight === this._lastSize.h) return
        this._lastSize = { w: engine.drawWidth, h: engine.drawHeight }

        // centreer achtergrond
        this.bg.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight)

        // schaal achtergrond zodat hij de hele viewport vult (cover)
        const sprite = Resources.StartBackground.toSprite()
        const scale = Math.max(engine.drawWidth / sprite.width, engine.drawHeight / sprite.height)
        this.bg.scale = new Vector(scale, scale)

        // positie labels relatief aan scherm
        this.title.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 120)
        this.instruct.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 80)
    }

    startGame(engine) {
        engine.goToScene("game")
    }
}