import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/lavaLake.png'),
    StartBackground: new ImageSource('images/startBackground.png'),
    LavaCrawler: new ImageSource('images/lavaCrawler.png'),
    WaterBlob: new ImageSource('images/waterBlob.png'),
    Bubbles: new ImageSource('images/bubble.png'),
    HealthPack: new ImageSource('images/healthPack.png'),
    XP: new ImageSource('images/XP.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader }