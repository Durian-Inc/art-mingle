import React, { useState } from "react";
import { View, Modal } from "react-native";
import { Text, Button } from "react-native-elements";
import { TextInput } from "react-native";
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
  width: 80%;
  height: 50%;
  background: white;
`;
const Buttons = styled.View`
  flex-direction: row;
`;

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
          <Text p>CREATE GROUP</Text>
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setName(text)} value={name}/>
          <Buttons>
            <Button
              onPress={async () => {
                if (image) uploadImage(image);
              }}
              title="Submit"
            ></Button>
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

export { GroupModal };
