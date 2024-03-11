import { Snake } from './snake.js';

export class Game {
  direction;
  points;
  speed;
  posX;
  posY;
  snake;

  constructor(canvasId, props) {
    this.canvas = document.getElementById(canvasId);
    this.props = props;
    this.scene = this.canvas.getContext('2d');
    this.onChangeDirection = new Event('onChangeDirection', {
      bubbles: true,
    });
    this.onChangeSpeed = new Event('onChangeSpeed', { bubbles: true });
    this.interval;
  }

  init() {
    document.addEventListener('keydown', ({ key }) => this.onClickArrow(key));
    this.canvas.width = this.props.area.width * 20;
    this.canvas.height = this.props.area.width * 20;

    this.startGame();

    //document.addEventListener('onChangeSpeed', () => this.startGame());
  }

  startGame() {
    this.posX = Math.floor(Math.random() * this.props.area.width);
    this.posY = Math.floor(Math.random() * this.props.area.height);
    this.direction = ['up', 'down', 'left', 'right'][
      Math.floor(Math.random() * 4)
    ];
    this.speed = this.props.game.speed;
    this.points = 0;
    this.snake = new Snake(this.scene, {
      sceneWidth: this.props.area.width,
      sceneHeight: this.props.area.height,
      minLength: this.props.game.startLength,
    });

    this.snake.init(this.direction, this.posX, this.posY);
    this.makeFrames();
  }

  makeFrames() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {

      setTimeout(
        () => this.snake.drawSnake(this.posX, this.posY),
        0
      );

      if (this.direction === 'up') {
        if (this.posY === 0) {
          this.posY = this.props.area.height - 1;
        } else {
          this.posY--;
        }
      }
      if (this.direction === 'down') {
        if (this.posY === this.props.area.height - 1) {
          this.posY = 0;
        } else {
          this.posY++;
        }
      }
      if (this.direction === 'left') {
        if (this.posX === 0) {
          this.posX = this.props.area.width - 1;
        } else {
          this.posX--;
        }
      }
      if (this.direction === 'right') {
        if (this.posX === this.props.area.width - 1) {
          this.posX = 0;
        } else {
          this.posX++;
        }
      }
    }, 550 - this.speed * 50);
  }

  onClickArrow(key) {
    switch (key) {
      case 'ArrowUp':
        this.direction = this.direction !== 'down' ? 'up' : this.direction;
        break;
      case 'ArrowDown':
        this.direction = this.direction !== 'up' ? 'down' : this.direction;
        break;
      case 'ArrowLeft':
        this.direction = this.direction !== 'right' ? 'left' : this.direction;
        break;
      case 'ArrowRight':
        this.direction = this.direction !== 'left' ? 'right' : this.direction;
        break;
    }

    this.canvas.dispatchEvent(this.onChangeDirection);
  }

  start() {
    this.init();
  }
}
