import React from "react";
import { View } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";

const HomeWrapper = styled.View`
  flex: 1;
`

const Home = () => {
  return (
    <HomeWrapper>
      <Text h2>Hey Home</Text>

      <Navigation />
    </HomeWrapper>
  );
};

export { Home };
