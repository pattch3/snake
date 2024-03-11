import { Game } from './game.js';

const Snake = new Game('game', {
  area: { width: 20, height: 20 },
  game: { speed: 8, startLength: 5 },
});
Snake.start();
