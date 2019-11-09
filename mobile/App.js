import React, { useEffect } from "react";
import styled from "styled-components";

import { setGlobal, useGlobal } from "reactn";
import { Text, View, AppRegistry } from "react-native";
import { NativeRouter, Route } from "react-router-native";

import { Home } from "./screens/Home";

import firebase from 'firebase/app';
import 'firebase/firestore';

import { ProjectView } from "./screens/ProjectView";
import { firebaseConfig } from "./firebase";

const About = () => <Text>About</Text>;

const Topics = () => <Text>Topics</Text>;

const Content = styled.View`
  flex: 1;
`;

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

setGlobal({
  projects: [],
  followUsers: [],
  curUser: undefined,
  curUserSubmissions: [],
  followingSubmissions: [],
});


const App = () => {
  const setProjects = useGlobal("projects")[1];
  const setCurUser = useGlobal("curUser")[1];
  const setCurUserSubmissions = useGlobal("curUserSubmissions")[1];
  const setFollowingSubmissions = useGlobal("followingSubmissions")[1];

  const projectsQuery = db.collection("project");
  const usersQuery = db.collection("users");

  // Collect all projects in real-time
  useEffect(() => {
    const unsubscribe = projectsQuery.onSnapshot(snapshot => {
      let projects = [];
      snapshot.forEach(doc =>
        projects.push({ ...doc.data(), id: doc.id }),
      );
      setProjects(projects);
    });

    return unsubscribe
  }, [])

  // Collect the current user and submissions in real-time
  useEffect(() => {
    let index = 0;
    let user = undefined;
    const unsubscribe = usersQuery.onSnapshot(snapshot => {
      snapshot.forEach((doc) => {
        if (index == 1) {
          user = { ...doc.data(), id: doc.id }
          let submissions = []
          // Find the users submissions
          if (user.submissions) {
            user.submissions.forEach((submission) => {
              submission.get.then((curSubmission) => {
                submissions.push(
                  { ...curSubmission.data(), id: curSubmission.id }
                )
                setCurUserSubmissions(submissions)
              })
            });
          }

          if (user.following) {
            let followingSubmissions = [];
            user.following.forEach((user) => {
              user.get().then((curUser) => {
                const userData = curUser.data()
                userData.submissions.forEach((submission) => {
                  console.log(submission)
                  submission.get().then((curSubmission) => {
                    followingSubmissions.push(
                      {
                        ...curSubmission.data(),
                        user: `${userData.firstName} ${userData.lastName}`,
                        id: curSubmission.id
                      }
                    )
                    setFollowingSubmissions(followingSubmissions);
                  })
                })
              });
            });
          }
        }
        index += 1
      })

      delete user.submissions
      setCurUser(user);
    });

    return unsubscribe
  }, [])


  return (
    <NativeRouter>
      <Content>
        <Route exact path="/" component={Home} />
        <Route path="/groups" component={Topics} />
        <Route path="/groups/:id" component={Topics} />
        <Route path="/projects" component={About} />
        <Route path="/projects/:id" component={ProjectView} />
        <Route path="/projects/:id/submissions" component={About} />
        <Route path="/profile" component={Topics} />
        <Route path="/users" component={Topics} />
        <Route path="/users/:id" component={Topics} />
      </Content>
    </NativeRouter>
  );
};

export default App;

AppRegistry.registerComponent("art-mingle", () => App);
