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
  width: 80%;
  height: 50%;
  background: white;
`;
const Buttons = styled.View`
  flex-direction: row;
`;

const SubmitModal = ({ visible, setVisible }) => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("test")
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
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        ref.snapshot.ref.getDownloadURL().then(downloadURL => {
          useMutation(CREATE_SUBMISSION, {
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
          <TouchableHighlight
            onPress={async () => {
              const result = await DocumentPicker.getDocumentAsync();
              setImage(result.uri);
            }}
          >
            <Text>Choose file</Text>
          </TouchableHighlight>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            undefined
          )}
          <Input
            label="Submission Name"
            onChangeText={text => setName(text)}
            value={name}
          />
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

export { SubmitModal };
