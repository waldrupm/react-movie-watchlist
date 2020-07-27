import React, { Component } from "react";
import db from "../firebase.js";
import WatchlistItem from "../components/WatchlistItem";

export default class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      watchlistDocs: [],
    };
  }

  componentDidMount() {
    if (this.props.user) {
      let watchlistDocs = [];
      db.collection("watchlistMovies")
        .where("uid", "==", this.props.user)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            watchlistDocs.push(doc);
          });
          this.setState({ watchlistDocs: watchlistDocs });
        });
    }
  }

  removeFromWatchlist = async (id) => {
    // Delete from Firebase
    await db.collection("watchlistMovies").doc(id).delete();
    // Delete from Watchlist state
    const newWatchlistDocs = this.state.watchlistDocs.filter(
      (doc) => doc.id !== id
    );
    // Refresh state
    this.setState({ watchlistDocs: newWatchlistDocs });
  };

  render() {
    return (
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mt-8 mb-3 text-gray-800">
          Your Watchlist
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {this.state.watchlistDocs.map((doc, idx) => {
            return (
              <WatchlistItem
                docId={doc.id}
                id={doc.data().movieId}
                removeFromWatchlist={this.removeFromWatchlist}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
