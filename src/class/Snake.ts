import Position, { PositionInterface } from './Position';

export interface SnakeInterface {
  bodys: PositionInterface[];
  tailLength: number;
  xDisplacement: number;
  yDisplacement: number;
  currentMoveDirection: number | null;
  headPosition: Position;

  isAteApple: (apple: PositionInterface) => boolean;
  addLength: (increaseLength: number) => void;
  setDisplacement: (x: number, y: number) => void;
}

class Snake implements SnakeInterface {
  bodys: PositionInterface[];

  tailLength: number;

  xDisplacement: number;

  yDisplacement: number;

  currentMoveDirection: number | null = null;

  constructor(props) {
    const {
      bodys = [],
      tailLength = 1,
    } = props;
    this.bodys = bodys;
    this.tailLength = tailLength;
    this.xDisplacement = 0;
    this.yDisplacement = 0;
    this.currentMoveDirection = null;
  }

  get headPosition() {
    return new Position(
      this.bodys[this.bodys.length - 1].x,
      this.bodys[this.bodys.length - 1].y,
    );
  }

  set headPosition(headPosition: PositionInterface) {
    this.bodys = [...this.bodys, headPosition];
    while (this.bodys.length > this.tailLength) {
      this.bodys.shift();
    }
  }

  isAteApple(apple: PositionInterface) {
    return this.headPosition.x === apple.x && this.headPosition.y === apple.y;
  }

  addLength(increaseLength: number) {
    this.tailLength += increaseLength;
  }

  setDisplacement(x: number, y: number) {
    this.xDisplacement = x;
    this.yDisplacement = y;
  }
}

export default Snake;
