import React from "react";
import { useGlobal } from "reactn";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components";

const SubWrapper = styled.View`
  flex-direction: row;
  margin: 20px 0 20px 30px;
`;
const SubPreview = styled.View`
  width: 90px;
  height: 90px;
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  margin-right: 20px;
`;
const SubInfo = styled.View`
  align-content: space-between;
`;
const SubLikes = styled.View`
  flex-direction: row;
`;

const Submission = ({ submission }) => {
  return (
    <SubWrapper>
      <SubPreview color={submission.color} />
      <SubInfo>
        <View>
          <Text>{submission.name}</Text>
          <Text>{submission.user}</Text>
          <Text>for {submission.project.name}</Text>
        </View>
        <SubLikes>
          <Icon name="heart" height={20} width={20} />
          <Text>{submission.likes}</Text>
        </SubLikes>
      </SubInfo>
    </SubWrapper>
  );
};

export { Submission };

