import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import GameOverWindow from '../../components/GameOverWindow';

const MAP_ROW_AND_COLUMN_SIZE = 13;

const SnakeGame = styled.div`
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
  width: 40px;
  height: 40px;
  border: 1px solid #b68973;
  box-sizing: border-box;
`;

const GameCanvas = styled.canvas`
  position: absolute;
`;

const initialMoveDirection = null;
const initialSnakeLength = 1;

let [xv, yv] = [0, 0];
let [snakeHeadX, snakeHeadY] = [240, 240];
let [appleX, appleY] = [40, 40];
let currentMoveDirection = initialMoveDirection;
let isStartGame = false;
let snakeLength = initialSnakeLength;
let snakeBodys = [];
let lastTriggerKeyDownEventAt = new Date().getTime();
const Main = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  const draw = (drawIntervalId) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, 520, 520);

      snakeHeadX += xv;
      snakeHeadY += yv;

      if (snakeHeadX < 0) {
        snakeHeadX = 480;
      }
      if (snakeHeadX > 519) {
        snakeHeadX = 0;
      }
      if (snakeHeadY < 0) {
        snakeHeadY = 480;
      }
      if (snakeHeadY > 519) {
        snakeHeadY = 0;
      }
      const isSnakeHeadTouchBody = (snakeBodyX, snakeBodyY) => (
        snakeBodyX === snakeHeadX && snakeBodyY === snakeHeadY
      );
      ctx.fillStyle = '#eabf9f';
      for (let i = 0; i < snakeBodys.length; i += 1) {
        ctx.fillRect(snakeBodys[i].x + 1, snakeBodys[i].y + 1, 38, 38);
        if (isStartGame && isSnakeHeadTouchBody(snakeBodys[i].x, snakeBodys[i].y)) {
          snakeLength = initialSnakeLength;
          setIsGameOver(true);
          clearInterval(drawIntervalId);
        }
      }
      snakeBodys.push({ x: snakeHeadX, y: snakeHeadY });

      if (snakeBodys.length > snakeLength) {
        snakeBodys.shift();
      }

      if (appleX === snakeHeadX && appleY === snakeHeadY) {
        snakeLength += 1;
        const [originAppleX, originAppleY] = [appleX, appleY];
        const isEmptyPosition = (newAppleX, newAppleY) => (
          snakeBodys.every(snakeBody => snakeBody.x !== newAppleX || snakeBody.y !== newAppleY)
        );

        while ((originAppleX === appleX && originAppleY === appleY) || !isEmptyPosition(appleX, appleY)) {
          [appleX, appleY] = [Math.floor(Math.random() * 13) * 40, Math.floor(Math.random() * 13) * 40];
        }
      }
      ctx.fillStyle = '#faf3e0';
      ctx.fillRect(appleX, appleY, 40, 40);
    }
  };

  const initialGame = () => {
    [xv, yv] = [0, 0];
    [snakeHeadX, snakeHeadY] = [240, 240];
    [appleX, appleY] = [40, 40];
    currentMoveDirection = initialMoveDirection;
    snakeLength = initialSnakeLength;
    snakeBodys = [];
    isStartGame = false;
    setIsGameOver(false);
    const drawIntervalId = window.setInterval(() => draw(drawIntervalId), 150);
  };

  useEffect(() => {
    const moveDirection = ({ keyCode }) => {
      const triggerKeyDownEventAt = new Date().getTime();
      if (triggerKeyDownEventAt - lastTriggerKeyDownEventAt < 150) return;
      lastTriggerKeyDownEventAt = triggerKeyDownEventAt;
      isStartGame = true;
      const [TOP, RIGHT, BOTTOM, LEFT] = [38, 39, 40, 37];
      console.log('hi');
      switch (keyCode) {
        case TOP:
          if (currentMoveDirection === BOTTOM) return;
          [xv, yv] = [0, -40];
          break;
        case RIGHT:
          if (currentMoveDirection === LEFT) return;
          [xv, yv] = [40, 0];
          break;
        case BOTTOM:
          if (currentMoveDirection === TOP) return;
          [xv, yv] = [0, 40];
          break;
        case LEFT:
          if (currentMoveDirection === RIGHT) return;
          [xv, yv] = [-40, 0];
          break;
        default:
      }
      currentMoveDirection = keyCode;
    };
    window.addEventListener('keydown', moveDirection);
    initialGame();
  }, []);

  return (
    <SnakeGame>
      <GameTitle>
        Snake Game
        <span role="img" aria-label="snake">🐍</span>
      </GameTitle>
      <GameScreen>
        <GameCanvas ref={canvasRef} width="520px" height="520px" />
        {
          Array.from(Array((MAP_ROW_AND_COLUMN_SIZE ** 2) - 1))
            .map((number, index) => <MapGrid key={index} />)
        }
        <MapGrid />
        <GameOverWindow
          score={0}
          isGameOver={isGameOver}
          initialGame={initialGame}
        />
      </GameScreen>
    </SnakeGame>
  );
};

export default Main;
