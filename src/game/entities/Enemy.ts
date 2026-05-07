import Phaser from "phaser";
import { Player } from "./Player";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  speed = 70;

  player: Player;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    player: Player
  ) {
    // 빨간 원 텍스처
    if (!scene.textures.exists("enemy")) {
      const graphics = scene.add.graphics();

      graphics.fillStyle(0xff4444, 1);

      graphics.fillCircle(16, 16, 16);

      graphics.generateTexture(
        "enemy",
        32,
        32
      );

      graphics.destroy();
    }

    super(scene, x, y, "enemy");

    this.player = player;

    scene.add.existing(this);

    scene.physics.add.existing(this);
  }

  update() {
    this.scene.physics.moveToObject(
      this,
      this.player,
      this.speed
    );
  }
}