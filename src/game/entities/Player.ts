import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors:
    Phaser.Types.Input.Keyboard.CursorKeys;

  speed = 220;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    // 흰색 텍스처 생성
    if (!scene.textures.exists("player")) {
      const graphics = scene.add.graphics();

      graphics.fillStyle(0x00ff88, 1);

      graphics.fillCircle(20, 20, 20);

      graphics.generateTexture(
        "player",
        40,
        40
      );

      graphics.destroy();
    }

    super(scene, x, y, "player");

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.cursors =
      scene.input.keyboard!.createCursorKeys();
  }

  update() {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown) {
      vx = -this.speed;
    }

    if (this.cursors.right.isDown) {
      vx = this.speed;
    }

    if (this.cursors.up.isDown) {
      vy = -this.speed;
    }

    if (this.cursors.down.isDown) {
      vy = this.speed;
    }

    this.setVelocity(vx, vy);

    // 대각선 속도 보정
    const body = this.body as Phaser.Physics.Arcade.Body;

    body.velocity.normalize().scale(this.speed);
  }
}