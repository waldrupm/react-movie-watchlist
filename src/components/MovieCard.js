import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../assets/icon-plus-square.svg";

export default class MovieCard extends Component {
  render() {
    const { id, title, vote_average, poster_path } = this.props.movie;
    const shortTitle = title.length >= 14 ? title.substr(0, 13) + "..." : title;
    const imageBase = "http://image.tmdb.org/t/p/";
    const imageSize = "w342";
    const posterImage = imageBase + imageSize + poster_path;
    return (
      <div className="w-4/5 md:w-1/3 lg:w-1/5 mx-2 flex justify-center items-center mb-3">
        <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative mb-2">
            <img
              className="w-full opacity-75 hover:opacity-100"
              src={posterImage}
              alt="Movie Poster"
            />
            <a onClick={() => this.props.addToWatchlist(id)} href="#">
              <span className="absolute top-0 right-0 w-16 h-16 bg-gray-500 bg-opacity-50">
                <img
                  src={PlusIcon}
                  alt="add movie to watchlist"
                  className="w-full h-full shadow-lg"
                />
              </span>
            </a>
          </div>
          <Link to={`/movie/${id}`}>
            <div className="text-center pt-1 pb-5">
              <h2 className="text-gray-700 tracking-wide uppercase text-lg font-bold mx-2">
                {shortTitle}
              </h2>
              <p className="text-base text-gray-500">
                {vote_average} out of 10
              </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
