import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Link, Route } from "react-router-native";
import { Text, SearchBar, Button } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";

const DATA = [
  {
    name: "My Group",
    members: 3,
    id: "1"
  },
  {
    name: "Your Group",
    members: 87,
    id: "2"
  },
  {
    name: "Zoop",
    members: 6,
    id: "3"
  }
];

const USERSDATA = [
  {
    name: "Clay McGinnis",
    projects: 3,
    id: "1"
  },
  {
    name: "Kevin S",
    projects: 87,
    id: "2"
  },
  {
    name: "Tom Dong",
    projects: 6,
    id: "3"
  }
];

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

const Group = ({ group }) => {
  const onJoin = () => {
    // Do nothing for now
  };

  return (
    <GroupWrapper>
      <View>
        <Text h4>{group.name}</Text>
        <MemRow>
          <Icon name="people-outline" width={20} height={20} />
          <Members>{group.members}</Members>
        </MemRow>
      </View>
      <Button onPress={onJoin} title="Join" />
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
            <Text h4>{user.name}</Text>
            <Icon name="heart" height={24} width={24} />
          </NameTier>
          <MemRow>
            <Icon name="clipboard-outline" width={20} height={20} />
            <Members>{user.projects}</Members>
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
  const [mUsers, setMUsers] = useState(USERSDATA);
  const [mGroups, setMGroups] = useState(DATA);

  useEffect(() => {
    setLoading(true);
    const getMatching = async () => {
      const temp = DATA.filter(item => {
        if (item.name.includes(search)) {
          return item;
        }
      });
      setMGroups(temp);

      const temp2 = USERSDATA.filter(item => {
        if (item.name.includes(search)) {
          return item;
        }
      });
      setMUsers(temp2);
    };
    getMatching();
    setLoading(false);
  }, [search]);

  const CombinedList = () => {
    return (
      <View>
        <Text h4>Groups</Text>
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
      </View>
    );
  };

  const GroupsList = () => {
    return (
      <View>
        <Text h4>Groups</Text>
        <FlatList
          data={mGroups}
          renderItem={({ item }) => <Group group={item} />}
          keyExtractor={item => item.id}
        />
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
