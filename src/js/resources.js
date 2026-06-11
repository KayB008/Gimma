import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/lavaLake.png'),
    StartBackground: new ImageSource('images/startBackground.png'),
    LavaCrawler: new ImageSource('images/lavaCrawler.png'),
    LavaBeast: new ImageSource('images/lavaBeast.png'),
    WaterBlob: new ImageSource('images/waterBlob.png'),
    Bubbles: new ImageSource('images/bubble.png'),
    HealthPack: new ImageSource('images/healthPack.png'),
    XP: new ImageSource('images/XP.png'),
    DamageBoostCommon: new ImageSource('images/damageUpCommon.png'),
    DamageBoostUncommon: new ImageSource('images/damageUpUncommon.png'),
    DamageBoostRare: new ImageSource('images/damageUpRare.png'),
    DamageBoostEpic: new ImageSource('images/damageUpEpic.png'),
    DamageBoostLegendary: new ImageSource('images/damageUpLegendary.png'),
    FireRateBoostCommon: new ImageSource('images/fireRateUpCommon.png'),
    FireRateBoostUncommon: new ImageSource('images/fireRateUpUncommon.png'),
    FireRateBoostRare: new ImageSource('images/fireRateUpRare.png'),
    FireRateBoostEpic: new ImageSource('images/fireRateUpEpic.png'),
    FireRateBoostLegendary: new ImageSource('images/fireRateUpLegendary.png'),
    MovementSpeedBoostCommon: new ImageSource('images/movementSpeedUpCommon.png'),
    MovementSpeedBoostUncommon: new ImageSource('images/movementSpeedUpUncommon.png'),
    MovementSpeedBoostRare: new ImageSource('images/movementSpeedUpRare.png'),
    MovementSpeedBoostEpic: new ImageSource('images/movementSpeedUpEpic.png'),
    MovementSpeedBoostLegendary: new ImageSource('images/movementSpeedUpLegendary.png'),
    PiercingBoostCommon: new ImageSource('images/piercingUpCommon.png'),
    PiercingBoostRare: new ImageSource('images/piercingUpRare.png'),
    PiercingBoostLegendary: new ImageSource('images/piercingUpLegendary.png'),
    AutomaticHealthRegenCommon: new ImageSource('images/automaticHealthRegenCommon.png'),
    AutomaticHealthRegenUncommon: new ImageSource('images/automaticHealthRegenUncommon.png'),
    AutomaticHealthRegenRare: new ImageSource('images/automaticHealthRegenRare.png'),
    AutomaticHealthRegenEpic: new ImageSource('images/automaticHealthRegenEpic.png'),
    AutomaticHealthRegenLegendary: new ImageSource('images/automaticHealthRegenLegendary.png'),
    XpPickupRangeBoostCommon: new ImageSource('images/xpPickupRangeUpCommon.png'),
    XpPickupRangeBoostUncommon: new ImageSource('images/xpPickupRangeUpUncommon.png'),
    XpPickupRangeBoostRare: new ImageSource('images/xpPickupRangeUpRare.png'),
    XpPickupRangeBoostEpic: new ImageSource('images/xpPickupRangeUpEpic.png'),
    XpPickupRangeBoostLegendary: new ImageSource('images/xpPickupRangeUpLegendary.png'),
    XpValueBoostCommon: new ImageSource('images/xpValueUpCommon.png'),
    XpValueBoostUncommon: new ImageSource('images/xpValueUpUncommon.png'),
    XpValueBoostRare: new ImageSource('images/xpValueUpRare.png'),
    XpValueBoostEpic: new ImageSource('images/xpValueUpEpic.png'),
    XpValueBoostLegendary: new ImageSource('images/xpValueUpLegendary.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader }