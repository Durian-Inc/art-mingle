import React from "react";
import styled from "styled-components";
import { BigCard } from "../card_big/index";
import { SmallCard } from "../card_small/index";

const HomePage = styled.main`
  width: 100%;
`;

const Title = styled.h1`
  color: #212121;
  font-size: 64px;
  font-weight: normal;
  margin-top: 0;
`;

const ProjectGallery = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const FollowGallery = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

// TODO: Finish SmallCard component
const Home = () => {
  return (
    <HomePage>
      <Title>Projects</Title>
      <ProjectGallery>
        <BigCard
          color="#ce95f0"
          title="Sing-off"
          desc="For the sing-off contest, showcase your vocals! Acapella, with music, anything goes!"
        />
        <BigCard
          color="#f49494" 
          title="Draw-off"
          desc="For the draw-off contest, showcase your sketching skills! Let your imagination run free and have some fun doing so!"
        />
      </ProjectGallery>

      <Title>Followed</Title>
      <FollowGallery>
        <SmallCard
          color="#f49494" 
          name=""
          likes=""
        />
        <SmallCard
          color="#f49494" 
          title=""
          name=""
          likes=""
        />
      </FollowGallery>
    </HomePage>
  );
}

export { Home };
