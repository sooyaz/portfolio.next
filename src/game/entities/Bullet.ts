import Phaser from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  speed = 500;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    if (!scene.textures.exists("bullet")) {
      const graphics = scene.add.graphics();

      graphics.fillStyle(0xffff00, 1);

      graphics.fillCircle(6, 6, 6);

      graphics.generateTexture(
        "bullet",
        12,
        12
      );

      graphics.destroy();
    }

    super(scene, x, y, "bullet");

    scene.add.existing(this);

    scene.physics.add.existing(this);
  }

  fire(targetX: number, targetY: number) {
    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );

    const body =
    this.body as Phaser.Physics.Arcade.Body;

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      body.velocity
    );
  }
}