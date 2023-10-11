const canvas = document.querySelector('canvas');
const over = document.querySelector('.gameOver');
const start = document.querySelector('.btn-start');
const menu = document.querySelector('.menu');
const containerScore = document.querySelector('.container-point');
const retry = document.querySelector('.btn-retry');
const effectStart = new Audio('./assets/start.mp3');
const effectDeath = new Audio('./assets/death.mp3');
const effectEat = new Audio('./assets/eat.mp3');
let score = document.querySelector('.score');
let scoreFinal = document.querySelector('.score-final');

const number = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

class Game {
  constructor() {
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.snake = [{ x: 200, y: 200 }];
    this.colorApple = [{ name: "vermelho", color: "#D70419" }, { name: "dourado", color: "#EDCB23" }, { name: "verde", color: "#68D60D" }];
    this.apple = {
      x: this.randomPositionAplle(),
      y: this.randomPositionAplle(),
      tipo: this.randomColorApple(),
    };
    this.pontuation = 0;
    this.direction = '';
    this.difficulty = '';
    this.mode = [{ mode: 'easy', value: 200 }, { mode: 'medium', value: 150 }, { mode: 'hard', value: 100 }, { mode: 'very hard', value: 80 }];
    this.loop;
  }

  initGame(modo) {
    effectStart.play();
    this.mode.forEach((item) => {
      if (modo == item.mode) {
        this.difficulty = item.value;
      }
    })

    this.loop = setInterval(() => {
      this.renderGame();
    }, this.difficulty)
  }

  gameOver() {
    clearInterval(game.loop)
    this.direction = undefined;
    over.style.display = 'flex';
    scoreFinal.innerHTML = `Score ${this.pontuation}`;
    canvas.style.filter = 'blur(2px)';
    containerScore.style.display = 'none';
  }

  renderGame() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.drawApple();
    this.getDirection();
    this.moveSnake();
    this.drawSnake();
    this.eatApple();
    this.collisionSnake();
  }

  randomPositionAplle() {
    let num = number(0, canvas.width - this.size);
    return Math.round(num / 20) * 20;
  }

  randomColorApple() {
    let num = number(0, 2);
    let { name, color } = this.colorApple[num];
    return { name, color };
  }

  drawApple() {
    const { x, y, tipo } = this.apple;

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

  getDirection() {
    document.addEventListener("keydown", ({ key }) => {
      if (key == "ArrowRight" && this.direction != 'left') {
        this.direction = 'right'
      }
      if (key == "ArrowLeft" && this.direction != 'right') {
        this.direction = 'left'
      }
      if (key == "ArrowUp" && this.direction != 'down') {
        this.direction = 'up'
      }
      if (key == "ArrowDown" && this.direction != 'up') {
        this.direction = 'down'
      }
    })
  }

  eatApple() {
    const head = this.snake[this.snake.length - 1];
    let x, y;

    if (head.x == this.apple.x && head.y == this.apple.y) {
      effectEat.pause();
      effectEat.play();
      this.snake.push(head);
      if (this.apple.tipo.name == "dourado") {
        this.pontuation += 40;
      } else if (this.apple.tipo.name == "verde") {
        this.pontuation += 25;
      } else {
        this.pontuation += 10;
      }
      score.innerHTML = `${this.pontuation}`;

      x = this.randomPositionAplle();
      y = this.randomPositionAplle();

      while (this.snake.find((position) => position.x == x && position.y == y)) {
        x = this.randomPositionAplle();
        y = this.randomPositionAplle();
      };

      this.apple = {
        x: x,
        y: y,
        tipo: this.randomColorApple(),
      };
    }
  }

  collisionSnake() {
    const head = this.snake[this.snake.length - 1];
    const neck = this.snake.length - 2;
    const wallColision = head.x < 0 || head.x > 480 || head.y < 0 || head.y > 480;
    const bodyColision = this.snake.find((position, index) => {
      return index < neck && position.x == head.x && position.y == head.y
    })

    if (wallColision || bodyColision) {
      effectDeath.play();
      this.gameOver();
    }
  }
}

const game = new Game();
containerScore.style.display = 'none';
canvas.style.filter = 'blur(2px)';

start.addEventListener('click', (e) => {
  e.preventDefault();
  containerScore.style.display = 'flex';
  canvas.style.filter = '';

  menu.style.display = 'none';
  const input = document.querySelector('input[name="mod-game"]:checked');
  if (input) {
    game.initGame(input.value);
  } else {
    game.initGame('medium');
  }

})

retry.addEventListener('click', () => {
  game.snake = [{ x: 200, y: 200 }];
  game.pontuation = 0;
  score.innerHTML = '00';
  over.style.display = 'none';
  menu.style.display = 'flex';
})
