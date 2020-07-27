import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./css-build.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Search from "./views/Search";
import Watchlist from "./views/Watchlist";
import SingleMovie from "./views/SingleMovie";
import firebase from "firebase";
import { firebaseApp } from "./firebase";
import db from "./firebase.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      message: "",
      redirect: null,
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

  addToWatchlist = (id) => {
    if (this.state.uid) {
      db.collection("watchlistMovies")
        .add({
          movieId: id,
          uid: this.state.uid,
          watched: false,
        })
        .then(() => {
          // TODO figure out redirects after adding to watchlist, the catch and else below also won't work.
          this.setState({ redirect: "/watchlist" });
        })
        .catch((error) => {
          console.log("error", error);
          return <Redirect to="/" />;
        });
    } else {
      this.setState({ redirect: "/" });
    }
  };

  toggleWatchedStatus = (id) => {};

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        {/* change navbar based on login status */}
        <Navbar
          authenticate={this.authenticate}
          logout={this.logout}
          user={this.state.uid}
        />

        <main>
          <Switch>
            <Route exact path="/">
              <Home addToWatchlist={this.addToWatchlist} />
            </Route>
            <Route exact path="/search">
              <Search addToWatchlist={this.addToWatchlist} />
            </Route>
            <Route exact path="/watchlist">
              <Watchlist user={this.state.uid} />
            </Route>
            <Route
              exact
              path="/movie/:id"
              render={({ match }) => (
                <SingleMovie
                  addToWatchlist={this.addToWatchlist}
                  match={match}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
