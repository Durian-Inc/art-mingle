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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

setGlobal({
  projects: []
});

const App = () => {
  const [projects, setProjects] = useGlobal("projects");
  const projectsQuery = db.collection("project")

  const collectProjects = async () => {
    const projects = await projectsQuery.get()
    const newProjects = []
    projects.forEach((project) => {
      newProjects.push({ ...project.data(), id: project.id });
    })
    setProjects(newProjects);
  }

  useEffect(() => {
    collectProjects()
    const unsubscribe = projectsQuery.onSnapshot(snapshot => {
        let projects = [];
        snapshot.forEach(doc =>
          projects.push({ ...doc.data(), id: doc.id }),
        );
    });

    return unsubscribe
  }, [])

  console.log(projects);

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
