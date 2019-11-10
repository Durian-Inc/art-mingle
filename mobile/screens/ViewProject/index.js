import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  FlatList,
  Linking
} from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from "expo-linear-gradient";

import { SubmitModal } from "../../components/SubmitModal";
import { AddToGroupModal } from "../../components/AddToGroupModal";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"];

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  GET_PROJECT_QUERY,
  GET_ME_QUERY
} from "../../utils/helpers";

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
  height: 36px;
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

const CardsWrapper = styled.FlatList`
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
  height: 45px;
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
      <CardsWrapper
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={props.data}
        renderItem={({ item }) => (
          <CardWrapper style={{ marginRight: 20 }}>
            <Card
              onPress={() => loadInBrowser(item.url)}
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
                {item.type === "video" && (
                  <Icon name="play-circle-outline" width={40} height={40} />
                )}
                {item.type === "link" && (
                  <Icon name="file-text-outline" width={40} height={40} />
                )}
              </View>
            </Card>
            <CardTitle p>{item.description}</CardTitle>
          </CardWrapper>
        )}
      />
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
                      : (
                          follower.user.firstName[0] + follower.user.lastName[0]
                        ).toUpperCase()}
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

const ViewProject = props => {
  const [user] = useGlobal("curUser");
  const [followingSubmissions] = useGlobal("followingSubmissions");
  const [liked, setLiked] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [addModalShown, setAddModalShown] = useState(false);
  const [project, setProject] = useState({});
  const [resources, setResources] = useState([]);
  const [following, setFollowing] = useState([]);
  const { id } = props.match.params;

  const { error, data, loading } = useQuery(GET_PROJECT_QUERY, {
    variables: { id }
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { id },
    refetchQueries: [
      { query: GET_ME_QUERY },
      { query: GET_PROJECT_QUERY, variables: { id } }
    ]
  });
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    variables: { id },
    refetchQueries: [
      { query: GET_ME_QUERY },
      { query: GET_PROJECT_QUERY, variables: { id } }
    ]
  });

  useEffect(() => {
    if (error) {
      alert(error);
    } else if (!loading) {
      setLiked(
        user.projects && user.projects.findIndex(i => i.id === id) != -1
      );
      setProject(data.project);
      setResources(data.project.resources);
    }
  }, [loading]);

  useEffect(() => {
    setFollowing(
      followingSubmissions.filter(submission => submission.project.id === id)
    );
  }, []);

  const handleLikeClick = () => {
    if (liked) removeProject();
    else addProject();
    setLiked(!liked);
  };
  const handleSubmit = () => {
    setModalShown(!modalShown);
  };
  const handleAdd = () => {
    setAddModalShown(!addModalShown);
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
            <ButtonContainer style={{ width: 125 }} onPress={handleAdd}>
              <ButtonText>Add to Group</ButtonText>
            </ButtonContainer>
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
            <ProjectTitle p>{project.name}</ProjectTitle>
            <Text p>
              Ends{" "}
              {project.deadline &&
                new Date(project.deadline).toLocaleDateString()}
            </Text>
          </View>
          {project.category === "music" && <ProjectIcon name="mic-outline" />}
          {project.category === "art" && (
            <ProjectIcon name="color-palette-outline" />
          )}
          {project.category === "poetry" && (
            <ProjectIcon name="edit-2-outline" />
          )}
        </ProjectTitleWrapper>
      </ProjectHeader>
      <ProjectInfo>
        <Description p>{project.description}</Description>
        <SectionHeader p>Learn</SectionHeader>
        <Learning data={resources} />
        <Followers data={following} />
        <ViewContainer>
          <Link to={`/projects/${id}/submissions`}>
            <ViewText>View All Submissions</ViewText>
          </Link>
        </ViewContainer>
      </ProjectInfo>
      <SubmitModal
        project={id}
        visible={modalShown}
        setVisible={setModalShown}
      />
      <AddToGroupModal visible={addModalShown} setVisible={setAddModalShown} />
    </ProjectWrapper>
  );
};

export { ViewProject };
