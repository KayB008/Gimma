import { Scene, BoundingBox, LockCameraToActorStrategy, randomInRange } from "excalibur"
import { Map } from './map.js'
import { LavaCrawler } from './lavaCrawler.js'
import { LavaBeast } from './lavaBeast.js'
import { WaterBlob } from './waterBlob.js'
import { UI } from './ui.js'
import { HealthPack } from "./healthPack.js"

export class GameScene extends Scene {

    onInitialize(engine) {
        this.map = new Map()
        this.add(this.map)

        this.ui = new UI()
        this.add(this.ui)


        this.time = 0
        this.lastThirtySeconds = 0
        this.newLavaCrawler = 0
        this.lavaCrawlerHealth = 1
        this.lavaCrawlerChaseSpeed = 150
        this.lavaCrawlerDamage = 5
        this.newLavaBeast = 0
        this.lavaBeastHealth = 5
        this.lavaBeastChaseSpeed = 75
        this.lavaBeastDamage = 10
        this.newHealthPack = 0

        this.player1 = new WaterBlob(0, "player1")
        this.add(this.player1)
        this.camera.strategy.lockToActor(this.player1)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 1000); i++) {
            const lavaCrawler = new LavaCrawler(this.lavaCrawlerHealth, this.lavaCrawlerChaseSpeed)
            this.add(lavaCrawler)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 2000); i++) {
            const lavaBeast = new LavaBeast(this.lavaBeastHealth, this.lavaBeastChaseSpeed)
            this.add(lavaBeast)
        }
    }

    onPostUpdate(engine, delta) {
        this.time += delta / 1000

        if (this.time > 0 && Math.round(this.time) % 30 === 0 && this.lastThirtySeconds !== Math.round(this.time)) {
            this.lavaCrawlerHealth *= 1.5
            this.lavaCrawlerChaseSpeed *= 1.05
            this.lavaCrawlerDamage += 0.5
            this.lavaBeastHealth *= 2
            this.lavaBeastChaseSpeed *= 1.01
            this.lavaBeastDamage += 1
            this.lastThirtySeconds = Math.round(this.time)
        }

        this.newHealthPack++

        if (Math.abs(this.newHealthPack) % 1800 == 0) {
            for (let i = 0; i < (randomInRange(0, 2)); i++) {
                const healthPack = new HealthPack()
                this.add(healthPack)
            }
        }

        this.newLavaCrawler++

        this.countLavaCrawlers()

        if (this.lavaCrawlerCount < 50) {
            if (Math.abs(this.newLavaCrawler) % 45 === 0) {
                for (let i = 0; i < (Math.abs(this.map.mapWidth) / 4000); i++) {
                    const lavaCrawler = new LavaCrawler(this.lavaCrawlerHealth, this.lavaCrawlerChaseSpeed)
                    this.add(lavaCrawler)
                }
            }
        }

        this.newLavaBeast++

        this.countLavaBeasts()

        if (this.lavaBeastCount < 10) {
            if (Math.abs(this.newLavaBeast) % 600 === 0) {
                for (let i = 0; i < (Math.abs(this.map.mapWidth) / 2000); i++) {
                    const lavaBeast = new LavaBeast(this.lavaBeastHealth, this.lavaBeastChaseSpeed)
                    this.add(lavaBeast)
                }
            }
        }


        if (this.player1.health <= 0) {
            engine.finalScore = this.player1.score
            this.gameOver(engine)
        }
    }

    countLavaCrawlers() {
        this.lavaCrawlerCount = 0
        for (const actor of this.actors) {
            if (actor instanceof LavaCrawler) {
                this.lavaCrawlerCount++
            }
        }
    }

    countLavaBeasts() {
        this.lavaBeastCount = 0
        for (const actor of this.actors) {
            if (actor instanceof LavaBeast) {
                this.lavaBeastCount++
            }
        }
    }

    gameOver(engine) {
        engine.goToScene("gameOver")
    }
}