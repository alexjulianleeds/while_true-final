@Component("videoScreen")
export class VideoScreen {}

export function setNewVideoTexture(path: string) {
    const myMaterial = new BasicMaterial();
    const myVideoClip = new VideoClip(
      path
    );
    const myVideoTexture = new VideoTexture(myVideoClip, {
      wrap: 1,
      samplingMode: 0,
    });
    myMaterial.texture = myVideoTexture;
    myVideoTexture.play();
    myVideoTexture.volume = 0.25;
    myVideoTexture.loop = true;
    myVideoTexture.seekTime(99999999999);
  
    let video_screens = engine.getComponentGroup(VideoScreen);
  
    video_screens.entities.forEach((screen) => {
      screen.removeComponent(BasicMaterial);
      screen.addComponentOrReplace(myMaterial);
    });
  
    myVideoTexture.play();
  }