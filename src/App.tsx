import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import {
  generateCleanMap, generateMap, openCoordinates, Coordinates,
} from './functions';

const MainBlock = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const LevelButton = styled.button`
border: none;
margin: 10px;
`;

const ButtonsList = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #797979;
flex-wrap: wrap;
`;

const ButtonRow = styled.div`
display: flex;
flex-direction: row;
`;

const App = () => {
  const [map, setMap] = useState<string[][]>([]);
  const [mapWithBombs, setMapWithBombs] = useState<string[][]>([]);
  const [random, setRandom] = useState(0);

  const startGame = (mapSize: Coordinates) => {
    setRandom((prevRandom) => prevRandom + 1);
    setMap(generateCleanMap(mapSize));
    setMapWithBombs(generateMap(mapSize));
  };

  const onOpenClick = (coordinates: Coordinates) => {
    const clearMap = map.slice(0);

    if (mapWithBombs[coordinates.y][coordinates.x] === '*') {
      alert('You lose!');
      setMap(mapWithBombs);
      return;
    }

    openCoordinates(clearMap, mapWithBombs, coordinates);
    setMap(clearMap);
  };

  return (
    <MainBlock>
      <div>
        <LevelButton onClick={() => {
          startGame({ x: 10, y: 10 });
        }}>1 level</LevelButton>
        <LevelButton onClick={() => {
          startGame({ x: 20, y: 20 });
        }}>2 level</LevelButton>
      </div>
        <ButtonsList>
          {map.map((buttonsArr, mainIndex) => (
            <ButtonRow key={mainIndex + 1}>
              {buttonsArr.map((button, index) => (
                <Button
                  onClick={() => {
                    onOpenClick({ x: index, y: mainIndex });
                  }}
                  key={`${mainIndex.toString()} ${index.toString()} ${random}`}
                  button={button}
                />))}
            </ButtonRow>
          ))}
        </ButtonsList>
    </MainBlock>
  );
};

export default App;
