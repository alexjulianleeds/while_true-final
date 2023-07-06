import { CrashSystem } from "./crash_system";
import { setNewVideoTexture } from "./video"

export function crashFactory(scene_models: Array<Entity>) {
    scene_models.every(model => engine.removeEntity(model))
    setNewVideoTexture('https://bambinoglade.com/cone-model/jetski/jetski-sequence-2.m3u8')
    engine.addSystem(new CrashSystem(1));
}