import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Navigation } from "../../components/Navigation";
import { Submission } from "../../components/Submission";
import SwipeUpDown from 'react-native-swipe-up-down';

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"]

const ProfileWrapper = styled.View`
  flex: 1;
  margin-top: -30px
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

const ProfileHeader = styled.View`
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

const Mini = () => {
  return (
    <View style={{ width: "100%", height: 500 }}>
      <Text p>Hi</Text>
    </View>
  );
}

const Full = () => {
  return (
    <View>
      <Text p>Hey</Text>
    </View>
  );
}

const Profile = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  }

  /*return (
    <ProfileWrapper>
      <SwipeUpDown		
        itemMini={<Mini />} // Pass props component when collapsed
        itemFull={<Full />} // Pass props component when show full
        disablePressToShow={false} // Press item mini to show full
        style={{ backgroundColor: 'green' }} // style for swipe
        animation="easeInEaseOut"
      />
    </ProfileWrapper>
  );*/
  
  return (
    <ProfileWrapper>
      <ProfileHeader style={{ backgroundColor: colors[Math.floor(Math.random() * 5)] }}>
        <IconWrapper>
          <Link to="/">
            <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
          </Link>
          <Icon onPress={handleLikeClick} fill={liked ? "#ED7171" : ""} name={liked ? "heart" : "heart-outline"} width={36} height={36} />
        </IconWrapper>
        <ProfileImage>
          <Image
            //source={{ uri: "" }}
          />
        </ProfileImage>
        <Name p>Clue McChungus</Name>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Icon style={{ marginRight: 5 }} stroke="black" fill="#9EDCF0" name="heart" width={24} height={24}/>
          <Text p>Platinum Clout Since June, 2019</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Icon style={{ marginRight: 5 }} stroke="black" name="people" width={24} height={24}/>
          <Text p>69 Followers</Text>
        </View>
      </ProfileHeader>
      <ProfileInfo>
        <SectionHeader p>Submissions</SectionHeader>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </ProfileInfo>
      <Navigation />
    </ProfileWrapper>
  );
};

export { Profile };
