import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, StyleSheet, Image } from "react-native";

const NavWrapper = styled.View`
  position: absolute;
  z-index: 1000;
  background: white;
`;

export default class Navigation extends Component {
  render() {
    return (
      <NavWrapper>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Home</Text>
        </Link>
        <Link to="/groups" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Groups</Text>
        </Link>
        <Link to="/projects" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Projects</Text>
        </Link>
        <Link to="/users" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Users</Text>
        </Link>
        <Link to="/profile" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Profile</Text>
        </Link>
      </NavWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  logo: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128
  }
});
