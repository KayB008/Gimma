import { Scene, Actor, Vector, Label, Font, FontUnit, Color, Rectangle } from "excalibur"

export class StartScene extends Scene {

    onInitialize(engine) {
        // achtergrond label
        const title = new Label({
            text: "Gimma - Press Start",
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 120),
            color: Color.White,
            font: new Font({ size: 36, unit: FontUnit.Px })
        })
        this.add(title)

        // start knop (achtergrond)
        this.startButton = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: 320,
            height: 90,
            anchor: new Vector(0.5, 0.5)
        })
        const rect = new Rectangle({
            width: 320,
            height: 90,
            color: Color.fromRGB(20, 90, 160)
        })
        this.startButton.graphics.use(rect)
        // klik handler
        this.startButton.on("pointerup", () => this.startGame(engine))
        this.add(this.startButton)

        // knop label
        const btnLabel = new Label({
            text: "START",
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            color: Color.White,
            font: new Font({ size: 30, unit: FontUnit.Px })
        })
        this.add(btnLabel)

        // ook starten met Enter of Space
        engine.input.keyboard.on("press", (evt) => {
            if (evt.key === "Enter" || evt.key === " ") {
                this.startGame(engine)
            }
        })
    }

    startGame(engine) {
        engine.goToScene("game")
    }
}