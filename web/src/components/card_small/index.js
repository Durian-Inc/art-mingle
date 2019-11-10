import React from "react";
import styled from "styled-components";
//import { Link } from "react-router-dom";
import Icon from 'react-eva-icons';

const CardWrap = styled.div`
  display: flex;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  flex-direction: row;
  height: 137px;
  width: 436px;
  margin-bottom: 40px;
`;

const CardImage = styled.div`
  background: linear-gradient(-45deg, rgba(256, 256, 256, 0) 0%, rgba(256, 256, 256, 0.3) 100%), ${props => props.color};
  border: 0;
  border-radius: 15px 0 0 15px;
  height: 137px;
  width: 137px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: 10px;
  width: 299px;
`;

const CardTitle = styled.h1`
  color: #212121;
  font-size: 22px;
  font-weight: normal;
  margin: 0;
`;

const Author = styled.p`
  color: #949494;
  font-size: 18px;
  margin: 5px 0 0 0;
`;

const Prompt = styled.p`
  color: #949494;
  font-size: 18px;
  margin: 0;
`;

const RegLikes = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;

`;

const Bottom = styled.div`
  color: #949494;
  margin: 5px 0 5px 0;
`;

const SpecialLike = styled.div`
  display: flex;
  flex-direction: row;
  height: 25px;
  margin: 5px 0 0 0;

  i {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 20px;
  }

  p {
    font-size: 18px;
    margin: 0 20px 0 5px;
  }
`;

const GeneralLike = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #949494;
  margin: 0 10px 0 0;

  i {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const SmallCard = ({color, title, name, prompt, likes}) => {
  const { platinum, gold, bronze, total } = likes;

  return (
    <CardWrap>
      <CardImage color={color}/>
      <Info>
        <Top>
          <CardTitle>{title}</CardTitle>
          <Author>{name}</Author>
        </Top>

        <Bottom>
          <Prompt>{prompt}</Prompt>
          <RegLikes>
            <SpecialLike>
              <Icon name="heart" size="large" fill="#9edcf0" />
              <p>x{platinum}</p>
            </SpecialLike>
            <SpecialLike>
              <Icon name="heart" size="large" fill="#f0c658" />
              <p>x{gold}</p>
            </SpecialLike>
            <SpecialLike>
              <Icon name="heart" size="large" fill="#ab7919" />
              <p>x{bronze}</p>
            </SpecialLike>
          </RegLikes>
        </Bottom>
      </Info>
      <GeneralLike>
        <Icon name="heart-outline" size="xlarge" fill="#949494" />
        <p>{total}</p>
      </GeneralLike>
    </CardWrap>
  );
};

export { SmallCard };
