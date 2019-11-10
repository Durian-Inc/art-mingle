import React, { useState, useGlobal, useEffect } from "reactn";
import { View, ScrollView } from "react-native";
import { Link, useParams } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { Navigation } from "../../components/Navigation";
import { Submission } from "../../components/Submission";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_USER,
  ADD_FOLLOW,
  REMOVE_FOLLOW,
  GET_ME_QUERY
} from "../../utils/helpers";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"];

const ProfileWrapper = styled.View`
  flex: 1;
`;

const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 5px;
`;

const BackIcon = styled(Icon)`
  margin-left: -10px;
`;

const ProfileHeader = styled.View`
  align-items: center;
  width: 100%;
  height: 48%;
  padding: 60px 30px 0 30px;
`;

const ProfileImage = styled.View`
  align-self: center;
  width: 175px;
  height: 175px;
  border-radius: 125px;
  background: grey;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
`;

const Name = styled(Text)`
  margin-top: 5px;
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
`;

const ProfileInfo = styled.View`
  width: 100%;
  height: 57%;
  margin-top: -20px;
  padding: 15px 30px 0 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: white;
`;

const SectionHeader = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

const Mini = () => {
  return (
    <View style={{ width: "100%", height: 500 }}>
      <Text p>Hi</Text>
    </View>
  );
};

const Full = () => {
  return (
    <View>
      <Text p>Loading</Text>
    </View>
  );
};

const Profile = () => {
  const [user] = useGlobal("curUser");
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_USER, { variables: { id } });

  const [addFollow, { error: addError }] = useMutation(ADD_FOLLOW, {
    refetchQueries: [
      { query: GET_USER, variables: { id } },
      { query: GET_ME_QUERY }
    ]
  });
  const [removeFollow, { error: removeError }] = useMutation(REMOVE_FOLLOW, {
    refetchQueries: [
      { query: GET_USER, variables: { id } },
      { query: GET_ME_QUERY }
    ]
  });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (data) {
      setLiked(
        data.user.followers &&
          data.user.followers.findIndex(i => i.id === user.id) != -1
      );
    }
  }, [data]);

  const handleLikeClick = () => {
    setLiked(!liked);
    if (!liked) {
      data.user.followers.push(user);
      addFollow({ variables: { user: id } });
    } else {
      const index = data.user.followers.findIndex(i => i.id === user.id);
      data.user.followers.splice(index, 1);
      removeFollow({ variables: { user: id } });
    }
  };

  /*return (
    <ProfileWrapper>
      <SwipeUpDown
        itemMini={<Mini />} // Pass props component when collapsed
        itemFull={<Full />} // Pass props component when show full
        disablePressToShow={false} // Press item mini to show full
        style={{ backgroundColor: 'green' }} // style for swipe
        animation="easeInEaseOut"
      />
    </ProfileWrapper>
  );*/
  if (loading) {
    return <Text h4>Loading</Text>;
  } else if (error) {
    return <Text h4>Error: {error.toString()}</Text>;
  } else if (addError) {
    return <Text h4>addError: {JSON.stringify(addError)}</Text>;
  } else if (removeError) {
    return <Text h4>removeError: {JSON.stringify(removeError)}</Text>;
  }

  return (
    <ProfileWrapper>
      <ProfileHeader
        style={{ backgroundColor: colors[Math.floor(Math.random() * 5)] }}
      >
        <IconWrapper>
          <Link to="/">
            <BackIcon name="arrow-ios-back-outline" width={36} height={36} />
          </Link>
          {user.id === id ? (
            <Icon name="settings-outline" width={36} height={36} />
          ) : (
            <Icon
              onPress={handleLikeClick}
              fill={liked ? "#ED7171" : ""}
              name={liked ? "heart" : "heart-outline"}
              width={36}
              height={36}
            />
          )}
        </IconWrapper>
        <ProfileImage>
          <Image source={{ uri: data.user.profilePictureUrl }} />
        </ProfileImage>
        <Name p>{`${data.user.firstName} ${data.user.lastName}`}</Name>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Icon
            style={{ marginRight: 5 }}
            stroke="black"
            fill="#9EDCF0"
            name="heart"
            width={24}
            height={24}
          />
          <Text p>Platinum Clout Since June, 2019</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Icon
            style={{ marginRight: 5 }}
            stroke="black"
            name="people"
            width={24}
            height={24}
          />
          <Text p>{data.user.followers.length} Followers</Text>
        </View>
      </ProfileHeader>
      <ProfileInfo>
        <SectionHeader p>Submissions</SectionHeader>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.user.submissions
            ? data.user.submissions.map(submission => {
                return (
                  <Submission submission={submission} key={submission.id} />
                );
              })
            : undefined}
        </ScrollView>
      </ProfileInfo>
      <Navigation />
    </ProfileWrapper>
  );
};

export { Profile };
