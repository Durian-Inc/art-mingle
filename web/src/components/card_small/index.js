import React from "react";
import styled from "styled-components";
//import { Link } from "react-router-dom";

const CardWrap = styled.div`
  display: flex;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  flex-direction: row;
  height: 137px;
  width: 436px;
  margin-bottom: 30px;
`;

const CardImage = styled.div`
  background: ${props => props.color};
  border: 0;
  border-radius: 15px 0 0 15px;
  height: 137px;
  width: 137px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 299px;
`;

const CardTitle = styled.h1`
  color: #212121;
  font-size: 36px;
  font-weight: normal;
  margin-left: 35px;
`;

const CardText = styled.p`
  color: #949494;
  font-size: 18px;
  margin: 0 35px;
`;

const RegLikes = styled.div`
  display: flex;
  flex-direction: column;
`;


// TODO: Add tiered likes and regular like buttom
const SmallCard = ({color, title, desc}) => {
  return (
    <CardWrap>
      <CardImage color={color}/>
      <Info>
        <CardTitle>{title}</CardTitle>
        <CardText>{desc}</CardText>
        <RegLikes>

        </RegLikes>
      </Info>
    </CardWrap>
  );
};

export { SmallCard };
