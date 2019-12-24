import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            className="search-box"
            type="text"
            placeholder="Search for blogs..."
          ></input>
        </div>
        <div className="search-results">
          <h4>Search Results</h4>
          <div className="search-result-feed">
            <Link to="/blog/1">
              <div className="search-result-box">
                Blog Title
                <p className="small-text">Lorem</p>
              </div>
            </Link>
            <Link to="/blog/4">
              <div className="search-result-box">
                Blog Title
                <p className="small-text">Lorem</p>
              </div>
            </Link>
            <Link to="/blog/3">
              <div className="search-result-box">
                Blog Title
                <p className="small-text">Lorem</p>
              </div>
            </Link>
            <Link to="/blog/2">
              <div className="search-result-box">
                Blog Title
                <p className="small-text">Lorem</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
