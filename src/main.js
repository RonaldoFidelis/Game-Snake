const canvas = document.querySelector("canvas")
const number = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

class Game {
  constructor() {
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.snake = [{ x: 200, y: 200}];
    this.colorApple = [{name: "vermelho", color:"#D70419"},{name:"dourado", color:"#EDCB23"},{name: "verde", color:"#68D60D"}];
    this.apple = {
      x:this.randomPositionAplle(),
      y:this.randomPositionAplle(),
      tipo: this.randomColorApple(),
    };
    this.pontuation = 0;
    this.direction = '';
    this.difficulty = 'medium'
    this.mode = [{mode:'easy', value:300},{mode:'medium', value:200},{mode:'hard', value:100},{mode:'very hard', value:80}];
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
    this.drawApple();
    this.getDirection();
    this.moveSnake();
    this.drawSnake();
    this.eatApple();
  }

  randomPositionAplle(){
    let num = number(0, canvas.width - this.size);
    return Math.round(num / 20) * 20;
  }

  randomColorApple(){
    let num = number(0,2);
    let {name, color} = this.colorApple[num];
    return {name,color};
  }

  drawApple(){
    const {x, y, tipo} = this.apple;

    this.ctx.fillStyle = tipo.color;
    this.ctx.fillRect(x, y, this.size, this.size);
  }

  drawSnake() {
    this.ctx.fillStyle = "#0AB19F"
    this.snake.forEach((position, index) => {
      if (index == this.snake.length - 1) {
        this.ctx.fillStyle = "#08C28D"
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

  getDirection(){
    document.addEventListener("keydown", ({key})=>{
      if(key == "ArrowRight" && this.direction != 'left'){
        this.direction = 'right'
      }
      if(key == "ArrowLeft" && this.direction != 'right'){
        this.direction = 'left'
      }
      if(key == "ArrowUp" && this.direction != 'down'){
        this.direction = 'up'
      }
      if(key == "ArrowDown" && this.direction != 'up'){
        this.direction = 'down'
      }
    })
  }

  eatApple() {
    const head = this.snake[this.snake.length-1];
    const {x, y} = head;

    if(x == this.apple.x && y == this.apple.y){
      if(this.apple.tipo.name == "dourado"){
        this.pontuation += 40;
      } else if(this.apple.tipo.name == "verde"){
        this.pontuation += 25;
      } else {
        this.pontuation += 10;
      }

      this.snake.push(head);
      this.apple = {
        x:this.randomPositionAplle(),
        y:this.randomPositionAplle(),
        tipo: this.randomColorApple(),
      };
    }

  }
}

const game = new Game();

game.initGame();
