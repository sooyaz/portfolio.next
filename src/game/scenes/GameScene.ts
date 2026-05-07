import Phaser from "phaser";

import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";
import { Bullet } from "../entities/Bullet";

export class GameScene extends Phaser.Scene {
  player!: Player;

  enemies!: Phaser.GameObjects.Group;

  bullets!: Phaser.GameObjects.Group;

  lastShotTime = 0;

  constructor() {
    super("GameScene");
  }

  create() {
    // 월드 크기
    this.physics.world.setBounds(
      -2000,
      -2000,
      4000,
      4000
    );

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
      delay: 1000,
      loop: true,

      callback: () => {
        this.spawnEnemy();
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
    this.player.update();

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