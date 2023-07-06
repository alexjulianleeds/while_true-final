import { ElevatorSystem } from "./elevator_system";

export function elevatorFactory(scene_models: Array<Entity>) {
  const plane = new Entity("plane");

  engine.addEntity(plane);

  let shape = new PlaneShape();
  shape.withCollisions = true;
  
  plane.addComponent(shape);
  
  const transform = new Transform({
    position: new Vector3(9.75, 8, 6.15),
    rotation: Quaternion.Euler(90, 0, 0),
    scale: new Vector3(11.75, 12, 16),
  });
  
  plane.addComponent(transform);
  
  const material = new Material();
  material.albedoColor = new Color4(1, 1, 1, 0);
  
  plane.addComponent(material);
  
  let elevator_system = new ElevatorSystem(plane, scene_models);
  engine.addSystem(elevator_system);
  return plane;  
}