import { Scene, BoundingBox, LockCameraToActorStrategy } from "excalibur"
import { Map } from './map.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Shark } from './shark.js'
import { UI } from './ui.js'

export class GameScene extends Scene {

    onInitialize(engine) {
        this.map = new Map()
        this.add(this.map)

        this.ui = new UI()
        this.add(this.ui)

        this.time = 0
        this.lastThirtySeconds = 0
        this.newFish = 0
        this.fishHealth = 10
        this.fishChaseSpeed = 150

        this.player1 = new Shark(0, "player1")
        this.add(this.player1)
        this.camera.strategy.lockToActor(this.player1)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.map.mapWidth, this.map.mapHeight))
    


        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 100); i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < (Math.abs(this.map.mapWidth) / 1000); i++) {
            const fish = new Fish(this.fishHealth, this.fishChaseSpeed)
            this.add(fish)
        }
    }

    onPostUpdate(engine, delta) {
        this.time += delta / 1000

        if (this.time > 0 && Math.round(this.time) % 90 === 0 && this.lastThirtySeconds !== Math.round(this.time)) {
            this.fishHealth *= 2
            this.fishChaseSpeed += 5
            this.lastThirtySeconds = Math.round(this.time)
        }

        this.newFish++

        if (Math.abs(this.newFish) % 45 === 0) {
            for (let i = 0; i < (Math.abs(this.map.mapWidth) / 4000); i++) {
                const fish = new Fish(this.fishHealth, this.fishChaseSpeed)
                this.add(fish)
            }
        }
    }
}