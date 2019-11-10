import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const NavLink = styled(Link)`
  color: #212121;
  font-size: 36px;
  font-weight: normal;
  text-decoration: none;
`;

const NavWrapRight = styled.div`
  margin: 0 -15px;

  a {
    font-size: 24px;
    margin: 0 15px;
  }
`;


// TODO: Add profile vector logo
const NavBar = () => {
  return (
    <NavWrap>
      <NavLink to="/">ArtMingle</NavLink>

      <NavWrapRight>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add_prompt">Add Prompt</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </NavWrapRight>
    </NavWrap>
  );
};

export { NavBar };
