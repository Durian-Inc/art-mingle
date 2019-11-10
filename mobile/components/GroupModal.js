import React, { useState } from "react";
import { View, Modal } from "react-native";
import { Text, Input } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import "firebase/storage";
import styled from "styled-components";

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalView = styled(View)`
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 10px 5px;
  background: white;
  border-radius: 15px;
`;
const Buttons = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 5px;
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

const TextInput = styled(Input)`
  padding: 0 10px;
  background: grey;
`

const GroupModal = ({ visible, setVisible }) => {
  const [name, setName] = useState("");

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
          <Text>Group Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
          />
          <Buttons>
            <ButtonContainer>
              <ButtonText>Submit</ButtonText>
            </ButtonContainer>
            <ButtonContainer onPress={() => {
                setVisible(!visible);
              }}
              type="clear">
              <ButtonText>Cancel</ButtonText>
            </ButtonContainer>            
          </Buttons>
        </ModalView>
      </ModalWrapper>
    </Modal>
  );
};

export { GroupModal };
