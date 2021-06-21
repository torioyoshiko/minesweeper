import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  button: string
}

const MapButton = styled.button<{color: string}>`
margin: 1px;
width: 30px;
height: 30px;
border-top: 3px solid #ebebeb;
border-right: 3px solid #797979;
border-bottom: 3px solid #797979;
border-left: 3px solid #ebebeb;
color: ${({ color }) => color};
font-size: 20px;
font-weight: bold;
`;

const Button = ({ onClick, button }: ButtonProps) => {
  const [x, setX] = useState(button);
  let textColor = '';

  useEffect(() => {
    setX(button);
  }, [button]);

  if (button === '1') {
    textColor = 'blue';
  } else if (button === '2') {
    textColor = 'green';
  } else if (button === '3') {
    textColor = 'red';
  }

  if (x === '□' || x === ' ') {
    setX('');
  }

  const setMine = () => {
    if (x !== '!') {
      setX('!');
    } else {
      setX(button);
    }
    return false;
  };

  return (
    <MapButton onContextMenu={(e) => {
      setMine();
      e.preventDefault();
      return false;
    }} onClick={onClick} color={textColor}>
      {x}
    </MapButton>
  );
};

export default Button;
