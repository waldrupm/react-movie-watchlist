import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";

function App() {
  return (
    <div>
      <Router>
        <header>
          <Navbar />
        </header>

        <main className="container pt-5">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
