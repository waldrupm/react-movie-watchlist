import React, { Component } from "react";

export default class MovieCard extends Component {
  render() {
    const { id, title, vote_average, poster_path } = this.props.movie;
    const imageBase = "http://image.tmdb.org/t/p/";
    const imageSize = "w342";
    const posterImage = imageBase + imageSize + poster_path;
    return (
      <div className="w-4/5 mx-2 flex justify-center items-center">
        <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative mb-4">
            <img
              className="w-full opacity-75"
              src={posterImage}
              alt="Profile picture"
            />
          </div>
          <div className="text-center py-4">
            <h2 className="text-gray-700 tracking-wide uppercase text-lg font-bold mx-2">
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
