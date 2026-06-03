import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Game } from './game.js'
import { Map } from './map.js'
import { LavaCrawler } from './lavaCrawler.js'
import { Bones } from './bones.js'
import { Bubbles } from './bubbles.js'


export class WaterBlob extends Actor {

    map = new Map()

    constructor(myPosX, player) {
        super({
            width: Resources.WaterBlob.width,
            height: Resources.WaterBlob.height
        })
        console.log("i am a WaterBlob")
        this.myPosX = myPosX
        this.playerNum = player
    }

    onInitialize(engine) {
        this.scale = new Vector(0.25, 0.25)

        this.health = 100

        this.score = 0

        this.graphics.use(Resources.WaterBlob.toSprite())
        this.pos = new Vector((Math.abs(this.map.mapWidth) / 2) + this.myPosX, Math.abs(this.map.mapHeight) / 2)

        this.startY = this.pos.y
        this.time = 0
        this.shootTiming = 0
        this.shootTimer = 0
        this.shootSpeed = 30
        this.lastScoreForSpeed = 0
        this.nextSpeedScore = 25
        this.damage = 1
        this.lastScoreForDamage = 0
        this.nextDamageScore = 50
        this.piercing = 1
        this.lastScoreForPiercing = 0
        this.nextPiercingScore = 100
        this.pickupRange = 300
        this.xp = 0
        this.lvl = 1
    }

    swimSpeed = 500

    onPreUpdate(engine) {
        //controls
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.A) && this.playerNum === "player1") {
            xspeed -= this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.playerNum === "player1") {
            xspeed += this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.W) && this.playerNum === "player1") {
            yspeed -= this.swimSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.S) && this.playerNum === "player1") {
            yspeed += this.swimSpeed
        }

        this.vel = new Vector(xspeed, yspeed)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x <= Math.abs(Resources.WaterBlob.width) / 8) {
            this.pos.x = Math.abs(Resources.WaterBlob.width) / 8
        }
        if (this.pos.x >= this.map.mapWidth - Math.abs(Resources.WaterBlob.width) / 8) {
            this.pos.x = this.map.mapWidth - Math.abs(Resources.WaterBlob.width) / 8
        }
        if (this.pos.y >= this.map.mapHeight - Math.abs(Resources.WaterBlob.height) / 8) {
            this.pos.y = this.map.mapHeight - Math.abs(Resources.WaterBlob.height) / 8
        }
        if (this.pos.y <= Math.abs(Resources.WaterBlob.height) / 8) {
            this.pos.y = Math.abs(Resources.WaterBlob.height) / 8
        }


        if (this.health <= 0) {
            this.kill()
            this.scene.engine.stop()
        }

        this.time += delta / 1000
        this.SecondsPast = this.time

        // this.pos.y = this.pos.y + Math.sin(this.time * 3) * 0.5


        if (this.score >= this.nextSpeedScore) {
            this.shootSpeed *= 0.98
            console.log(`shootSpeed: ${60 / this.shootSpeed}`)
            this.scene.ui.upgradeLabel2.text = `ShootingSpeed: ${Math.round(60 / this.shootSpeed)} bullets per second`
            this.nextSpeedScore += 25
            this.lastScoreForSpeed = this.score
        }

        if (this.score >= this.nextDamageScore) {
            this.damage += 1
            console.log(`damage: ${this.damage}`)
            this.scene.ui.upgradeLabel1.text = `Damage: ${this.damage}`
            this.nextDamageScore += 50
            this.lastScoreForDamage = this.score
        }

        if (this.score >= this.nextPiercingScore) {
            this.piercing += 1
            console.log(`piercing: ${this.piercing}`)
            this.scene.ui.upgradeLabel3.text = `Piercing: ${this.piercing}`
            this.nextPiercingScore += 100
            this.lastScoreForPiercing = this.score
        }

        this.shootTimer += delta / 1000
        const secondsPerShot = Math.max(1 / 60, this.shootSpeed / 60)

        if (this.shootTimer >= secondsPerShot) {
            this.shootTimer -= secondsPerShot
            this.shoot()
        }

        if (this.xp >= (50 * 1.5 * this.lvl)) {
            this.xp = 0
            this.lvl += 1
            this.scene.ui.XPbar.scale = new Vector(this.scene.player1.xp / (50 * 1.5 * this.lvl), 1)
        }
    }

    shoot() {
        let bubble = new Bubbles(this.pos.x, this.pos.y, this.piercing)
        this.scene.add(bubble)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof LavaCrawler) {
            this.health -= 10
            this.scene.ui.healthbar.scale = new Vector(this.health / 100, 1)
            this.scene.ui.healthLabel.text = `Health: ${this.health}`
            this.score += 1
            other.owner.kill()
        }
    }
}