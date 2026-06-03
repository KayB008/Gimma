import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/lavaLake.png'),
    LavaCrawler: new ImageSource('images/lavaCrawler.png'),
    WaterBlob: new ImageSource('images/waterBlob.png'),
    Bones: new ImageSource('images/bones.png'),
    Bubbles: new ImageSource('images/bubble.png'),
    Mines: new ImageSource('images/mine.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader }