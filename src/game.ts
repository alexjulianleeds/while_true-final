import { hud } from "@dcl/builder-hud"
import { elevatorFactory } from "./elevator";
import { VideoScreen } from "./video";

// const waterLink = 'https://player.vimeo.com/external/842697864.m3u8?s=313414c459d6c8c90ea82ad446214d22976a89ea&logging=false'
const waterLink = "https://bambinoglade.com/cone-model/water-texture/water-texture.m3u8"
// // // Create the scene as a parent for all assets within // // //

const modArea = new Entity()

let cameraModifier = new CameraModeArea({
  area: { box: new Vector3(16, 16, 16) },
  cameraMode: CameraMode.FirstPerson,
});

modArea.addComponent(
  new Transform({
    position: new Vector3(8, 8, 8),
  })
)

modArea.addComponent(cameraModifier);
engine.addEntity(modArea);

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

// Create the box stop to suspend the avatar at the proper height //
const boxstop = new Entity('boxstop')
boxstop.setParent(_scene)
const BoxStop = new GLTFShape("models/boxstop.glb")
BoxStop.withCollisions = true
BoxStop.isPointerBlocker = true
BoxStop.visible = false
boxstop.addComponentOrReplace(BoxStop)
const transform1 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
boxstop.addComponentOrReplace(transform1)
engine.addEntity(boxstop)

// Create the ground plane //

const entity = new Entity('entity')
entity.setParent(_scene)
const groundPlane = new GLTFShape("models/FloorBaseGrass_01.glb")
groundPlane.withCollisions = true
groundPlane.isPointerBlocker = true
groundPlane.visible = true
entity.addComponentOrReplace(groundPlane)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)
engine.addEntity(entity)

// Create the MESH Cube

const box = new Entity('box')
box.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(6.25, 0, 9.75),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
box.addComponentOrReplace(transform4)
const MeshCube = new GLTFShape("models/MESHCUBE.glb")
MeshCube.withCollisions = true
MeshCube.isPointerBlocker = true
MeshCube.visible = true
box.addComponentOrReplace(MeshCube)
engine.addEntity(box)
hud.attachToEntity(box)

// Swamp and Bowl

const swamp = new Entity('swamp')
swamp.setParent(_scene)
const transform5 = new Transform({
  position: new Vector3(6.25, 0, 9.75),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
swamp.addComponentOrReplace(transform5)
const SwampGlb = new GLTFShape('models/swamp.glb')
SwampGlb.withCollisions = true
SwampGlb.isPointerBlocker = true
SwampGlb.visible = true
swamp.addComponentOrReplace(SwampGlb)
engine.addEntity(swamp)
hud.attachToEntity(swamp)

const bowl = new Entity('bowl')
bowl.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(1.2, -8.6, 12.1),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 2, 2)
})
bowl.addComponentOrReplace(transform6)
const BowlGlb = new GLTFShape('models/bowl.glb')
BowlGlb.withCollisions = true
BowlGlb.isPointerBlocker = true
BowlGlb.visible = true
bowl.addComponentOrReplace(BowlGlb)
engine.addEntity(bowl)
hud.attachToEntity(bowl)

let scene_models = [swamp, bowl]

bowl.addComponent(
  new OnPointerDown(() => {
    let elevator = elevatorFactory(scene_models);
  })
);

// Image Textures

const towerMaterial1 = new BasicMaterial()
const towerMaterial2 = new BasicMaterial()
const towerTexture1 = new Texture('images/512cell1.png')
const towerTexture2 = new Texture('images/512cell2.png')

towerMaterial1.texture = towerTexture1
towerMaterial2.texture = towerTexture2

// Video stream link from Vimeo
const videoMaterial = new BasicMaterial();
const myVideoClip = new VideoClip(waterLink,)
// const myVideoClip = new VideoClip("https://bambinoglade.com/cone-model/water-texture/water-texture.m3u8",)
const myVideoTexture = new VideoTexture(myVideoClip, { wrap: 1, samplingMode: 0 })
videoMaterial.texture = myVideoTexture
myVideoTexture.play()
myVideoTexture.volume = 0.25
myVideoTexture.loop = true
myVideoTexture.seekTime(99999999999)

//////////////////////////////////////////
//// Create shape component for the Eastern Plane of the MESH Cube
const nplane = new PlaneShape()

// map the texture to each of the four corners of the plane
// middle third of the screen
nplane.uvs = [
  // inside
    0.5, 1,
  
    0, 1,
  
    0, 0.5,
  
    0.5, 0.5,

  // outside
    0.5, 1,
  
    0, 1,
  
    0, 0.5,
  
    0.5, 0.5,
  ]

//Create entity and assign shape and material
const NPlane = new Entity("NPlane")
NPlane.addComponent(nplane)
NPlane.addComponent(towerMaterial1)
NPlane.addComponent(new Transform({
  position: new Vector3(8, 13.993, 12.703),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(11.6, 11.6, 1)
}))
NPlane.addComponent(new VideoScreen())

engine.addEntity(NPlane)
hud.attachToEntity(NPlane)

//////////////////////////////////////////
//// Create shape component for the Eastern Plane of the MESH Cube
const eplane = new PlaneShape()

// map the texture to each of the four corners of the plane
// middle third of the screen
eplane.uvs = [
  // inside
    1, 1,

    0.5, 1,

    0.5, 0.5,

    1, 0.5,

  // outside
    1, 1,

    0.5, 1,

    0.5, 0.5,

    1, 0.5

  ]

//Create entity and assign shape and material
const EPlane = new Entity("EPlane")
EPlane.addComponent(eplane)
EPlane.addComponent(towerMaterial1)
EPlane.addComponent(new Transform({
  position: new Vector3(13.8, 13.993, 7.935),
  rotation: Quaternion.Euler(0, 90, 0),
  scale: new Vector3(11.6, 11.6, 1)
}))
EPlane.addComponent(new VideoScreen())

engine.addEntity(EPlane)
hud.attachToEntity(EPlane)

//////////////////////////////////////////

//Create shape component for the Southern Interior Plane of the MESH Cube
const splane = new PlaneShape()

// map the texture to each of the four corners of the plane
// middle third of the screen
splane.uvs = [
  // inside
    0.5, 0.5,
  
    0, 0.5, 
  
    0, 0,
  
    0.5, 0,
  
  // outside
    0.5, 0.5,
  
    0, 0.5, 
  
    0, 0,
  
    0.5, 0,
  ]

//Create entity and assign shape and material
const SPlane = new Entity("SPlane")
SPlane.addComponent(splane)
SPlane.addComponent(towerMaterial2)
SPlane.addComponent(new Transform({
  position: new Vector3(8.0, 14.001, 3.135),
  rotation: Quaternion.Euler(0, 180, 0),
  scale: new Vector3(11.6, 11.6, 1)
}))
SPlane.addComponent(new VideoScreen())

engine.addEntity(SPlane)
hud.attachToEntity(SPlane)

//////////////////////////////////////////////////

//// Create shape component for the Western Plane of the MESH Cube
const wplane = new PlaneShape()

// map the texture to each of the four corners of the plane
// middle third of the screen
wplane.uvs = [
  // inside
    1, 0.5,
  
    0.5, 0.5,
  
    0.5, 0,
  
    1, 0,
    
  // outside
    1, 0.5,
  
    0.5, 0.5,
  
    0.5, 0,
  
    1, 0,
  ]

//Create entity and assign shape and material
const WPlane = new Entity("WPlane")
WPlane.addComponent(wplane)
WPlane.addComponent(towerMaterial2)
WPlane.addComponent(new Transform({
  position: new Vector3(3.240, 14.0, 7.935),
  rotation: Quaternion.Euler(0, 270, 0),
  scale: new Vector3(11.6, 11.6, 1)
}))
WPlane.addComponent(new VideoScreen())

engine.addEntity(WPlane)
hud.attachToEntity(WPlane)

//////////////////////////////////////////////////

//// Create shape component for the Western Plane of the MESH Cube
const bplane = new PlaneShape()

// map the texture to each of the four corners of the plane
// middle third of the screen
bplane.uvs = [
  // inside
    1, 0.5,
  
    0.5, 0.5,
  
    0.5, 0,
  
    1, 0,
    
  // outside
    1, 0.5,
  
    0.5, 0.5,
  
    0.5, 0,
  
    1, 0,
  ]

//Create entity and assign shape and material
const BPlane = new Entity("BPlane")
BPlane.addComponent(bplane)
BPlane.addComponent(videoMaterial)
BPlane.addComponent(new Transform({
  position: new Vector3(8.05, 8.22, 7.92),
  rotation: Quaternion.Euler(90, 0, 0),
  scale: new Vector3(11.6, 11.6, 1)
}))
BPlane.addComponent(new VideoScreen())

engine.addEntity(BPlane)
hud.attachToEntity(BPlane)

///////////////////////////////////////////
myVideoTexture.play()

