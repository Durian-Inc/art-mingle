import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { AddPromptPage } from "./components/add_prompt/index";
import { Home } from "./components/home";
import { NavBar } from "./components/navbar";
import { Profile } from "./components/profile";

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 1098px;
`;

const user_submissions = [
  {
    color: "#f49494",
    title: "My First Project",
    name: "Robert Everlast",
    prompt: "Draw-off",
    likes: {
      platinum: "1",
      gold: "2",
      bronze: "3",
      total: 500
    }
  },
  {
    color: "#f49494",
    title: "My Second Project",
    name: "Robert Everlast",
    prompt: "Dance-off",
    likes: {
      platinum: "4",
      gold: "14",
      bronze: "144",
      total: 20000
    }
  },
  {
    color: "#f49494",
    title: "My Third Project",
    name: "Robert Everlast",
    prompt: "Sing-off",
    likes: {
      platinum: "0",
      gold: "0",
      bronze: "1",
      total: 50
    }
  },
  {
    color: "#f49494",
    title: "My Fourth Project",
    name: "Robert Everlast",
    prompt: "Haiku Laifu",
    likes: {
      platinum: "50",
      gold: "643",
      bronze: "4938",
      total: 632972
    }
  }
]

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
          <Route path="/profile">
            <Profile
              username="Robert"
              interactions="133"
              submissions_no="72"
              color="#99ea5a"
              submissions={user_submissions}
            />
          </Route>
        </Switch>
      </AppWrap>
    </Router>
  );
}

export default App;
