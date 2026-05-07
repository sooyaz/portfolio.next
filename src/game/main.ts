import Phaser from "phaser";

import { GameScene } from "./scenes/GameScene";

export const StartGame = (
  parent: string
) => {
  return new Phaser.Game({
    type: Phaser.AUTO,

    width: window.innerWidth,
    height: window.innerHeight,

    parent,

    backgroundColor: "#111111",

    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter:
        Phaser.Scale.CENTER_BOTH,
    },

    physics: {
      default: "arcade",

      arcade: {
        debug: false,
      },
    },

    scene: [GameScene],
  });
};