import React, { Component } from "react";
import appConfig from "../config";
import MovieCard from "../components/MovieCard";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      apikey: appConfig.APIKey,
      results: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = encodeURIComponent(e.target.movieSearch.value);
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.state.apikey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    )
      .then((res) => res.json())
      .then((json) => this.setState({ results: json.results }));
  };

  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full max-w-md mx-auto mt-4 mb-6 text-center">
          <h2 className="text-3xl font-bold mt-8 mb-3 text-gray-800">
            Search Movies
          </h2>
          <form
            onSubmit={this.handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
          >
            <div className="mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="movieSearch"
                placeholder="Movie Name"
              />
              <div className="flex items-center justify-center">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded w-full py-2 mt-5 shadow"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center">
            {this.state.results.map((movie, idx) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  addToWatchlist={this.props.addToWatchlist}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
