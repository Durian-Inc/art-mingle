import React, { useEffect } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import { BigCard } from "../card_big/index";
import { SmallCard } from "../card_small/index";

const HomePage = styled.main`
  background: #a1e9ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: -115px 0 0 0;
`;

const TopBackgroundWrap = styled.div`
  margin: 115px 0 0 0;
  max-width: 1098px;
`;

const BackgroundWrapFollowed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  margin: -10px 0 0 0;
  width: 100vw;
  overflow: hidden;
`;

const BoundedMargin = styled.div`
  margin: 30px 0 0 0;
  max-width: 1098px;
`;

const Title = styled.h1`
  color: #212121;
  font-size: 64px;
  font-weight: normal;
  margin: 0;
`;

const ProjectGallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 40px 0;
  width: 1098px;
`;

const FollowGallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: space-between;
  margin: 20px 0 40px 0;
  width: 100%;
`;

const example_followed = [
  {
    color: "#f49494",
    title: "My First Project",
    name: "Bob Ross",
    prompt: "Sing-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 200
    }
  },
  {
    color: "#f49494",
    title: "My First Project",
    name: "Bob Ross",
    prompt: "Sing-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 200
    }
  },
  {
    color: "#f49494",
    title: "My First Project",
    name: "Bob Ross",
    prompt: "Sing-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 200
    }
  },
  {
    color: "#f49494",
    title: "My First Project",
    name: "Bob Ross",
    prompt: "Sing-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 200
    }
  }
]

const Home = () => {
  const [ projects ] = useGlobal("projects");

  useEffect(() => {
    console.log(projects);
  });

  const project_list = projects.map((element, index) => {
    return (
      <BigCard
        color={element.color}
        title={element.name}
        desc={element.description}
        key={index}
      />
    );
  });

  const followed_list = example_followed.map((element, index) => {
    return (
      <SmallCard
        color={element.color}
        title={element.title}
        name={element.name}
        prompt={element.prompt}
        likes={element.likes}
        key={index}
      />
    );
  });

  return (
    <HomePage>
      <TopBackgroundWrap>
        <Title>Projects</Title>
        <ProjectGallery>
          {project_list}
        </ProjectGallery>
      </TopBackgroundWrap>

      <BackgroundWrapFollowed>
        <BoundedMargin>
          <Title>Followed</Title>
          <FollowGallery>
            {followed_list}
          </FollowGallery> 
        </BoundedMargin>
      </BackgroundWrapFollowed>
    </HomePage>
  );
}

export { Home };
