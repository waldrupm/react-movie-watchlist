import React, { Component } from "react";
import appConfig from "../config";
import MovieCard from "../components/MovieCard";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      apikey: appConfig.APIKey,
      loading: true,
    };
  }

  async componentDidMount() {
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apikey}&language=en&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ movies: json.results, loading: false });
      });
  }

  render() {
    return (
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mt-8 mb-3 text-gray-800">
          Most Popular Now
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {this.state.movies.map((movie, idx) => {
            return (
              <MovieCard
                movie={movie}
                addToWatchlist={this.props.addToWatchlist}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
