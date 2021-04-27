import Map, { MapInterface } from './Map';
import Snake, { SnakeInterface } from './Snake';
import Position, { PositionInterface } from './Position';

interface SnakeGameInterface {
  map: MapInterface;
  isStartGame: boolean;
  isGameOver: boolean;
  apple: PositionInterface;
  snake: SnakeInterface;
  score: number;

  generateNewApplePosition: () => void;
  generateNextSnakePosition: () => PositionInterface;
}

class SnakeGame implements SnakeGameInterface {
  map: MapInterface;

  isStartGame: boolean = false;

  isGameOver: boolean = false;

  apple: PositionInterface = new Position(40, 40);

  snake: SnakeInterface = new Snake({ });

  constructor(props) {
    this.map = new Map();
    const {
      isStartGame = false,
      isGameOver = false,
      apple = new Position(40, 40),
      snake = new Snake({
        bodys: [new Position(this.map.centerPosition.x, this.map.centerPosition.y)],
      }),
    } = props || {};

    this.isStartGame = isStartGame;
    this.isGameOver = isGameOver;
    this.apple = new Position(apple.x, apple.y);
    this.snake = new Snake(snake);
  }

  get score() {
    return this.snake.tailLength - 1;
  }

  private isEmptyPosition() {
    return this.snake.bodys.every(
      snakeBody => snakeBody.x !== this.apple.x || snakeBody.y !== this.apple.y,
    );
  }

  generateNewApplePosition() {
    while (!this.isEmptyPosition()) {
      this.apple = new Position(
        Math.floor(Math.random() * this.map.columnSize) * this.map.gridSize,
        Math.floor(Math.random() * this.map.rowSize) * this.map.gridSize,
      );
    }
  }

  generateNextSnakePosition() {
    let { x, y } = this.snake.headPosition;

    x += this.snake.xDisplacement;
    y += this.snake.yDisplacement;

    if (x < 0) {
      x = this.map.columnLength - this.map.gridSize;
    }
    if (x > this.map.columnLength - 1) {
      x = 0;
    }
    if (y < 0) {
      y = this.map.rowLength - this.map.gridSize;
    }
    if (y > this.map.rowLength - 1) {
      y = 0;
    }
    return new Position(x, y);
  }
}

export default SnakeGame;
