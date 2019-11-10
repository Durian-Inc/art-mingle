import React, { useEffect, useState } from "react";
import { ApolloProvider, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { AuthSession } from "expo";
import styled from "styled-components";

import { config } from "./config";

import { setGlobal, useGlobal } from "reactn";
import { Text, View, AppRegistry } from "react-native";
import { NativeRouter, Route } from "react-router-native";

import { Home } from "./screens/Home";
import { Search } from "./screens/Search";

import { ListProjects } from "./screens/ListProjects";
import { ViewProject } from "./screens/ViewProject";
import { Profile } from "./screens/Profile";
import { Submissions } from "./screens/Submissions";
import { ViewGroup } from "./screens/ViewGroup";
import { client } from "./utils/apollo";

import {
  GET_PROJECTS,
  GET_ME_QUERY,
  GET_USERS,
  GET_GROUPS
} from "./utils/helpers";

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

const About = () => <Text>About</Text>;

const Topics = () => <Text>Topics</Text>;

const Content = styled.View`
  flex: 1;
`;

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }

  if (message.indexOf("You are not currently signed in") <= -1) {
    _console.warn(message);
  }
};

setGlobal({
  projects: [],
  followUsers: [],
  users: [],
  curUser: undefined,
  done: false,
  curUserSubmissions: [],
  followingSubmissions: [],
  groups: []
});

const App = () => {
  const [done, setDone] = useGlobal("done");

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: config.AUTH0_CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid email profile", // retrieve the user's profile
      nonce: "nonce" // ideally, this will be a random value
    });
    const authUrl = `https://${config.AUTH0_DOMAIN}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    if (response.type === "success") {
      await handleResponse(response.params);
    }
  };

  handleResponse = async response => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    await AsyncStorage.setItem(config.BEARER_ACCESS_KEY, jwtToken);

    setDone(true);
  };

  if (!done) {
    login();
    return <ActivityIndicator />;
  }

  return (
    <ApolloProvider client={client}>
      <AppBody />
    </ApolloProvider>
  );
};

const AppBody = () => {
  const setProjects = useGlobal("projects")[1];
  const setUsers = useGlobal("users")[1];
  const setGroups = useGlobal("groups")[1];
  const setCurUser = useGlobal("curUser")[1];
  const setFollowingSubmissions = useGlobal("followingSubmissions")[1];
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    GET_ME_QUERY,
    { pollInterval: 2000 }
  );
  const {
    error: projectError,
    loading: projectLoading,
    data: projectData
  } = useQuery(GET_PROJECTS, { skip: !meData });
  const {
    error: usersError,
    loading: usersLoading,
    data: usersData
  } = useQuery(GET_USERS, { skip: !meData });
  const {
    error: groupError,
    loading: groupLoading,
    data: groupData
  } = useQuery(GET_GROUPS, { skip: !meData });

  console.disableYellowBox = true;

  useEffect(() => {
    if (groupError) {
      console.log(groupError);
    } else if (!groupLoading && groupData) {
      setGroups(groupData.groups);
    }
  }, [groupData]);

  // Find all the current project
  useEffect(() => {
    if (projectError) {
      console.log(projectError);
    } else if (!projectLoading && projectData) {
      setProjects(projectData.projects);
    }
  }, [projectData]);

  // Find all the current users
  useEffect(() => {
    if (usersError) {
      console.log(usersError);
    } else if (!usersLoading && usersData) {
      setUsers(usersData.users);
    }
  }, [usersData]);

  // Collect the submissions for following users for the 'Followed' section
  useEffect(() => {
    if (meError) {
      console.log(meError);
    } else if (!meLoading && meData) {
      const curUserData = meData.me;
      setCurUser(curUserData);

      let followingSubmissions = [];
      curUserData.following.forEach(followingUser => {
        followingUser.submissions.forEach(submission => {
          followingSubmissions.push({
            ...submission,
            date: new Date(submission.dateSubmitted),
            color: "#000"
          });
        });
      });
      setFollowingSubmissions(
        followingSubmissions.sort((a, b) => b.date - a.date)
      );
    }
  }, [meData]);

  return (
    <NativeRouter>
      <Content>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={ListProjects} />
        <Route exact path="/projects/:id" component={ViewProject} />
        <Route path="/projects/:id/submissions" component={Submissions} />
        <Route path="/search" component={Search} />
        <Route path="/groups/:id" component={ViewGroup} />
        <Route path="/users/:id" component={Profile} />
      </Content>
    </NativeRouter>
  );
};

export default App;

AppRegistry.registerComponent("art-mingle", () => App);
