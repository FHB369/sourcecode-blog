import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

import ProfileIconLarge from "../icons/ProfileIconLarge";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: localStorage.getItem("blogAuthenticated"),
      username: localStorage.getItem("username"),
      blogs: [],
      name: "",
      email: ""
    };
  }

  componentDidMount() {
    var self = this;
    Axios.get("https://sourcecode-blog.000webhostapp.com/api/blog/all")
      .then(function(response) {
        // handle success
        self.setState({
          blogs: response.data.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });

    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/user/" +
        this.state.username
    )
      .then(function(response) {
        // handle success
        self.setState({
          name: response.data.data[0].name,
          email: response.data.data[0].email
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  getCardSize = a => {
    if (a.length > 40) {
      return "large-box";
    } else {
      return "medium-box";
    }
  };

  handleSignOut = e => {
    localStorage.removeItem("blogAuthenticated");
    localStorage.removeItem("username");
  };

  render() {
    if (!this.state.isLoggedin) {
      return <Redirect to="/sourcecode-blog/" />;
    }
    return (
      <div>
        <div className="profile-container">
          <div className="profile-card">
            <ProfileIconLarge />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <div>
              <h1>{this.state.name}</h1>
              <p className="blue-text">@{this.state.username}</p>
              <p>{this.state.email}</p>
              <button
                className="btn-submit"
                type="submit"
                onClick={this.handleSignOut}
              >
                Sign&nbsp;Out
              </button>
            </div>
          </div>
          <br />
          <br />
          <br />
          <h1>Published Blogs</h1>
          <div className="profile-feed-container">
            {this.state.blogs.map(blog =>
              blog.username === this.state.username ? (
                <Link to={"/sourcecode-blog/blog/" + blog.id} key={blog.id}>
                  <div className={this.getCardSize(blog.title)}>
                    {blog.title}
                    <p className="small-text-feed">{blog.username}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
