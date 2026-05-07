import Phaser from "phaser";

import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";
import { Bullet } from "../entities/Bullet";

export class GameScene extends Phaser.Scene {
  player!: Player;

  enemies!: Phaser.GameObjects.Group;

  bullets!: Phaser.GameObjects.Group;

  lastShotTime = 0;
  
  pointerStart = {
    x: 0,
    y: 0,
  };

  isTouching = false;

  background!: Phaser.GameObjects.TileSprite;

  enemySpawnCount = 2;

  gameTime = 0;

  mapBorder!: Phaser.GameObjects.Graphics;

  isGameOver = false;

  gameOver() {
    if (this.isGameOver) return;

    this.isGameOver = true;

    // 플레이어 정지
    this.player.setVelocity(0, 0);

    // 물리 정지
    this.physics.pause();

    // 카메라 효과
    this.cameras.main.shake(
      300,
      0.01
    );

    this.cameras.main.flash(
      300,
      255,
      0,
      0
    );

    // const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    // const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    console.log(">>>>>", this.cameras.main.worldView.x, this.cameras.main.worldView.y);
    console.log(">>>>>", this.cameras.main.width/2, this.cameras.main.height/2);
    console.log(">>>>>", centerX, centerY);

    // 어두운 배경
    const overlay =
      this.add.rectangle(
        centerX,
        centerY,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000,
        0.7
      );

    overlay.setScrollFactor(0);

    // 게임오버 텍스트
    const gameOverText =
      this.add.text(
        centerX,
        centerY - 80,
        "GAME OVER",
        {
          fontSize: "48px",
          color: "#ff4444",
          fontStyle: "bold",
        }
      );

    gameOverText.setOrigin(0.5);

    gameOverText.setScrollFactor(0);

    // 설명
    const subText =
      this.add.text(
        centerX,
        centerY,
        "적에게 잡혔습니다",
        {
          fontSize: "24px",
          color: "#ffffff",
        }
      );

    subText.setOrigin(0.5);

    subText.setScrollFactor(0);

    // 재시작 버튼
    const restartButton =
      this.add.text(
        centerX,
        centerY + 100,
        "다시 시작",
        {
          fontSize: "32px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: {
            x: 20,
            y: 10,
          },
        }
      );

    restartButton.setOrigin(0.5);

    restartButton.setScrollFactor(0);

    restartButton.setInteractive({
      useHandCursor: true,
    });

    restartButton.on(
      "pointerdown",
      () => {
        this.isGameOver = false;
        this.scene.restart();
      }
    );
  }

  constructor() {
    super("GameScene");
  }

  create() {
    // 배경 텍스처 생성
    const graphics = this.add.graphics();

    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(0, 0, 128, 128);

    // 랜덤 점 패턴
    for (let i = 0; i < 80; i++) {
      const gray =
        Phaser.Math.Between(40, 70);

      const color =
        Phaser.Display.Color.GetColor(
          gray,
          gray,
          gray
        );

      graphics.fillStyle(color, 1);

      graphics.fillCircle(
        Phaser.Math.Between(0, 128),
        Phaser.Math.Between(0, 128),
        Phaser.Math.Between(1, 3)
      );
    }

    // 랜덤 선 패턴
    for (let i = 0; i < 10; i++) {
      graphics.lineStyle(
        1,
        0x2a2a2a,
        0.5
      );

      graphics.beginPath();

      graphics.moveTo(
        Phaser.Math.Between(0, 128),
        Phaser.Math.Between(0, 128)
      );

      graphics.lineTo(
        Phaser.Math.Between(0, 128),
        Phaser.Math.Between(0, 128)
      );

      graphics.strokePath();
    }

    graphics.generateTexture(
      "bg-pattern",
      128,
      128
    );

    graphics.destroy();

    // 월드 크기
    const worldX = -2000;
    const worldY = -2000;
    const worldWidth = 4000;
    const worldHeight = 4000;

    this.physics.world.setBounds(
      worldX,
      worldY,
      worldWidth,
      worldHeight
    );

    const mapBackground = this.add.rectangle(
                                              0,
                                              0,
                                              worldWidth,
                                              worldHeight,
                                              0x1b2a1b
                                            );

    mapBackground.setDepth(-10);

    const darkness = this.add.graphics();

    darkness.fillStyle(0x050505, 1);

    // 위
    darkness.fillRect(
      -10000,
      -10000,
      20000,
      8000
    );

    // 아래
    darkness.fillRect(
      -10000,
      2000,
      20000,
      8000
    );

    // 좌
    darkness.fillRect(
      -10000,
      -2000,
      8000,
      4000
    );

    // 우
    darkness.fillRect(
      2000,
      -2000,
      8000,
      4000
    );

    darkness.setDepth(-9);

    const wall =
      this.add.graphics();

    wall.setDepth(10);

    // 바깥 glow 느낌
    wall.lineStyle(
      40,
      0xff0000,
      0.15
    );

    wall.strokeRect(
      worldX,
      worldY,
      worldWidth,
      worldHeight
    );

    // 메인 벽
    wall.lineStyle(
      12,
      0xff4444,
      1
    );

    wall.strokeRect(
      worldX,
      worldY,
      worldWidth,
      worldHeight
    );

    // 안쪽 밝은 라인
    wall.lineStyle(
      4,
      0xffffff,
      0.3
    );

    wall.strokeRect(
      worldX,
      worldY,
      worldWidth,
      worldHeight
    );

    // 맵 경계선
    this.mapBorder = this.add.graphics();

    this.mapBorder.lineStyle(
      20,
      0xff4444,
      0.8
    );

    this.mapBorder.strokeRect(
      worldX,
      worldY,
      worldWidth,
      worldHeight
    );

    // 외곽 어둡게
    this.mapBorder.fillStyle(
      0x000000,
      0.35
    );

    // 상단
    this.mapBorder.fillRect(
      worldX - 5000,
      worldY - 5000,
      worldWidth + 10000,
      5000
    );

    // 하단
    this.mapBorder.fillRect(
      worldX - 5000,
      worldY + worldHeight,
      worldWidth + 10000,
      5000
    );

    // 좌측
    this.mapBorder.fillRect(
      worldX - 5000,
      worldY,
      5000,
      worldHeight
    );

    // 우측
    this.mapBorder.fillRect(
      worldX + worldWidth,
      worldY,
      5000,
      worldHeight
    );

    this.background =
      this.add.tileSprite(
        0,
        0,
        6000,
        6000,
        "bg-pattern"
      );

    this.background.setOrigin(0.5);

    this.background.setScrollFactor(1);

    // 플레이어
    this.player = new Player(this, 0, 0);

    // 카메라
    this.cameras.main.startFollow(this.player);

    this.cameras.main.setZoom(1);

    // 그룹
    this.enemies = this.add.group();

    this.bullets = this.add.group();

    // 적 생성 타이머
    this.time.addEvent({
      delay: 800,
      loop: true,

      callback: () => {
        for (
          let i = 0;
          i < this.enemySpawnCount;
          i++
        ) {
          this.spawnEnemy();
        }
      },
    });

    // 충돌 처리
    this.physics.add.overlap(
      this.bullets,
      this.enemies,
      (bulletObj, enemyObj) => {
        bulletObj.destroy();
        enemyObj.destroy();
      }
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      () => {
        this.gameOver();
      }
    );


    // 터치 시작
    this.input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer) => {
        this.isTouching = true;

        this.pointerStart.x = pointer.x;
        this.pointerStart.y = pointer.y;
      }
    );

    // 드래그 이동
    this.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        if (!this.isTouching) return;

        const dx =
          pointer.x - this.pointerStart.x;

        const dy =
          pointer.y - this.pointerStart.y;

        const length = Math.sqrt(
          dx * dx + dy * dy
        );

        if (length > 10) {
          this.player.setMoveVector(
            dx / length,
            dy / length
          );
        }
      }
    );

    // 터치 종료
    this.input.on("pointerup", () => {
      this.isTouching = false;

      this.player.setMoveVector(0, 0);
    });

  }

  spawnEnemy() {
    const angle = Phaser.Math.FloatBetween(
      0,
      Math.PI * 2
    );

    const distance = 700;

    const x =
      this.player.x +
      Math.cos(angle) * distance;

    const y =
      this.player.y +
      Math.sin(angle) * distance;

    const enemy = new Enemy(
      this,
      x,
      y,
      this.player
    );

    this.enemies.add(enemy);
  }

  shootNearestEnemy() {
    const enemies = this.enemies.getChildren();

    if (enemies.length === 0) return;

    let nearestEnemy = enemies[0] as Enemy;

    let nearestDistance =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        nearestEnemy.x,
        nearestEnemy.y
      );

    enemies.forEach((enemyObj) => {
      const enemy = enemyObj as Enemy;

      const dist =
        Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          enemy.x,
          enemy.y
        );

      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestEnemy = enemy;
      }
    });

    const bullet = new Bullet(
      this,
      this.player.x,
      this.player.y
    );

    bullet.fire(
      nearestEnemy.x,
      nearestEnemy.y
    );

    this.bullets.add(bullet);
  }

  update(time: number) {
    if (this.isGameOver) return;

    this.background.tilePositionX = this.cameras.main.scrollX * 0.3;

    this.background.tilePositionY = this.cameras.main.scrollY * 0.3;

    const margin = 250;

    const worldBounds = this.physics.world.bounds;

    const nearEdge =
      this.player.x <
        worldBounds.x + margin ||
      this.player.x >
        worldBounds.right - margin ||
      this.player.y <
        worldBounds.y + margin ||
      this.player.y >
        worldBounds.bottom - margin;

    if (nearEdge) {
      this.cameras.main.setBackgroundColor(
        "#220000"
      );
    } else {
      this.cameras.main.setBackgroundColor(
        "#111111"
      );
    }
      
    this.player.update();

    this.gameTime += 0.016;

    this.enemySpawnCount = 2 + Math.floor(this.gameTime / 10);

    // 적 업데이트
    this.enemies.getChildren().forEach((enemyObj) => {
      const enemy = enemyObj as Enemy;

      enemy.update();
    });

    // 자동 공격
    if (time > this.lastShotTime + 500) {
      this.lastShotTime = time;

      this.shootNearestEnemy();
    }
  }
}