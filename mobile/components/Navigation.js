import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import { Icon } from "react-native-eva-icons";

const NavWrapper = styled.View`
  display: flex;
  flex-direction: row;
  height: 90px;
  flex: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding-bottom: 30px;
  z-index: 1000;
  background: white;
`;

const NavLink = styled(Link)`
  padding: 13px 0;
  flex: 1;
`;
const NavItem = styled(View)`
  align-items: center;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Navigation = () => {
  return (
    <NavWrapper>
      <NavLink to="/" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="home-outline" width={20} height={20} fill="black" />
          <Text>Home</Text>
        </NavItem>
      </NavLink>
      <NavLink to="/" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="people-outline" width={20} height={20} fill="black" />
          <Text>Groups</Text>
        </NavItem>
      </NavLink>
      <NavLink to="/" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="clipboard-outline" width={20} height={20} fill="black" />
          <Text>Projects</Text>
        </NavItem>
      </NavLink>
      <NavLink to="/" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="search-outline" width={20} height={20} fill="black" />
          <Text>Users</Text>
        </NavItem>
      </NavLink>
    </NavWrapper>
  );
};

export { Navigation };
