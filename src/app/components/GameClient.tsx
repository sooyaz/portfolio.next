"use client";

import { useEffect } from "react";

export default function GameClient() {
  useEffect(() => {
    let game: any;

    const init = async () => {
      const { StartGame } = await import(
        "@/game/main"
      );

      game = StartGame("game-container");
    };

    init();

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div
      id="game-container"
      className="w-screen h-screen overflow-hidden"
    />
  );
}