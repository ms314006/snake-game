import React from 'react';
import styled from 'styled-components';

const GameOverWindow = styled.div`
  width: 520px;
  height: 520px;
  background: #111217;
  position: relative;
  top: ${props => (props.isGameOver ? '-520' : '-1050')}px;
  transition: top 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eabf9f;
`;

const Title = styled.div`
  font-size: 40px;
`;

const GameScore = styled.div`
  font-size: 32px;
  margin: 20px 0px 60px 0px;
`;

const RestartButton = styled.button`
  background: #eabf9f;
  border: 4px double #111217;
  border-radius: 24px;
  width: 200px;
  font-size: 24px;
  color: #111217;

  &:hover {
    background: #111217;
    border: 4px double #eabf9f;
    color: #eabf9f;
    cursor: pointer;
  }
`;

type GameOverWindow = {
  score: number;
  isGameOver: boolean;
  initialGame: () => void;
}

export default (props: GameOverWindow) => {
  const { initialGame, isGameOver, score } = props;
  return (
    <GameOverWindow isGameOver={isGameOver}>
      <Title>GAME OVER</Title>
      <GameScore>{`Score ${score}`}</GameScore>
      <RestartButton onClick={initialGame}>
        Restart
      </RestartButton>
    </GameOverWindow>
  );
};
