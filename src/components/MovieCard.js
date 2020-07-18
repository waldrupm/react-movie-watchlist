import React, { Component } from "react";
import PlusIcon from "../assets/icon-plus-square.svg";

export default class MovieCard extends Component {
  render() {
    const { id, title, vote_average, poster_path } = this.props.movie;
    const imageBase = "http://image.tmdb.org/t/p/";
    const imageSize = "w342";
    const posterImage = imageBase + imageSize + poster_path;
    return (
      <div className="w-4/5 md:w-1/3 lg:w-1/5 mx-2 flex justify-center items-center">
        <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative mb-2">
            <img
              className="w-full opacity-75 hover:opacity-100"
              src={posterImage}
              alt="Movie Poster"
            />
            <span className="absolute top-0 right-0 w-16 h-16 bg-gray-500 bg-opacity-50">
              <img
                src={PlusIcon}
                alt="add movie to watchlist"
                className="w-full h-full shadow-lg"
              />
            </span>
          </div>
          <div className="text-center pt-1 pb-5">
            <h2 className="text-gray-700 tracking-wide uppercase text-lg font-bold mx-2">
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
