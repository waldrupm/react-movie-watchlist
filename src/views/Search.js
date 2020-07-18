import React, { Component } from "react";
import appConfig from "../config";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      apikey: appConfig.APIKey,
      movies: [],
    };
  }

  async componentDidMount() {
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apikey}&language=en&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ movies: json });
        console.log("this.state.movies", this.state.movies);
      });
  }

  render() {
    return <div>Movies</div>;
  }
}
