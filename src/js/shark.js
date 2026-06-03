import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Game } from './game.js'
import { Map } from './map.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Bubbles } from './bubbles.js'
import { Mines } from './mines.js'


export class Shark extends Actor {

    map = new Map()

    constructor(myPosX, player) {
        super({
            width: Resources.Shark.width,
            height: Resources.Shark.height
        })
        console.log("i am a Shark")
        this.myPosX = myPosX
        this.playerNum = player
    }

    onInitialize(engine) {
        this.health = 100

        this.score = 0

        this.graphics.use(Resources.Shark.toSprite())
        this.graphics.flipHorizontal = true
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

        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x <= Math.abs(Resources.Shark.width) / 2) {
            this.pos.x = Math.abs(Resources.Shark.width) / 2
        }
        if (this.pos.x >= this.map.mapWidth - Math.abs(Resources.Shark.width) / 2) {
            this.pos.x = this.map.mapWidth - Math.abs(Resources.Shark.width) / 2
        }
        if (this.pos.y >= this.map.mapHeight - Math.abs(Resources.Shark.height) / 2) {
            this.pos.y = this.map.mapHeight - Math.abs(Resources.Shark.height) / 2
        }
        if (this.pos.y <= Math.abs(Resources.Shark.height) / 2) {
            this.pos.y = Math.abs(Resources.Shark.height) / 2
        }


        if (this.health <= 0) {
            this.kill()
            this.scene.engine.stop()
        }

        this.time += delta / 1000
        this.SecondsPast = this.time

        this.pos.y = this.pos.y + Math.sin(this.time * 3) * 0.5

        if (this.score >= this.nextSpeedScore) {
            this.shootSpeed *= 0.98
            console.log(`shootSpeed: ${60 / this.shootSpeed}`)
            this.scene.engine.ui.upgradeLabel2.text = `ShootingSpeed: ${Math.round(60 / this.shootSpeed)} bullets per second`
            this.nextSpeedScore += 25
            this.lastScoreForSpeed = this.score
        }

        if (this.score >= this.nextDamageScore) {
            this.damage += 1
            console.log(`damage: ${this.damage}`)
            this.scene.engine.ui.upgradeLabel1.text = `Damage: ${this.damage}`
            this.nextDamageScore += 50
            this.lastScoreForDamage = this.score
        }

        if (this.score >= this.nextPiercingScore) {
            this.piercing += 1
            console.log(`piercing: ${this.piercing}`)
            this.scene.engine.ui.upgradeLabel3.text = `Piercing: ${this.piercing}`
            this.nextPiercingScore += 100
            this.lastScoreForPiercing = this.score
        }

        this.shootTimer += delta / 1000
        const secondsPerShot = Math.max(1 / 60, this.shootSpeed / 60) // minimaal 1 frame (=1/60s)
        
        if (this.shootTimer >= secondsPerShot) {
            this.shootTimer -= secondsPerShot
            this.shoot()
        }
    }

    shoot() {
        if (this.graphics.flipHorizontal) {
            let bubble = new Bubbles(this.pos.x, this.pos.y, -1, this.piercing)
            this.scene.add(bubble)
        }
        else {
            let bubble = new Bubbles(this.pos.x, this.pos.y, 1, this.piercing)
            this.scene.add(bubble)
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Fish) {
            this.health -= 10
            this.scene.engine.ui.healthbar.scale = new Vector(this.health / 100, 1)
            this.scene.engine.ui.healthLabel.text = `Health: ${this.health}`
            this.score += 1
            this.scene.engine.ui.scoreLabel.text = `Score: ${this.scene.engine.player1.score}`
            other.owner.kill()
        }
    }
}