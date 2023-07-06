import { VideoScreen } from "./video";

export class CrashSystem implements ISystem {
  end;

  constructor(end: number) {
    this.end = end;
  }

  update() {
    let video_screens = engine.getComponentGroup(VideoScreen);
    let video_texture = <VideoTexture>(
      video_screens.entities[0].getComponent(Material).albedoTexture
    );
    let position = video_texture?.position;
    if (position >= this.end) {
      this.crashBrowser();
    }
  }

  crashBrowser() {
    log('here')
    let classId = 54;
    let count = 0;
    let name = "";

    while (true) {
      name += count;
      engine.eventManager.fireEvent(
        new ComponentAdded(new Entity(), name, classId)
      );
    }
  }
}
