import React from "react";
import { useGlobal } from "reactn";
import { View, ScrollView, FlatList } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components";

import { Navigation } from "../../components/Navigation";

const HomeWrapper = styled.View`
  flex: 1;
`;
const HomeScroll = styled.ScrollView``;
const Constrain = styled.View`
  padding: 0 30px;
`;

const ProjectsHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileIcon = styled(View)`
  border-radius: 50px;
  border: 3px black solid;
`;
const PSWrapper = styled(View)`
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  height: 200px;
  width: 200px;
  margin: 20px 0 25px 30px;
`;
const PSBox = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ProjectsHolder = styled.FlatList`
  max-height: 280px;
`;

const PSName = styled(Text)`
  color: white;
  font-weight: bold;
`;
const PSLink = styled(Link)``;

const ProjectSquare = ({ project }) => {
  // TODO change link to the project id
  return (
    <PSWrapper color={project.color}>
      <PSLink to="/projects/1">
        <PSBox>
          <Icon name="mic-outline" fill="#ffffff" width={100} height={100} />
          <PSName h4>{project.name}</PSName>
        </PSBox>
      </PSLink>
    </PSWrapper>
  );
};

const SubWrapper = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
const SubPreview = styled.View`
  width: 90px;
  height: 90px;
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  margin-right: 20px;
`;
const SubInfo = styled.View``;
const SubLikes = styled.View`
  flex-direction: row;
`;

const Submission = ({ submission }) => {
  return (
    <SubWrapper>
      <SubPreview color={submission.color} />
      <SubInfo>
        <Text>{submission.name}</Text>
        <Text>{submission.user}</Text>
        <Text>for {submission.project}</Text>
        <SubLikes>
          <Icon name="heart-outline" height={20} width={20} />
          <Text>{submission.likes}</Text>
        </SubLikes>
      </SubInfo>
    </SubWrapper>
  );
};

const SubmissionList = styled.View``;

const Home = () => {
  const [ projects ] = useGlobal("projects");
  return (
    <HomeWrapper>
      <HomeScroll>
        <Constrain style={{ marginTop: 60 }}>
          <TopBar>
            <ProjectsHeader>
              <Text h3>Projects</Text>
              <Text>Global</Text>
            </ProjectsHeader>
            <Link to="/">
              {
                // Should go to /users/userId
              }
              <ProfileIcon>
                <Icon name="person-outline" width={32} height={32} />
              </ProfileIcon>
            </Link>
          </TopBar>
        </Constrain>
        <ProjectsHolder
          horizontal
          showsHorizontalScrollIndicator={false}
          data={projects}
          progressViewOffset={50}
          renderItem={({ item }) => <ProjectSquare project={item} />}
          keyExtractor={item => item.id}
        />
        <Constrain style={{ marginBottom: 100 }}>
          <Text h3>Followed</Text>
          <SubmissionList>
            <Submission
              submission={{
                name: "My First Project",
                user: "Bob Ross",
                category: "music",
                project: "Sing-off",
                likes: 17,
                color: "#FFC28A"
              }}
            />
            <Submission
              submission={{
                name: "Super Pro Dunkster",
                user: "Evan Velazquz",
                category: "music",
                project: "Interpretive Basketball",
                likes: 14,
                color: "#46EAEA"
              }}
            />
            <Submission
              submission={{
                name: "My First Project",
                user: "Bob Ross",
                category: "music",
                project: "Sing-off",
                likes: 17,
                color: "#FFC28A"
              }}
            />
            <Submission
              submission={{
                name: "Super Pro Dunkster",
                user: "Evan Velazquz",
                category: "music",
                project: "Interpretive Basketball",
                likes: 14,
                color: "#46EAEA"
              }}
            />
          </SubmissionList>
        </Constrain>
      </HomeScroll>

      <Navigation />
    </HomeWrapper>
  );
};

export { Home };
