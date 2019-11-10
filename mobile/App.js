import React, { useEffect } from "react";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { setGlobal, useGlobal } from "reactn";
import { Text, View, AppRegistry } from "react-native";
import { NativeRouter, Route } from "react-router-native";

import { Home } from "./screens/Home";
import { Search } from "./screens/Search";

import { ListProjects } from "./screens/ListProjects";
import { ViewProject } from "./screens/ViewProject";
import { Profile } from "./screens/Profile";
import { client } from "./utils/apollo";

import { GET_PROJECTS, GET_ME_QUERY } from "./utils/helpers";

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
};

setGlobal({
  projects: [],
  followUsers: [],
  curUser: undefined,
  curUserSubmissions: [],
  followingSubmissions: []
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppBody />
    </ApolloProvider>
  );
};

const AppBody = () => {
  const setProjects = useGlobal("projects")[1];
  const setCurUser = useGlobal("curUser")[1];
  const setFollowingSubmissions = useGlobal("followingSubmissions")[1];
  const {
    error: projectError,
    loading: projectLoading,
    data: projectData
  } = useQuery(GET_PROJECTS);
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    GET_ME_QUERY
  );

  // Find all the current project
  useEffect(() => {
    if (projectError) {
      console.log(projectError);
    } else if (!projectLoading) {
      setProjects(projectData.projects);
    }
  }, [projectLoading]);

  // Collect the submissions for following users for the 'Followed' section
  useEffect(() => {
    if (meError) {
      console.log(meError);
    } else if (!meLoading) {
      const curUserData = meData.me;
      setCurUser(curUserData);

      let followingSubmissions = [];
      curUserData.following.forEach(followingUser => {
        followingUser.submissions.forEach(submission => {
          followingSubmissions.push({
            id: submission.id,
            name: submission.name,
            likes: submission.likes,
            date: new Date(submission.dateSubmitted),
            color: "#000",
            project: submission.project.name,
            user: `${followingUser.firstName} ${followingUser.lastName}`
          });
        });
      });
      setFollowingSubmissions(
        followingSubmissions.sort((a, b) => b.date - a.date)
      );
    }
  }, [meLoading]);

  return (
    <NativeRouter>
      <Content>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={ListProjects} />
        <Route exact path="/projects/:id" component={ViewProject} />
        <Route path="/projects/:id/submissions" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/groups/:id" component={Topics} />
        <Route path="/users/:id" component={Profile} />
      </Content>
    </NativeRouter>
  );
};

export default App;

AppRegistry.registerComponent("art-mingle", () => App);
