import { CrashSystem } from "./crash_system";
import { setNewVideoTexture } from "./video"

export function crashFactory(scene_models: Array<Entity>) {
    const link = "https://bambinoglade.com/cone-model/jetski/jetski-sequence-2.m3u8"
    // const link = 'https://player.vimeo.com/external/842695625.m3u8?s=2ffcba6fe83fdfe9dfb0fc269722cfb4d8b2bf19&logging=false'
    scene_models.every(model => engine.removeEntity(model))
    setNewVideoTexture(link)
    engine.addSystem(new CrashSystem(1));
}