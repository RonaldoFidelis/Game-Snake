const canvas = document.querySelector("canvas")

class Game {
  constructor() {
    this.ctx = canvas.getContext("2d");
    this.size = 30;
    this.snake = [{ x: 200, y: 200 }, { x: 230, y: 200 }];
    this.direction = '';
    this.difficulty = 'easy'
    this.mode = [{mode:'easy', value:400},{mode:'medium', value:300},{mode:'hard', value:100},{mode:'very hard', value:80}];
  }

  initGame() {
    let time = 0;

    this.mode.forEach((item) => {
      if(this.difficulty == item.mode){
        time = item.value;
      }
    })

    setInterval(() => {
      this.renderGame();
    }, time)
  }

  renderGame(){
    this.ctx.clearRect(0, 0, 500, 500);
    this.moveSnake();
    this.drawSnake();
  }

  drawSnake() {
    this.ctx.fillStyle = "white"
    this.snake.forEach((position, index) => {
      if (index == this.snake.length - 1) {
        this.ctx.fillStyle = "green"
      }
      this.ctx.fillRect(position.x, position.y, this.size, this.size)
    })
  }

  moveSnake() {
    const head = this.snake[this.snake.length - 1];
    if (!this.direction) return

    if (this.direction == 'right') {
      this.snake.push({ x: head.x + this.size, y: head.y })
    }
    if (this.direction == 'left') {
      this.snake.push({ x: head.x - this.size, y: head.y })
    }
    if (this.direction == 'up') {
      this.snake.push({ x: head.x, y: head.y - this.size })
    }
    if (this.direction == 'down') {
      this.snake.push({ x: head.x, y: head.y + this.size })
    }

    this.snake.shift()
  }

}

const game = new Game();

game.initGame();
