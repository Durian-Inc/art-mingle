import React, { useState } from "react";
import { useGlobal } from "reactn";
import { View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { Text, Image } from "react-native-elements";
import styled from "styled-components";
import { Icon } from "react-native-eva-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Navigation } from "../../components/Navigation";
import { Submission } from "../../components/Submission";

const colors = ["#FFB4BB", "#FFDFB9", "#FFFFB9", "#BAFFC9", "#BAE1FF"]

const ProjectsWrapper = styled.View`
  flex: 1;
  padding: 0 30px;
`;

const PSWrapper = styled(View)`
  flex-direction: row;
  background: #FFB4BB;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  height: 200px;
  width: 100%;
  margin-bottom: 15px;
`;

const PSBoxWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`

const PSBox1 = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
`;

const PSBox2 = styled.View`
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-left: 20px;
`;

const PSName = styled(Text)`
  color: white;
  font-weight: bold;
`;
const PSLink = styled(Link)`
  width: 100%;
`;

const ListProjects = () => {
  const [ projects ] = useGlobal("projects");
  return (
    <ProjectsWrapper>
      <ScrollView style={{ marginBottom: 90 }} showsVerticalScrollIndicator={false}>
        <Text style={{ marginTop: 60 }} h3>Current Projects</Text>
        {projects.map((d) => {
          return (
            <PSWrapper color={colors[Math.floor(Math.random() * 5)]} key={d.id}>
              <PSLink to={`/projects/${project.id}`}>
                <PSBoxWrapper>
                  <PSBox1>
                    {d.category === "music" && <Icon name="mic-outline" fill="#ffffff" width={100} height={100} />}
                    {d.category === "art" && <Icon name="color-palette-outline" fill="#ffffff" width={100} height={100} />}
                    {d.category === "poetry" && <Icon name="edit-2-outline" fill="#ffffff" width={100} height={100} />}
                    <PSName h4>{d.name}</PSName>
                  </PSBox1>
                  <PSBox2>
                    <PSName p>{d.description}</PSName>
                  </PSBox2>
                </PSBoxWrapper>
              </PSLink>
            </PSWrapper>
          );
        })}
      </ScrollView>
      <Navigation />
    </ProjectsWrapper>
  );
};

export { ListProjects };
