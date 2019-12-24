import React, { Component } from "react";
import { Link } from "react-router-dom";

class DiscussionsFeed extends Component {
  render() {
    return (
      <div className="feed-container">
        <Link to="/blog/1">
          <div className="large-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/2">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/3">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/4">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/5">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/6">
          <div className="large-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/7">
          <div className="large-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/8">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
        <Link to="/blog/9">
          <div className="medium-box">
            Blog Title
            <p className="small-text-feed">Lorem</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default DiscussionsFeed;
