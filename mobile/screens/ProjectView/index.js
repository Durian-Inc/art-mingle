import React, { useState } from "react";
import { View, ScrollView, Button, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';

const ProjectWrapper = styled.View`
  flex: 1;
  margin: -75px -30px 0 -30px;
`;

const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px
  border-radius: 10px;  
  border: 3px solid black;  
  background-color: transparent;
  margin-right: 15px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: black;
  text-align: center;
`;

const BackIcon = styled(Icon)`
  margin-left: -10px;
`

const ProjectHeader = styled.View`
  width: 100%;
  height: 45%;
  padding: 60px 30px 0 30px;
  background: #ffc28a;
`;

const ProjectTitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  position: absolute;
  bottom: 50px;
  left: 30px;
`;

const ProjectTitle = styled(Text)`
  width: 100px;
  font-size: 24px;
  font-weight: bold;
`;

const ProjectIcon = styled(Icon)`
  width: 250px;
  height: 250px;
  margin-bottom: -20px;
`;

const ProjectInfo = styled.View`
  width: 100%;
  height: 60%;
  margin-top: -20px;
  padding: 15px 30px 0 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: white;
`;

const Description = styled(Text)`
  font-size: 16px;
  color: #949494;
  margin-bottom: 20px;
`

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: -15px;
`

const CardsWrapper = styled.ScrollView`
  margin-left: -30px;
  margin-right: -30px;
  padding-left: 30px;
  padding-right: 30px;
`

const CardWrapper = styled.View`
  align-items: center;
  margin-right: 30px;
`

const LastCardWrapper = styled.View`
  align-items: center;
  margin-right: 60px;
`

const Card = styled.View`
  justify-content: center;
  align-items: center;
  margin: 12px 0 15px 0;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
  elevation: 6;
  background: transparent;
`

const CardTitle = styled(Text)`
  text-align: center;
  color: #949494;
  width: 100px;
`

const ProjectView = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  }

  return (
    <ProjectWrapper>
      <ProjectHeader>
        <IconWrapper>
          <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
          <View style={{ flexDirection: "row" }}>
            <ButtonContainer>
              <ButtonText>Submit</ButtonText>
            </ButtonContainer>
            <Icon onPress={handleLikeClick} fill={liked ? "#ED7171" : ""} name={liked ? "heart" : "heart-outline"} width={36} height={36} />
          </View>
        </IconWrapper>
        <ProjectTitleWrapper>
          <View>
            <ProjectTitle p>Sing Off</ProjectTitle>
            <Text p>Due Dec. 12</Text>
          </View>
          <ProjectIcon name="mic-outline" />
        </ProjectTitleWrapper>
      </ProjectHeader>
      <ProjectInfo>
        <Description p>
          Showcase your singing skills in this week's audio content! Feel free
          to go acapella or add some background music, anything goes!
        </Description>
        <SectionHeader p>Learn</SectionHeader>
        <View>
          <CardsWrapper horizontal showsHorizontalScrollIndicator={false}>
            <CardWrapper>
              <Card><LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ width: 100, alignItems: 'center', borderRadius: 5 }}></LinearGradient></Card>
              <CardTitle p>How to hit that pitch</CardTitle>
            </CardWrapper>
            <CardWrapper>
              <Card></Card>
              <CardTitle p>Free recording programs</CardTitle>
            </CardWrapper>
            <CardWrapper>
              <Card></Card>
              <CardTitle p>Free recording programs</CardTitle>
            </CardWrapper>
            <LastCardWrapper>
              <Card></Card>
              <CardTitle p>Free recording programs</CardTitle>
            </LastCardWrapper>
          </CardsWrapper>
        </View>
        <SectionHeader p>Followers</SectionHeader>
        <View></View>
      </ProjectInfo>
    </ProjectWrapper>
  );
};

export { ProjectView };
