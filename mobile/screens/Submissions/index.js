import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"]

const ProfileWrapper = styled.View`
  flex: 1;
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
  align-items; center;
  width: 100%;
  height: 48%;
  padding: 60px 30px 0 30px;
`;

const ProfileImage = styled.View`
  align-self: center;
  width: 175px;
  height: 175px;
  border-radius: 125px;
  background: grey;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
`

const Name = styled(Text)`
  margin-top: 5px;
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
`

const ProfileInfo = styled.View`
  width: 100%;
  height: 57%;
  margin-top: -20px;
  padding: 15px 30px 0 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: white;
`;

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`

const Submissions = () => {
  return (
    <ProfileWrapper>
      <InfoWrapper>
        <IconWrapper>
          <Link to="/projects/1">
            <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
          </Link>
        </IconWrapper>
        <Name p>Sing-off</Name>
        <View style={{ alignSelf: "center" }}>
          <Text p>133 Interactions</Text>
          <Text p>72 Submissions</Text>
        </View>
      </InfoWrapper>
      <View>
        <SectionHeader p>Top Submission</SectionHeader>
      </View>
    </ProfileWrapper>
  );
};

export { Submissions };
