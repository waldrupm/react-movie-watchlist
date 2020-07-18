import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./css-build.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Search from "./views/Search";
import Watchlist from "./views/Watchlist";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <main>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search />} />
            <Route exact path="/watchlist" render={() => <Watchlist />} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
