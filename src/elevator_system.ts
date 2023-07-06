import { crashFactory } from "./crashFactory";

export class ElevatorSystem implements ISystem {
  plane;
  scene_models;

  constructor(plane: Entity, scene_models: Array<Entity>) {
    this.plane = plane;
    this.scene_models = scene_models;
  }

  update() {
    let transform = this.plane.getComponent(Transform);
    if (transform.position.y < 15) {
      let distance = Vector3.Up().scale(0.05);
      transform.translate(distance);
    } else {
      engine.removeEntity(this.plane);
      crashFactory(this.scene_models);
    }
  }
}
