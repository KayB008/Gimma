import { Scene, Actor, Vector, Label, Font, FontUnit, Color } from "excalibur"
import { Resources } from './resources.js'

export class GameOverScene extends Scene {
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
            text: "GAME OVER",
            color: Color.White,
            font: new Font({ size: 100, unit: FontUnit.Px })
        })
        this.add(this.title)

        // score
        this.score = new Label({
            text: `Score: je hebt ${engine.finalScore} enemies verslagen!`,
            color: Color.White,
            font: new Font({ size: 80, unit: FontUnit.Px })
        })
        this.add(this.score)

        // instructie
        this.instruct = new Label({
            text: "Druk op SPACE om opniew te beginnen",
            color: Color.White,
            font: new Font({ size: 40, unit: FontUnit.Px })
        })
        this.add(this.instruct)

        // input
        engine.input.keyboard.on("press", (evt) => {
            if (evt.key === "Space") {
                location.reload()
            }
        })

        this.updateLayout(engine)
    }

    onPreUpdate(engine) {
        this.score.text = `Score: je hebt ${engine.finalScore} enemies verslagen!`
        this.updateLayout(engine)
    }

    updateLayout(engine) {
        const cx = engine.halfDrawWidth
        const cy = engine.halfDrawHeight

        this.bg.pos = new Vector(cx, cy)
        const sprite = Resources.StartBackground.toSprite()
        const scale = Math.max(engine.drawWidth / sprite.width, engine.drawHeight / sprite.height)
        this.bg.scale = new Vector(scale, scale)

        this.title.pos = new Vector(cx - 330, cy - 120)
        this.score.pos = new Vector(cx - 600, cy + 50)
        this.instruct.pos = new Vector(cx - 350, cy + 200)
    }
}