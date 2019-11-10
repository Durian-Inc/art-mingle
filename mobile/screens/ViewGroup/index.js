import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useGlobal } from "reactn";
import { Link } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Submission } from "../../components/Submission";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"]

const data = [
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '1'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '2'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '3'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '4'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '5'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '6'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '7'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '8'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '9'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '10'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '11'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '12'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '13'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '14'
  },
  {
    firstName: 'Kevin',
    lastName: 'Schooney',
    id: '15'
  },
]

const GroupWrapper = styled.ScrollView`
  flex: 1;
  align-items: center;
  padding: 60px 30px 0 30px;
`;

const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 5px;
`;

const BackIcon = styled(Icon)`
  margin-left: -10px;
`

const InfoWrapper = styled.View`
  margin-bottom: 15px;
`;

const SubmissionsSubWrapper = styled.View`
  width: 100%;
`

const Name = styled(Text)`
  margin-top: 5px;
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
`

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`

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
  return (
    <PSWrapper color={project.color}>
      <PSLink to={`/projects/${project.id}`}>
        <PSBox>
          <Icon name="mic-outline" fill="#ffffff" width={100} height={100} />
          <PSName h4>{project.name}</PSName>
        </PSBox>
      </PSLink>
    </PSWrapper>
  );
};

const ProfileImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: grey;
`

const MemberWrapper = styled.View`
  flexDirection: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`

const MemberName = styled(Text)`
  margin-left: 10px;
  font-size: 24px;
`

const Members = (props) => {
  return (
    <View>
      {props.data.map((member) => {
        return (
          <MemberWrapper key={member.id}>
            <ProfileImage></ProfileImage>
            <MemberName p>{member.firstName + " " + member.lastName}</MemberName>
          </MemberWrapper>
        )
      })}
    </View>
  )
}

const ViewGroup = () => {
  const [ projects ] = useGlobal("projects");

  return (
    <GroupWrapper showsVerticalScrollIndicator={false}>
      <IconWrapper>
        <Link to="/search">
          <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
        </Link>
      </IconWrapper>
      <Text h2>Group Name</Text>
      <SectionHeader p>Active Projects</SectionHeader>
      <ProjectsHolder
        horizontal
        showsHorizontalScrollIndicator={false}
        data={projects}
        progressViewOffset={50}
        renderItem={({ item }) => <ProjectSquare project={item} />}
        keyExtractor={item => item.id}
      />
      <SectionHeader p>Members</SectionHeader>
      <View>
        <Members data={data}/>
      </View>
    </GroupWrapper>
  );
};

export { ViewGroup };
