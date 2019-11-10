import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from 'react-eva-icons';

const NavWrap = styled.div`
  background: transparent;
  color: #212121;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  width: 100%;
  z-index: 1;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  color: #212121;
  font-size: 36px;
  font-weight: normal;
  text-decoration: none;
`;

const NavWrapRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 -15px;
  height: 115px;

  a {
    font-size: 24px;
    margin: 0 15px;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 25px;

  i {
    margin: 0;
  }
`;

const NavBar = () => {
  return (
    <NavWrap>
      <NavLink to="/">ArtMingle</NavLink>

      <NavWrapRight>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add_prompt">Add Prompt</NavLink>
        <NavLink to="/profile">
          <Profile>
            <Icon name="person" size="xlarge" fill="#212121" />
          </Profile>
        </NavLink>
      </NavWrapRight>
    </NavWrap>
  );
};

export { NavBar };
