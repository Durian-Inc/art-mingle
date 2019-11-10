import React, { useEffect } from 'react';
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { setGlobal, useGlobal } from "reactn";

import { AddPromptPage } from "./components/add_prompt/index";
import { Home } from "./components/home";
import { NavBar } from "./components/navbar";
import { Profile } from "./components/profile";
import { client } from "./utils/apollo";

import {
  GET_PROJECTS,
  GET_ME_QUERY,
  GET_USERS,
  GET_GROUPS
} from "./utils/helpers";

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 1098px;
`;

const user_submissions = [
  {
    color: "#f49494",
    title: "My First Project",
    name: "Robert Everlast",
    prompt: "Draw-off",
    likes: {
      platinum: "1",
      gold: "2",
      bronze: "3",
      total: 500
    }
  },
  {
    color: "#f49494",
    title: "My Second Project",
    name: "Robert Everlast",
    prompt: "Dance-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 20000
    }
  },
  {
    color: "#f49494",
    title: "My Third Project",
    name: "Robert Everlast",
    prompt: "Sing-off",
    likes: {
      platinum: "0",
      gold: "0",
      bronze: "1",
      total: 50
    }
  },
  {
    color: "#f49494",
    title: "My Fourth Project",
    name: "Robert Everlast",
    prompt: "Haiku Laifu",
    likes: {
      platinum: "50",
      gold: "643",
      bronze: "4938",
      total: 632972
    }
  }
]

setGlobal({
  projects: [],
  followUsers: [],
  users: [],
  //curUser: undefined,
  curUserSubmissions: [],
  followingSubmissions: [],
  groups: []
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
  const setUsers = useGlobal("users")[1];
  const setGroups = useGlobal("groups")[1];
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
  /*
  const {
    error: usersError,
    loading: usersLoading,
    data: usersData
  } = useQuery(GET_USERS);
  const {
    error: groupError,
    loading: groupLoading,
    data: groupData
  } = useQuery(GET_GROUPS);

  useEffect(() => {
    if (groupError) {
      console.log(groupError);
    } else if (!groupLoading) {
      setGroups(groupData.groups);
    }
  }, [groupLoading]);
  */

  // Find all the current project
  useEffect(() => {
    if (projectError) {
      console.log(projectError);
    } else if (!projectLoading) {
      setProjects(projectData.projects);
    }
  }, [projectLoading]);
/*
  // Find all the current users
  useEffect(() => {
    if (usersError) {
      console.log(usersError);
    } else if (!usersLoading) {
      setUsers(usersData.users);
    }
  }, [usersLoading]);


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
  }, [meLoading]);
*/
  return (
    <Router>
      <AppWrap>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add_prompt">
            <AddPromptPage />
          </Route>
          <Route path="/profile">
            <Profile
              username="Robert"
              interactions="133"
              submissions_no="72"
              color="#99ea5a"
              submissions={user_submissions}
            />
          </Route>
        </Switch>
      </AppWrap>
    </Router>
  );
}

export default App;
