import React from "react";
import { View } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";

const ProjectWrapper = styled.View`
  flex: 1;
  margin: -60px -30px 0 -30px;
`

const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 5px;
`

const ProjectHeader = styled.View`
  width: 100%;
  height: 50%;
  padding: 60px 30px 0 30px;
  background: #FFC28A;
`

const ProjectInfo = styled.View`
  width: 100%;
  height: 55%;
  margin-top: -10%;
  padding: 60px 30px 0 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: white;
`

const ProjectView = () => {
  return (
    <ProjectWrapper>
      <ProjectHeader>
        <IconWrapper>
          <Icon name="arrow-ios-back-outline" width={36} height={36}/>
          <Icon name="heart-outline" width={36} height={36} />
        </IconWrapper>
        <View>

        </View>
      </ProjectHeader>
      <ProjectInfo>

      </ProjectInfo>
    </ProjectWrapper>
  );
};

export { ProjectView };
