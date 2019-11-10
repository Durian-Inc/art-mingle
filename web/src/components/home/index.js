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

const example_projects = [
  {
    color: "#ce95f0",
    name: "Sing-off",
    description: "For the sing-off contest, showcase your vocals! Acapella, with music, anything goes!"
  },
  {
    color: "#f49494",
    name: "Draw-off",
    description: "For the draw-off contest, showcase your sketching skills! Let your imagination run free and have some fun doing so!"
  },
  {
    color: "#4d96f0",
    name: "Dance",
    description: "Dance is so strong you can speak to those who do not share your spoken language, but instead your love for dance."
  },
  {
    color: "#ffc28a",
    name: "Arts n' Crafts",
    description: "Homemade and DIY stuff rule so we'd love to see what you can make!"
  }
]

const example_followed = [
  {
    color: "#f49494",
    title: "My First Project",
    name: "Robert Daw",
    prompt: "Sing-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 200
    }
  },
  {
    color: "#e67ade",
    title: "Hands Off",
    name: "Kanye East",
    prompt: "Sing-off",
    likes: {
      platinum: "40",
      gold: "140",
      bronze: "14004",
      total: 20000
    }
  },
  {
    color: "#96238e",
    title: "Happy Little Art",
    name: "Bob Ross",
    prompt: "Painting-season",
    likes: {
      platinum: "400",
      gold: "10",
      bronze: "100",
      total: 2233
    }
  },
  {
    color: "#f49494",
    title: "My First Project too",
    name: "William Fawk",
    prompt: "Sing-off",
    likes: {
      platinum: "1",
      gold: "6",
      bronze: "64",
      total: 340
    }
  }
]

const Home = () => {
  const [ projects ] = useGlobal("projects");

  useEffect(() => {
    console.log(projects);
  });

  const project_list = example_projects.map((element, index) => {
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
    if (element.likes.total >= 1000) {
      let simplified = Math.floor(element.likes.total / 1000);
      element.likes.total = `${simplified}K`;
    }

    if (element.likes.bronze >= 1000) {
      let simplified = Math.floor(element.likes.bronze / 1000);
      element.likes.bronze = `${simplified}K`;
    }

    if (element.likes.gold >= 1000) {
      let simplified = Math.floor(element.likes.gold / 1000);
      element.likes.gold = `${simplified}K`;
    }

    if (element.likes.platinum >= 1000) {
      let simplified = Math.floor(element.likes.platinum / 1000);
      element.likes.platinum = `${simplified}K`;
    }
    
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
