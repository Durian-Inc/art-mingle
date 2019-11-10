import React, { useState } from "react";
import { View, Modal } from "react-native";
import { Text, Button } from "react-native-elements";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import "firebase/storage";
import styled from "styled-components";

const data = [
  {
    name: 'group1',
    id: '1'
  },
  {
    name: 'group2',
    id: '2'
  },
  {
    name: 'group3',
    id: '3'
  }
]

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

const Groups = (props) => {
  const handleAdd = () => {
    // add to group
  }

  return(
    // Check to see if group already has project and disable button if so
    <View>
      {props.data.map((group) => {
        return (
          <View key={group.id}>
            <Text p>{group.name}</Text>
            <ButtonContainer onPress={handleAdd}>
              <ButtonText>Add</ButtonText>
            </ButtonContainer>
          </View>
        );
      })}
    </View>
  )
}

const AddToGroupModal = ({ visible, setVisible }) => {
  const handleSubmit = () => {
    // make group
  }
 
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
          <Groups data={data} />
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
