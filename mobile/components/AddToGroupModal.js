import React, { useState, useGlobal } from "reactn";
import { View, Modal } from "react-native";
import { Text, Button } from "react-native-elements";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import "firebase/storage";
import styled from "styled-components";

import { GET_ME_QUERY, ADD_PROJECT_TO_GROUP } from "../utils/helpers";

import { useMutation } from "@apollo/react-hooks";

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalView = styled(View)`
  width: 80%;
  height: 50%;
  background: white;
`;
const Buttons = styled.View`
  flex-direction: row;
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

const Groups = props => {
  const [addProjectToGroup] = useMutation(ADD_PROJECT_TO_GROUP, {
    refetchQueries: [{ query: GET_ME_QUERY }]
  });
  return (
    <View>
      {props.data.map(group => {
        return (
          <View key={group.id}>
            <Text>{group.name}</Text>
            <ButtonContainer
              onPress={() => {
                addProjectToGroup({
                  variables: { group: group.id, project: props.project }
                });
                props.setVisible(false);
              }}
            >
              <ButtonText>Add</ButtonText>
            </ButtonContainer>
          </View>
        );
      })}
    </View>
  );
};

const AddToGroupModal = ({ project, visible, setVisible }) => {
  const [user] = useGlobal("curUser");

  const handleSubmit = () => {
    // make group
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <ModalWrapper>
        <ModalView>
          <Text p>ADD TO GROUP</Text>
          <Groups
            data={user.groups}
            project={project}
            setVisible={setVisible}
          />
          <Buttons>
            <Button
              onPress={() => {
                setVisible(!visible);
              }}
              type="clear"
              title="Cancel"
            ></Button>
          </Buttons>
        </ModalView>
      </ModalWrapper>
    </Modal>
  );
};

export { AddToGroupModal };
