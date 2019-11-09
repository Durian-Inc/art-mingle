import React from "react";

import { StyleSheet, Text, View } from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";

const Home = () => <Text style={styles.header}>Home</Text>;

const About = () => <Text style={styles.header}>About</Text>;

const Topics = ({ match }) => <Text style={styles.header}>Topics</Text>;

class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
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
          </View>

          <Route exact path="/" component={Home} />
          <Route path="/groups" component={Topics} />
          <Route path="/groups/:id" component={Topics} />
          <Route path="/projects" component={About} />
          <Route path="/projects/:id" component={About} />
          <Route path="/projects/:id/submissions" component={About} />
          <Route path="/profile" component={Topics} />
          <Route path="/users" component={Topics} />
          <Route path="/users/:id" component={Topics} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;
