import React, { Component } from "react";
import "../App.scss";

import DiscussionsFeed from "./feeds/DiscussionsFeed";
import TutorialsFeed from "./feeds/TutorialsFeed";

import TrendingIcon from "./icons/TrendingIcon";
import RecentIcon from "./icons/RecentIcon";
import PopularIcon from "./icons/PopularIcon";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tgl: false,
      trending: true,
      popular: false,
      recent: false,
      sort: "trending",
      load: 1
    };
  }

  toggle = () => {
    this.state.tgl
      ? this.setState({
          tgl: false
        })
      : this.setState({
          tgl: true
        });
  };

  loadTrending = () => {
    this.setState({
      trending: true,
      popular: false,
      recent: false,
      sort: "trending",
      load: Math.random()
    });
  };

  loadPopular = () => {
    this.setState({
      trending: false,
      popular: true,
      recent: false,
      sort: "popular",
      load: Math.random()
    });
  };

  loadRecent = () => {
    this.setState({
      trending: false,
      popular: false,
      recent: true,
      sort: "recent",
      load: Math.random()
    });
  };

  render() {
    return (
      <div>
        <div
          className={
            this.state.tgl ? "discussion-inactive" : "discussion-active"
          }
          onClick={this.state.tgl ? this.toggle : () => {}}
        >
          DISCUSSIONS
        </div>
        {this.state.tgl ? <div /> : <div className="discussion-border"></div>}

        <div
          className={this.state.tgl ? "tutorial-active" : "tutorial-inactive"}
          onClick={this.state.tgl ? () => {} : this.toggle}
        >
          TUTORIALS
        </div>
        {this.state.tgl ? <div className="tutorial-border"></div> : <div />}

        <div className="feed" key={this.state.load}>
          {this.state.tgl ? (
            <TutorialsFeed sort={this.state.sort} />
          ) : (
            <DiscussionsFeed sort={this.state.sort} />
          )}
        </div>

        <div className="right-nav">
          <div
            className={this.state.trending ? "catagories active" : "catagories"}
            onClick={this.loadTrending}
          >
            <TrendingIcon />
          </div>
          <div
            className={this.state.popular ? "catagories active" : "catagories"}
            onClick={this.loadPopular}
          >
            <PopularIcon />
          </div>
          <div
            className={this.state.recent ? "catagories active" : "catagories"}
            onClick={this.loadRecent}
          >
            <RecentIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
