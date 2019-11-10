import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Submission } from "../../components/Submission";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"]

const SubmissionsWrapper = styled.ScrollView`
  flex: 1;
  align-items; center;
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

const Submissions = () => {
  return (
    <SubmissionsWrapper showsVerticalScrollIndicator={false}>
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
      <SubmissionsSubWrapper style={{ marginBottom: 80 }}>
        <SectionHeader p>Top Submission</SectionHeader>
        <View style={{ marginLeft: -30, paddingLeft: 5 }}>
          <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
        </View>
        <SectionHeader p>Random Submissions</SectionHeader>
        <View style={{ marginLeft: -30, paddingLeft: 5 }}>
          <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
           <Submission
            submission={{
              name: "I am top project",
              user: "David Gardiner",
              category: "poetry",
              project: "Poet-off",
              likes: 99,
              color: "#FFC28A"
            }}
          />
        </View>
      </SubmissionsSubWrapper>
    </SubmissionsWrapper>
  );
};

export { Submissions };
