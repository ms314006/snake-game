import {
  GRID_SIZE, MAP_ROW_AND_COLUMN_SIZE,
} from '../constants/snakeGame';
import { PositionInterface } from '../class/Position';

export interface MapInterface {
  rowSize: number;
  columnSize: number;
  gridSize: number;
  rowLength: number;
  columnLength: number;
  centerPosition: PositionInterface;
}

export default class Map implements MapInterface {
  rowSize: number;

  columnSize: number;

  gridSize: number;

  constructor() {
    this.rowSize = MAP_ROW_AND_COLUMN_SIZE;
    this.columnSize = MAP_ROW_AND_COLUMN_SIZE;
    this.gridSize = GRID_SIZE;
  }

  get rowLength() {
    return this.rowSize * this.gridSize;
  }

  get columnLength() {
    return this.columnSize * this.gridSize;
  }

  get centerPosition() {
    return {
      x: (Math.floor(this.rowSize / 2) - 1) * this.gridSize,
      y: (Math.floor(this.columnSize / 2) - 1) * this.gridSize,
    };
  }
}
