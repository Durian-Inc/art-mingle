import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, View, Platform } from "react-native";
import { Link } from "react-router-native";
import { Icon } from "react-native-eva-icons";

const NavWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25)
  elevation: 6;
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
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (platform === "") {
      setPlatform(Platform.OS);
    }
  });

  return (
    <NavWrapper
      style={{
        paddingBottom: platform === "android" || platform === "" ? 0 : 30,
        height: platform === "android" || platform === "" ? 65 : 90
      }}
    >
      <NavLink to="/" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="home-outline" width={20} height={20} fill="black" />
          <Text>Home</Text>
        </NavItem>
      </NavLink>
      <NavLink to="/search" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="search-outline" width={20} height={20} fill="black" />
          <Text>Search</Text>
        </NavItem>
      </NavLink>
      <NavLink to="/projects" underlayColor="#f0f4f7">
        <NavItem>
          <Icon name="clipboard-outline" width={20} height={20} fill="black" />
          <Text>Projects</Text>
        </NavItem>
      </NavLink>
    </NavWrapper>
  );
};

export { Navigation };
