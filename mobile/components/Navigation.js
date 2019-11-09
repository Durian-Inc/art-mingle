import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from "react-router-native";
import { Icon } from "react-native-eva-icons";

const NavWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  padding: 10px 0;
  background: white;
`;

const NavItem = styled.View`
  display: flex;
  align-items: center;
`;

const Navigation = () => {
  return (
    <NavWrapper>
      <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
        <NavItem>
          <Icon name="home-outline" width={20} height={20} fill="black" />
          <Text>Home</Text>
        </NavItem>
      </Link>
      <Link to="/groups" underlayColor="#f0f4f7" style={styles.navItem}>
        <NavItem>
          <Icon name="people-outline" width={20} height={20} fill="black" />
          <Text>Groups</Text>
        </NavItem>
      </Link>
      <Link to="/projects" underlayColor="#f0f4f7" style={styles.navItem}>
        <NavItem>
          <Icon name="clipboard-outline" width={20} height={20} fill="black" />
          <Text>Projects</Text>
        </NavItem>
      </Link>
      <Link to="/users" underlayColor="#f0f4f7" style={styles.navItem}>
        <NavItem>
          <Icon name="search-outline" width={20} height={20} fill="black" />
          <Text>Users</Text>
        </NavItem>
      </Link>
    </NavWrapper>
  );
};

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

export { Navigation };
