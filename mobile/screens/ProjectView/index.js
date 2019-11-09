import React from "react";
import { View } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";

const ProjectWrapper = styled.View`
  flex: 1;
`

const ProjectView = () => {
  return (
    <ProjectWrapper>
      <Text h2>Hey Submission</Text>

      <Navigation />
    </ProjectWrapper>
  );
};

export { ProjectView };
