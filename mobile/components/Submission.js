import React, { useState } from "react";
import { useGlobal } from "reactn";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components";

const SubWrapper = styled.View`
  flex-direction: row;
  margin: 20px 0 20px 30px;
  width: 100%;
`;

const SubPreview = styled.View`
  width: 90px;
  height: 90px;
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  margin-right: 10px;
`;

const SubInfo = styled.View`
  align-content: space-between;
`;

const SubLikes = styled.View`
  flex-direction: row;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  margin-bottom: -5px;
`

const SubProject = styled(Text)`
  margin-top: -5px;
  margin-bottom: 5px;
`

const SuperLikeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`

const LikeWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  margin-right: 10px;
  right: 30;
`

const Submission = ({ submission }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <SubWrapper>
      <SubPreview color={submission.color} />
      <SubInfo>
        <View>
          <SubTitle>{submission.name}</SubTitle>
          <Text>{submission.firstName + " " + submission.lastName}</Text>
          <SubProject>for {submission.project.name}</SubProject>
        </View>
        <SubLikes>
          <SuperLikeWrapper style={{ flexDirection: "row", }}>
            <Icon name="heart" fill="#9EDCF0" height={20} width={20} />
            <Text style={{ marginLeft: 1 }}>{submission.likes}</Text>
          </SuperLikeWrapper>
          <SuperLikeWrapper style={{ flexDirection: "row" }}>
            <Icon name="heart" fill="#F0C658" height={20} width={20} />
            <Text style={{ marginLeft: 1 }}>{submission.likes}</Text>
          </SuperLikeWrapper>
          <SuperLikeWrapper style={{ flexDirection: "row" }}>
            <Icon name="heart" fill="#8A6929" height={20} width={20} />
            <Text style={{ marginLeft: 1 }}>{submission.likes}</Text>
          </SuperLikeWrapper>
        </SubLikes>
      </SubInfo>
      <LikeWrapper>
        <Icon onPress={handleLikeClick}
              fill={liked ? "#ED7171" : ""}
              name={liked ? "heart" : "heart-outline"}
              width={36}
              height={36} />
        <Text p>80</Text>
      </LikeWrapper>
    </SubWrapper>
  );
};

export { Submission };

