import { isEqual } from 'lodash';

export interface Coordinates {
  x: number
  y: number
}

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

const generateMapBySize = (row: number, column: number) => {
  const map: string[][] = [];

  for (let y = 0; y < column; y++) {
    const stringsRow = [];

    for (let i = 0; i < row; i++) {
      stringsRow.push(' ');
    }
    map.push(stringsRow);
  }
  return map;
};

export const generateCleanMap = (size: Coordinates) => generateMapBySize(size.x, size.y);

const createBombsCoordinates = (mapSize: number) => {
  const bombsCoordinates: number[][] = [];

  while (bombsCoordinates.length !== mapSize) {
    const coordinate: number[] = [];
    coordinate.push(randomNumber(0, mapSize), randomNumber(0, mapSize));

    const checkEqual = (element: number[]) => isEqual(element, coordinate);

    if (!bombsCoordinates.find(checkEqual)) {
      bombsCoordinates.push(coordinate);
    }
  }
  return bombsCoordinates;
};

export const generateMap = (mapSize: Coordinates) => {
  const map = generateMapBySize(mapSize.x, mapSize.y);
  const bombsCoordinates = createBombsCoordinates(mapSize.x);

  for (let i = 0; i < bombsCoordinates.length; i++) {
    const x = bombsCoordinates[i][0];
    const y = bombsCoordinates[i][1];
    map[x][y] = '*';
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let num = 0;

      if (map[y][x] !== '*') {
        if (map[y - 1]?.[x - 1] === '*') {
          num += 1;
        }
        if (map[y - 1]?.[x] === '*') {
          num += 1;
        }
        if (map[y - 1]?.[x + 1] === '*') {
          num += 1;
        }
        if (map[y][x - 1] === '*') {
          num += 1;
        }
        if (map[y][x + 1] === '*') {
          num += 1;
        }
        if (map[y + 1]?.[x - 1] === '*') {
          num += 1;
        }
        if (map[y + 1]?.[x] === '*') {
          num += 1;
        }
        if (map[y + 1]?.[x + 1] === '*') {
          num += 1;
        }
        map[y][x] = num.toString();
      }
    }
  }
  return map;
};

export const openCoordinates = (
  visibleMap: string[][], mapWithBombs: string[][], coordinates: Coordinates,
) => {
  visibleMap[coordinates.y][coordinates.x] = mapWithBombs[coordinates.y][coordinates.x];

  if (mapWithBombs[coordinates.y][coordinates.x] === '0') {
    const startY = Math.max(0, coordinates.y - 1);
    const startX = Math.max(0, coordinates.x - 1);
    const endY = Math.min(mapWithBombs.length - 1, coordinates.y + 1);
    const endX = Math.min(mapWithBombs.length - 1, coordinates.x + 1);

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        if (mapWithBombs[y][x] !== '0') {
          visibleMap[y][x] = mapWithBombs[y][x];
        } else if (visibleMap[y][x] === ' ') {
          openCoordinates(visibleMap, mapWithBombs, { x, y });
        }
      }
    }
  }
  return visibleMap;
};
