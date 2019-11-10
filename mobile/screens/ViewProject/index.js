import React, { useState } from "react";
import { View, ScrollView, Linking } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from "expo-linear-gradient";

import { SubmitModal } from "../../components/SubmitModal";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"];

const data = {
  title: "Sing-off",
  date: "Dec. 12",
  desc:
    "Showcase your singing skills in this week's audio content! Feel free to go acapella or add some background music, anything goes!",
  type: "art",
  learning: [
    {
      title: "How to hit a sick dab",
      type: "video",
      link: "https://google.com",
      id: "1"
    },
    {
      title: "Here's some free shit",
      type: "link",
      link: "https://google.com",
      id: "2"
    },
    {
      title: "AAAAAAA",
      type: "link",
      link: "https://google.com",
      id: "3"
    },
    {
      title: "BBBBBBBBB",
      type: "video",
      link: "https://google.com",
      id: "4"
    }
  ],
  followers: [
    {
      fName: "Kevin",
      lName: "Schoonover",
      id: "1"
    },
    {
      fName: "Clay",
      lName: "McGinnis",
      id: "2"
    },
    {
      fName: "David",
      lName: "Gardiner",
      id: "3"
    },
    {
      fName: "Tommy",
      lName: "Dong",
      id: "4"
    },
    {
      fName: "Gavin",
      lName: "Lewis",
      id: "5"
    },
    {
      fName: "Catherine",
      lName: "Sauer",
      id: "6"
    },
    {
      fName: "Bob",
      lName: "Ross",
      id: "7"
    },
    {
      fName: "Carl",
      lName: "Sagan",
      id: "8"
    },
    {
      fName: "Chris",
      lName: "Gu",
      id: "9"
    },
    {
      fName: "Ricardo",
      lName: "Morales",
      id: "10"
    },
    {
      fName: "Clayton",
      lName: "Price",
      id: "11"
    },
    {
      fName: "Anna",
      lName: "Panckiewicz",
      id: "12"
    },
    {
      fName: "Patrick",
      lName: "Taylor",
      id: "13"
    }
  ]
};

const ProjectWrapper = styled.View`
  flex: 1;
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
`;

const ProjectHeader = styled.View`
  width: 100%;
  height: 45%;
  padding: 60px 30px 0 30px;
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
`;

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: -15px;
`;

const CardsWrapper = styled.ScrollView`
  margin-left: -40px;
  margin-right: -30px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
`;

const CardWrapper = styled.View`
  align-items: center;
  margin-left: 10px;
`;

const Card = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 12px 0 15px 0;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  elevation: 6;
`;

const CardTitle = styled(Text)`
  text-align: center;
  color: #949494;
  width: 100px;
`;

const FollowerWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  height: 40px;
`;

const Follower = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: -10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: white;
  font-size: 15px;
`;

const FollowerText = styled.Text`
  position: absolute;
`;

const ViewContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 10%;
  margin-top: 10px;
  width: 80%;
  height: 45px
  border-radius: 10px;  
  border: 3px solid black;  
  background-color: transparent;
  margin-right: 15px;
`;

const ViewText = styled.Text`
  font-size: 15px;
  color: black;
  text-align: center;
`;

const Learning = props => {
  loadInBrowser = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <View>
      <CardsWrapper horizontal showsHorizontalScrollIndicator={false}>
        {props.data.map((card, i) => {
          return (
            <CardWrapper
              style={{ marginRight: i === props.data.length - 1 ? 70 : 20 }}
              key={card.id}
            >
              <Card
                onPress={() => loadInBrowser(card.link)}
                style={{
                  backgroundColor: colors[Math.floor(Math.random() * 5)]
                }}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.8)", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    padding: 50,
                    alignItems: "center",
                    borderRadius: 15
                  }}
                ></LinearGradient>
                <View style={{ flex: 1, alignItems: "center", marginTop: -70 }}>
                  {card.type === "video" && (
                    <Icon name="play-circle-outline" width={40} height={40} />
                  )}
                  {card.type === "link" && (
                    <Icon name="file-text-outline" width={40} height={40} />
                  )}
                </View>
              </Card>
              <CardTitle p>{card.title}</CardTitle>
            </CardWrapper>
          );
        })}
      </CardsWrapper>
    </View>
  );
};

const Followers = props => {
  var count = 0;
  if (!props.data.length) {
    return <View></View>;
  } else {
    return (
      <View>
        <SectionHeader p>Followers</SectionHeader>
        <FollowerWrapper>
          {props.data.map((follower, i) => {
            if (i < 10 || i === props.data.length - 1) {
              return (
                <Follower
                  style={{
                    backgroundColor: colors[Math.floor(Math.random() * 5)]
                  }}
                  key={follower.id}
                >
                  <LinearGradient
                    colors={["rgba(255,255,255,0.8)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      padding: 20,
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  ></LinearGradient>
                  <FollowerText p style={{ marginLeft: -3 }}>
                    {i === props.data.length - 1 && count
                      ? "+" + count
                      : (follower.fName[0] + follower.lName[0]).toUpperCase()}
                  </FollowerText>
                </Follower>
              );
            } else {
              count++;
            }
          })}
        </FollowerWrapper>
      </View>
    );
  }
};

const ViewProject = () => {
  const [liked, setLiked] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleSubmit = () => {
    setModalShown(!modalShown);
  };

  return (
    <ProjectWrapper>
      <ProjectHeader
        style={{ backgroundColor: colors[Math.floor(Math.random() * 5)] }}
      >
        <IconWrapper>
          <Link to="/">
            <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
          </Link>
          <View style={{ flexDirection: "row" }}>
            <ButtonContainer onPress={handleSubmit}>
              <ButtonText>Submit</ButtonText>
            </ButtonContainer>
            <Icon
              onPress={handleLikeClick}
              fill={liked ? "#ED7171" : ""}
              name={liked ? "heart" : "heart-outline"}
              width={36}
              height={36}
            />
          </View>
        </IconWrapper>
        <ProjectTitleWrapper>
          <View>
            <ProjectTitle p>{data.title}</ProjectTitle>
            <Text p>Ends {data.date}</Text>
          </View>
          {data.type === "music" && <ProjectIcon name="mic-outline" />}
          {data.type === "art" && <ProjectIcon name="color-palette-outline" />}
          {data.type === "poetry" && <ProjectIcon name="edit-2-outline" />}
        </ProjectTitleWrapper>
      </ProjectHeader>
      <ProjectInfo>
        <Description p>{data.desc}</Description>
        <SectionHeader p>Learn</SectionHeader>
        <Learning data={data.learning} />
        <Followers data={data.followers} />
        <ViewContainer>
          <Link to="/projects/1/submissions">
            <ViewText>View All Submissions</ViewText>
          </Link>
        </ViewContainer>
      </ProjectInfo>
      <SubmitModal visible={modalShown} setVisible={setModalShown} />
    </ProjectWrapper>
  );
};

export { ViewProject };
