import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange, Label, Font, FontUnit, Color, BoundingBox, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Map } from './map.js'
import { LavaCrawler } from './lavaCrawler.js'
import { LavaBeast } from './lavaBeast.js'
import { Bubbles } from './bubbles.js'
import { LevelUpReward } from './levelUpReward.js'
import { Player } from './player.js'


export class WaterBlob extends Player {

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
        this.shootSpeed = 2
        this.lastScoreForSpeed = 0
        this.nextSpeedScore = 25
        this.damage = 1
        this.lastScoreForDamage = 0
        this.nextDamageScore = 50
        this.piercing = 1
        this.lastScoreForPiercing = 0
        this.nextPiercingScore = 100
        this.xpPickupRange = 300
        this.xpValue = 1
        this.xp = 0
        this.lvl = 1
        this.healthRegen = 0
        this.healTimer = 0
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

        this.time += delta / 1000
        this.SecondsPast = this.time

        this.pos.y = this.pos.y + Math.sin(this.time * 3) * 0.5

        this.shootTimer += delta / 1000
        const secondsPerShot = 1 / this.shootSpeed

        if (this.shootTimer >= secondsPerShot) {
            this.shootTimer -= secondsPerShot
            this.shoot()
        }

        if (this.xp >= (50 * 1.2 * this.lvl)) {
            this.xp = 0
            this.lvl += 1
            this.scene.ui.XPbar.scale = new Vector(this.scene.player1.xp / (50 * 1.2 * this.lvl), 1)
            this.scene.ui.lvlLabel.text = `Lvl: ${this.lvl}`
            if (this.levelUpBoost && (this.levelUpBoost.card1 || this.levelUpBoost.card2 || this.levelUpBoost.card3)) {
                this.levelUpBoost.card1.kill()
                this.levelUpBoost.card2.kill()
                this.levelUpBoost.card3.kill()
            }
            this.levelUpBoost = new LevelUpReward(this.pos.x, this.pos.y)
            this.scene.add(this.levelUpBoost)
        }

        this.healTimer += delta / 1000
        const secondsPerHeal = 20

        if (this.healTimer >= secondsPerHeal && this.health < 100) {
            this.healTimer -= secondsPerHeal
            this.health += this.healthRegen
            this.scene.ui.healthbar.scale = new Vector(this.health / 100, 1)
            this.scene.ui.healthLabel.text = `Health: ${this.scene.player1.health}`
        }

    }

    shoot() {
        let bubble = new Bubbles(this.pos.x, this.pos.y, this.piercing)
        this.scene.add(bubble)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof LavaCrawler) {
            this.health -= this.scene.lavaCrawlerDamage
            this.scene.ui.healthbar.scale = new Vector(this.health / 100, 1)
            this.scene.ui.healthLabel.text = `Health: ${this.health}`
            this.score += 1
            other.owner.kill()
        }
        if (other.owner instanceof LavaBeast) {
            this.health -= this.scene.lavaBeastDamage
            this.scene.ui.healthbar.scale = new Vector(this.health / 100, 1)
            this.scene.ui.healthLabel.text = `Health: ${this.health}`
            this.score += 1
            other.owner.kill()
        }
    }
}