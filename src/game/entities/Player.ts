import Phaser from "phaser";

export class Player
  extends Phaser.Physics.Arcade.Sprite {

  body!: Phaser.Physics.Arcade.Body;

  cursors:
    Phaser.Types.Input.Keyboard.CursorKeys;

  speed = 220;

  moveVector = {
    x: 0,
    y: 0,
  };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
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

    const keyboard =
      scene.input.keyboard;

    if (!keyboard) {
      throw new Error(
        "Keyboard not available"
      );
    }

    this.cursors =
      keyboard.createCursorKeys();
  }

  setMoveVector(
    x: number,
    y: number
  ) {
    this.moveVector.x = x;

    this.moveVector.y = y;
  }

  update() {
    let vx = 0;
    let vy = 0;

    // PC 키보드
    if (this.cursors.left.isDown) {
      vx = -1;
    }

    if (this.cursors.right.isDown) {
      vx = 1;
    }

    if (this.cursors.up.isDown) {
      vy = -1;
    }

    if (this.cursors.down.isDown) {
      vy = 1;
    }

    // 모바일 드래그 이동
    if (
      vx === 0 &&
      vy === 0
    ) {
      vx = this.moveVector.x;

      vy = this.moveVector.y;
    }

    this.setVelocity(
      vx * this.speed,
      vy * this.speed
    );

    this.body.velocity.normalize().scale(
      this.speed
    );
  }
}