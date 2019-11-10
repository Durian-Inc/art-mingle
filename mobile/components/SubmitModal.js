import React, { useState } from "react";
import { View, Modal, TouchableHighlight } from "react-native";
import { Text, Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import { firebase } from "../firebase";
import "firebase/storage";
import styled from "styled-components";
import * as DocumentPicker from "expo-document-picker";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_SUBMISSION = gql`
  mutation CreateSubmission($project: String!, $url: String!, $name: String!) {
    createSubmission(project: $project, url: $url, name: $name) {
      name
    }
  }
`;

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
`

const SubmitModal = ({ project, visible, setVisible }) => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [createSubmission, { data }] = useMutation(CREATE_SUBMISSION);

  const uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child(image.name)
      .put(blob);

    ref.on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //alert("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //alert("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            //alert("Upload is running");
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
        setStatus("error");
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        ref.snapshot.ref.getDownloadURL().then(downloadURL => {
          createSubmission({
            variables: { name, project, url: downloadURL }
          });
          setStatus("success");
        });
      }
    );

    return;
  };
  if (status === "success") {
    setVisible(false);
  } else if (status == "error") {
    alert("ahhh");
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
          <ButtonContainer onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync();
            setImage(result);
          }}>
            <ButtonText>Choose file</ButtonText>
          </ButtonContainer>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            undefined
          )}
          <Text>Submission Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
          />
          <Buttons>
            <ButtonContainer onPress={async () => {
              if (image) uploadImage(image.uri);
            }}>
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

export { SubmitModal };
