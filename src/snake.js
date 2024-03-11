export class Snake {
  snake = [];
  length = 3;
  posX;
  posY;

  constructor(scene, props) {
    this.scene = scene;
    this.snakeArray = [];
    this.isLoaded = false;
    this.img = new Image();
    this.props = props;
  }

  init(direction, posX, posY) {
    const { img, snake, props } = this;
    img.src = `src/images/snake.jpg`;
    img.onload = () => {
      this.isLoaded = true;
      this.posX = posX;
      this.posY = posY;
      // make first snake body
      
      for (let i = 0; i < props.minLength; i++) {
        let newX;
        let newY;
        if (direction === 'up' || direction === 'down') {
          newX = this.posX;
          newY = this.posY > this.props.sceneHeight ? i + 1 : this.posY;  
        }
        
        if (direction === 'left' || direction === 'right') {
          newX = this.posX > this.props.sceneWidth ? i + 1: this.posX;  
          newY = this.posY;
        }

        snake.push({posX: newX, posY: newY});
      }
    };
  }

  drawSnake(posX, posY) {
    const { isLoaded, scene, snake } = this;
    if (isLoaded) {
      scene.clearRect(0, 0, 20 * 20, 20 * 20);
      snake.splice(0,1);
      snake.push({
        posX, posY
      });
      snake.map((snakePart) => {
        scene.drawImage(this.img, snakePart.posX * 20, snakePart.posY * 20);
      });
    }
  }
}
