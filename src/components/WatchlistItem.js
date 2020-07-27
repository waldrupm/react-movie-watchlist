import React, { Component } from "react";
import appConfig from "../config";
import db from "../firebase.js";
import { Link } from "react-router-dom";

export default class WatchlistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apikey: appConfig.APIKey,
      movieDetails: {},
    };
  }

  async componentDidMount() {
    const movieDoc = await db
      .collection("watchlistMovies")
      .doc(this.props.docId)
      .get();
    const watchedStatus = movieDoc.data().watched;
    await fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=${this.state.apikey}&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => {
        json.watchedStatus = watchedStatus;
        this.setState({ movieDetails: json });
      });
  }

  toggleWatchedStatus = async (id) => {
    const movieDoc = await db.collection("watchlistMovies").doc(id).get();
    const currentStatus = movieDoc.data().watched;
    const newStatus = !currentStatus;
    await db
      .collection("watchlistMovies")
      .doc(id)
      .update({ watched: newStatus });
    const newMovieDetails = {
      ...this.state.movieDetails,
      watchedStatus: newStatus,
    };
    this.setState({ movieDetails: newMovieDetails });
  };

  render() {
    const { poster_path, title } = this.state.movieDetails;
    const imageBase = "http://image.tmdb.org/t/p/";
    const imageSize = "w342";
    const posterImage = imageBase + imageSize + poster_path;
    const id = this.props.id;
    return (
      <div className="w-4/5 md:w-1/3 lg:w-1/5 mx-2 flex justify-center items-center mb-3">
        <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative mb-2">
            <img
              className="w-full opacity-75 hover:opacity-100"
              src={posterImage}
              alt="Movie Poster"
            />
            {this.state.movieDetails.watchedStatus ? (
              <span className="absolute text-white font-bold w-full bg-gray-800 bg-opacity-50 text-center top-0 left-0">
                Watched
              </span>
            ) : null}
          </div>
          <div className="text-center pt-1 pb-5">
            <Link to={`/movie/${id}`}>
              <h2 className="text-gray-700 tracking-wide uppercase text-lg font-bold mx-2">
                {title}
              </h2>
            </Link>
            <div className="flex flex-wrap w-full justify-center">
              <button
                onClick={() => this.toggleWatchedStatus(this.props.docId)}
                className="bg-orange-500 rounded mt-3 p-1 text-white hover:bg-orange-600"
              >
                Mark as{" "}
                {this.state.movieDetails.watchedStatus
                  ? "Not Watched"
                  : "Watched"}
              </button>
              <button
                onClick={() => this.props.removeFromWatchlist(this.props.docId)}
                className="bg-red-600 rounded mt-1 p-1 text-white hover:bg-red-800"
              >
                Remove from Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
