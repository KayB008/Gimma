import { Scene, BoundingBox, LockCameraToActorStrategy } from "excalibur"
import { Map } from './map.js'
import { LavaCrawler } from './lavaCrawler.js'
import { Bones } from './bones.js'
import { WaterBlob } from './waterBlob.js'
import { UI } from './ui.js'

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
        this.lavaCrawlerChaseSpeed = 300

        this.player1 = new WaterBlob(0, "player1")
        this.add(this.player1)
        this.camera.strategy.lockToActor(this.player1)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))



        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 100); i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 1000); i++) {
            const lavaCrawler = new LavaCrawler(this.lavaCrawlerHealth, this.lavaCrawlerChaseSpeed)
            this.add(lavaCrawler)
        }
    }

    onPostUpdate(engine, delta) {
        this.time += delta / 1000

        if (this.time > 0 && Math.round(this.time) % 90 === 0 && this.lastThirtySeconds !== Math.round(this.time)) {
            this.lavaCrawlerHealth *= 2
            this.lavaCrawlerChaseSpeed += 5
            this.lastThirtySeconds = Math.round(this.time)
        }

        this.newLavaCrawler++


        this.countLavaCrawlers()

        if (this.lavaCrawlerCount < 100) {
            if (Math.abs(this.newLavaCrawler) % 45 === 0) {
                for (let i = 0; i < (Math.abs(this.map.mapWidth) / 4000); i++) {
                    const lavaCrawler = new LavaCrawler(this.lavaCrawlerHealth, this.lavaCrawlerChaseSpeed)
                    this.add(lavaCrawler)
                }
            }
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
}