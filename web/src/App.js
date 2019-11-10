import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { AddPromptPage } from "./components/add_prompt/index";
import { Home } from "./components/home";
import { NavBar } from "./components/navbar";

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 1098px;
`;

function App() {
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
        </Switch>
      </AppWrap>
    </Router>
  );
}

export default App;
