import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./css-build.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Search from "./views/Search";
import Watchlist from "./views/Watchlist";
import SingleMovie from "./views/SingleMovie";
import firebase from "firebase";
import db, { firebaseApp } from "./firebase";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    console.log(authData);
    this.setState({
      uid: authData.user.uid,
    });
  };

  authenticate = () => {
    const authProvider = new firebase.auth["GithubAuthProvider"]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  };

  // TODO add movie watchlist scoped to users
  addToWatchlist = () => {};

  render() {
    return (
      <div>
        <Router>
          {/* change navbar based on login status */}
          <Navbar
            authenticate={this.authenticate}
            logout={this.logout}
            user={this.state.uid}
          />

          <main>
            {this.state.uid ? `${this.state.uid}` : "not logged in"}
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/search" render={() => <Search />} />
              <Route exact path="/watchlist" render={() => <Watchlist />} />
              <Route
                exact
                Path="/movie/:id"
                render={({ match }) => (
                  <SingleMovie
                    addToWatchlist={this.addToWatchlist}
                    match={match}
                  />
                )}
              />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}
