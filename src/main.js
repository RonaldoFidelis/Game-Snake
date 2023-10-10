const canvas = document.querySelector("canvas")

class Game {
  constructor(){
    this.ctx = canvas.getContext("2d"),
    this.size = 30,
    this.snake = [{x:200, y:200},{x:230, y:200}]
  }

  initGame(){

  }

  drawSnake() {
    this.ctx.fillStyle = "white"
    this.snake.forEach((position, index) => {
      if(index == this.snake.length -1){
        this.ctx.fillStyle = "green"
      }
      this.ctx.fillRect(position.x, position.y, this.size, this.size)
    })
  }

  moveSnake(){
    
  }

}

const game = new Game();

game.drawSnake()
