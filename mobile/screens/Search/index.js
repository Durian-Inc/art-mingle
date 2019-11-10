import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import { View, ScrollView, FlatList } from "react-native";
import { Link, Route } from "react-router-native";
import { Text, SearchBar, Button } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";
import { GroupModal } from "../../components/GroupModal";

const HomeWrapper = styled.View`
  flex: 1;
`;
const HomeScroll = styled.ScrollView``;
const Constrain = styled.View`
  padding: 0 30px;
`;

const GroupWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

const MemRow = styled.View`
  flex-direction: row;
`;
const Members = styled(Text)`
  font-size: 18px;
  margin-left: 10px;
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

const Group = ({ group }) => {
  const [joined, setJoined] = useState(false);

  const onJoin = () => {
    // Do nothing for now
  };

  return (
    <GroupWrapper>
      <View>
        <Text h4>{group.name}</Text>
        <MemRow>
          <Icon name="people-outline" width={20} height={20} />
          <Members>{group.users.length}</Members>
        </MemRow>
      </View>
      {!joined && (
        <ButtonContainer onPress={() => setJoined(true)}>
          <ButtonText>Join</ButtonText>
        </ButtonContainer>
      )}
      {joined && (
        <ButtonContainer>
          <Link to={`/groups/${group.id}`}>
            <ButtonText>View</ButtonText>
          </Link>
        </ButtonContainer>
      )}
    </GroupWrapper>
  );
};

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;
const NameTier = styled.View`
  flex-direction: row;
  align-items: center;
`;

const User = ({ user }) => {
  return (
    <Link to={`/users/${user.id}`}>
      <UserWrapper>
        <Icon name="person-outline" height={48} width={48} />
        <View>
          <NameTier>
            <Text h4>{`${user.firstName} ${user.lastName}`}</Text>
            <Icon name="heart" height={24} width={24} />
          </NameTier>
          <MemRow>
            <Icon name="clipboard-outline" width={20} height={20} />
            <Members>{user.submissions.length}</Members>
          </MemRow>
        </View>
      </UserWrapper>
    </Link>
  );
};

const TabHolder = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
`;
const TabLink = styled(Link)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Search = ({ match }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users] = useGlobal("users");
  const [groups] = useGlobal("groups");
  const [mUsers, setMUsers] = useState(users);
  const [mGroups, setMGroups] = useState(groups);

  useEffect(() => {
    setLoading(true);
    const getMatching = async () => {
      const temp = groups.filter(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      });
      setMGroups(temp);

      const temp2 = users.filter(item => {
        const name = `${item.firstName} ${item.lastName}`.toLowerCase();
        if (name.includes(search.toLowerCase())) {
          return item;
        }
      });
      setMUsers(temp2);
    };
    getMatching();
    setLoading(false);
  }, [search]);

  const GroupWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const CombinedList = () => {
    const [modalShown, setModalShown] = useState(false);

    const handleCreate = () => {
      setModalShown(!modalShown);
    };

    return (
      <View>
        <GroupWrapper>
          <Text h4>Groups</Text>
          <ButtonContainer onPress={handleCreate}>
            <ButtonText>Create</ButtonText>
          </ButtonContainer>
        </GroupWrapper>
        <FlatList
          data={mGroups}
          renderItem={({ item }) => <Group group={item} />}
          keyExtractor={item => item.id}
        />
        <Text h4>Users</Text>
        <FlatList
          data={mUsers}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={item => item.id}
        />
        <GroupModal visible={modalShown} setVisible={setModalShown} />
      </View>
    );
  };

  const GroupsList = () => {
    const [modalShown, setModalShown] = useState(false);

    const handleCreate = () => {
      setModalShown(!modalShown);
    };

    return (
      <View>
        <GroupWrapper>
          <Text h4>Groups</Text>
          <ButtonContainer onPress={handleCreate}>
            <ButtonText>Create</ButtonText>
          </ButtonContainer>
        </GroupWrapper>
        <FlatList
          data={mGroups}
          renderItem={({ item }) => <Group group={item} />}
          keyExtractor={item => item.id}
        />
        <GroupModal visible={modalShown} setVisible={setModalShown} />
      </View>
    );
  };

  const UsersList = () => {
    return (
      <View>
        <Text h4>Users</Text>
        <FlatList
          data={mUsers}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  return (
    <HomeWrapper>
      <HomeScroll>
        <Constrain style={{ marginTop: 60, marginBottom: 100 }}>
          <Text h3>Groups</Text>
          <SearchBar
            placeholder="Search Here..."
            onChangeText={setSearch}
            value={search}
            showLoading={loading}
            lightTheme
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0
            }}
          />
          <TabHolder>
            <TabLink to={`${match.path}`}>
              <Text h4>All</Text>
            </TabLink>
            <TabLink to={`${match.path}/groups`}>
              <Text h4>Groups</Text>
            </TabLink>
            <TabLink to={`${match.path}/users`}>
              <Text h4>Users</Text>
            </TabLink>
          </TabHolder>
          <Route exact path={`${match.path}`} component={CombinedList} />
          <Route exact path={`${match.path}/groups`} component={GroupsList} />
          <Route exact path={`${match.path}/users`} component={UsersList} />
        </Constrain>
      </HomeScroll>

      <Navigation />
    </HomeWrapper>
  );
};

export { Search };
