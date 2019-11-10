import React from "react";
import styled from "styled-components";
//import { Link } from "react-router-dom";

const CardWrap = styled.div`
  display: flex;
  background: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  flex-direction: row;
  justify-content: space-between;
  height: 196px;
  width: 500px;
  margin-bottom: 30px;
`;

const CardImage = styled.div`
  background: linear-gradient(-45deg, rgba(256, 256, 256, 0) 0%,
                              rgba(256, 256, 256, 0.3) 100%),
                              ${props => props.color};
  border: 0;
  border-radius: 15px 0 0 15px;
  height: 196px;
  width: 196px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
`;

const CardTitle = styled.h1`
  color: #212121;
  font-size: 36px;
  font-weight: normal;
  margin: 15px 0 10px 25px;
`;

const CardText = styled.p`
  color: #949494;
  font-size: 18px;
  margin: 0 25px;
`;

const BigCard = ({color, title, desc}) => {
  return (
    <CardWrap>
      <CardImage color={color}/>
      <Info>
        <CardTitle>{title}</CardTitle>
        <CardText>{desc}</CardText>
      </Info>
    </CardWrap>
  );
};

export { BigCard };
