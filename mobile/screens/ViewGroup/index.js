import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useGlobal } from "reactn";
import { Link, useParams } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Submission } from "../../components/Submission";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"];

const GroupWrapper = styled.ScrollView`
  flex: 1;
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
`;

const InfoWrapper = styled.View`
  margin-bottom: 15px;
`;

const SubmissionsSubWrapper = styled.View`
  width: 100%;
`;

const Name = styled(Text)`
  margin-top: 5px;
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
`;

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
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
`;

const MemberWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const MemberName = styled(Text)`
  margin-left: 10px;
  font-size: 24px;
`;

const Members = props => {
  return (
    <View>
      {props.data.map(member => {
        return (
          <MemberWrapper key={member.id}>
            <ProfileImage></ProfileImage>
            <MemberName p>
              {member.firstName + " " + member.lastName}
            </MemberName>
          </MemberWrapper>
        );
      })}
    </View>
  );
};

const ViewGroup = () => {
  const { id } = useParams();
  const [projects] = useGlobal("projects");
  const [groups] = useGlobal("groups");
  const group = groups[groups.findIndex(i => i.id === id)];

  return (
    <GroupWrapper showsVerticalScrollIndicator={false}>
      <IconWrapper>
        <Link to="/search">
          <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
        </Link>
      </IconWrapper>
      <Text h2>{group.name}</Text>
      <SectionHeader p>Active Projects</SectionHeader>
      <ProjectsHolder
        horizontal
        showsHorizontalScrollIndicator={false}
        data={group.projects}
        progressViewOffset={50}
        renderItem={({ item }) => <ProjectSquare project={item} />}
        keyExtractor={item => item.id}
      />
      <SectionHeader p>Members</SectionHeader>
      <View>
        <Members data={group.users} />
      </View>
    </GroupWrapper>
  );
};

export { ViewGroup };
