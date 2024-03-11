export class Area {
  
  constructor(
    scene,
    options = {
      width: 50,
      height: 50,
    }
  ) {
    this.options = options;
    this.scene = scene;
  }

  init(callback = () => {}) {
    const options = {
      ...this.options,
    };

    const { width, height } = options;
    const img = new Image();
    img.src = `src/images/empty.jpg`;
    img.onload = () => {
      callback();
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          this.fillRect(img, x, y);
        }
      }

    };
  }

  fillRect(img, x, y) {
    const { scene } = this;

    scene.drawImage(img, x * 20, y * 20);
  }
  
}
