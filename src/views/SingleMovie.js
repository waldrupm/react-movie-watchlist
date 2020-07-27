import React, { Component } from "react";
import appConfig from "../config";

export default class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apikey: appConfig.APIKey,
      movieId: this.props.match.params.id,
      movieData: {},
    };
  }

  async componentDidMount() {
    await fetch(
      `https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=${this.state.apikey}&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => this.setState({ movieData: json }));
  }

  render() {
    const {
      overview,
      popularity,
      poster_path,
      release_date,
      tagline,
      title,
      vote_average,
    } = this.state.movieData;
    const imageBase = "http://image.tmdb.org/t/p/";
    const imageSize = "w342";
    const voteScore = Math.round(vote_average);
    const posterImage = imageBase + imageSize + poster_path;
    const borderColor = vote_average >= 5.0 ? "green" : "red";
    const id = this.state.movieId;
    return (
      <div className="container">
        <div className="w-4/5 rounded bg-white p-4 mx-auto text-center mb-6">
          <div className="flex w-full md:border-b-2 md:border-gray-800 md:pb-4">
            <div
              className={`w-16 h-16 border-2 border-${borderColor}-400 rounded-sm flex justify-center items-center mr-2`}
            >
              <span className="text-xl font-black">{voteScore}/10</span>
            </div>
            <div className="text-center w-full md:text-left md:pl-5">
              <h2 className="text-gray-800 text-2xl font-bold pb-0 md:text-3xl">
                {title}
              </h2>
              <h3 className="text-gray-500 text-base pt-0 md:text-lg">
                {tagline}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap md:text-left md:mt-5">
            <img
              className="w-full md:w-1/3 md:mx-auto md:shadow-lg"
              src={posterImage}
              alt="Movie Poster"
            />
            <div className="md:w-3/5 md:pl-4">
              <p className="text-gray-600 md:mx-auto md:text-sm pb-2 pt-3 md:pt-0">
                Released: {release_date}
              </p>
              <p className="text-gray-800 font-bold text-lg">Description</p>
              <p className="text-gray-600 pb-2 md:pb-3">{overview}</p>
              <p className="text-gray-800 font-bold text-lg">Popularity</p>
              <p className="text-gray-600 pb-2 md:pb-3">{popularity}</p>
              <button
                onClick={() => this.props.addToWatchlist(id)}
                className="bg-orange-500 rounded p-3 text-white font-bold hover:bg-orange-600"
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
