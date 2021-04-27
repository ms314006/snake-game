import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import SnakeGame from '../../class/SnakeGame';
import {
  GRID_SIZE, MAP_ROW_AND_COLUMN_SIZE, MAP_ROW_AND_COLUMN_LENGTH,
} from '../../constants/snakeGame';
import GameOverWindow from '../../components/GameOverWindow';

const StyledSnakeGameComponent = styled.div`
  width: 100%;
  height: 100%;
  background: #1e212d;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway', sans-serif;
`;

const GameTitle = styled.div`
  color: #faf3e0;
  font-size: 52px;
  margin: 60px 0px;
`;

const GameScreen = styled.div`
  width: 520px;
  height: 520px;
  border: 2px solid #b68973;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const MapGrid = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #b6897344;
  box-sizing: border-box;
`;

const GameCanvas = styled.canvas`
  position: absolute;
`;

const Main = () => {
  const [snakeGame, setSnakeGame] = useState(new SnakeGame({}));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  const draw = (drawIntervalId: number) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, snakeGame.map.rowLength, snakeGame.map.columnLength);

      if (snakeGame.snake.isAteApple(snakeGame.apple)) {
        snakeGame.snake.addLength(1);
        snakeGame.generateNewApplePosition();
      }
      ctx.fillStyle = '#faf3e0';
      ctx.fillRect(
        snakeGame.apple.x,
        snakeGame.apple.y,
        snakeGame.map.gridSize,
        snakeGame.map.gridSize,
      );

      const nextSnakeHeadPosition = snakeGame.generateNextSnakePosition();

      const isSnakeHeadTouchBody = (snakeBodyX: number, snakeBodyY: number) => (
        snakeBodyX === nextSnakeHeadPosition.x && snakeBodyY === nextSnakeHeadPosition.y
      );
      ctx.fillStyle = '#eabf9f';
      for (let i = 0; i < snakeGame.snake.bodys.length; i += 1) {
        const { x: snakeBodyPositionX, y: snakeBodyPositionY } = snakeGame.snake.bodys[i];
        ctx.fillRect(
          snakeBodyPositionX + 1,
          snakeBodyPositionY + 1,
          snakeGame.map.gridSize - 2,
          snakeGame.map.gridSize - 2,
        );

        if (
          snakeGame.isStartGame
          && i !== snakeGame.snake.tailLength - 1
          && isSnakeHeadTouchBody(snakeBodyPositionX, snakeBodyPositionY)
        ) {
          setSnakeGame(new SnakeGame({ ...snakeGame, isGameOver: true }));
          clearInterval(drawIntervalId);
        }
      }
      snakeGame.snake.headPosition = nextSnakeHeadPosition;
    }
  };

  const initialGame = () => {
    setSnakeGame(new SnakeGame({}));
  };

  useEffect(() => {
    const moveDirection = ({ keyCode }) => {
      const [TOP, RIGHT, BOTTOM, LEFT] = [38, 39, 40, 37];
      switch (keyCode) {
        case TOP:
          if (snakeGame.snake.currentMoveDirection === BOTTOM) return;
          snakeGame.snake.setDisplacement(0, -snakeGame.map.gridSize);
          break;
        case RIGHT:
          if (snakeGame.snake.currentMoveDirection === LEFT) return;
          snakeGame.snake.setDisplacement(snakeGame.map.gridSize, 0);
          break;
        case BOTTOM:
          if (snakeGame.snake.currentMoveDirection === TOP) return;
          snakeGame.snake.setDisplacement(0, snakeGame.map.gridSize);
          break;
        case LEFT:
          if (snakeGame.snake.currentMoveDirection === RIGHT) return;
          snakeGame.snake.setDisplacement(-snakeGame.map.gridSize, 0);
          break;
        default:
          return;
      }

      snakeGame.isStartGame = true;
      snakeGame.snake.currentMoveDirection = keyCode;
    };
    window.addEventListener('keydown', moveDirection);

    if (snakeGame.isStartGame === false) {
      const drawIntervalId = window.setInterval(() => draw(drawIntervalId), 150);
    }
  }, [snakeGame]);

  return (
    <StyledSnakeGameComponent>
      <GameTitle>
        Snake Game
        <span role="img" aria-label="snake">🐍</span>
      </GameTitle>
      <GameScreen>
        <GameCanvas ref={canvasRef} width="520px" height="520px" />
        {
          Array.from(Array((snakeGame.map.rowSize ** 2) - 1))
            .map((number, index) => <MapGrid key={index} />)
        }
        <MapGrid />
        <GameOverWindow
          score={snakeGame.score}
          isGameOver={snakeGame.isGameOver}
          initialGame={initialGame}
        />
      </GameScreen>
    </StyledSnakeGameComponent>
  );
};

export default Main;
