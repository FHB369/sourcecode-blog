import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Loader from "react-loader-spinner";

class DiscussionsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.sort,
      blogs: []
    };
  }

  componentDidMount() {
    var self = this;
    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/blog/" +
        this.state.category +
        "/discussion"
    )
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
  }

  getCardSize = a => {
    if (a.length > 40) {
      return "large-box";
    } else {
      return "medium-box";
    }
  };

  render() {
    return (
      <div className="feed-container">
        {this.state.blogs.length === 0 ? (
          <Loader
            type="Puff"
            className="center-feed"
            color="#00BFFF"
            height={100}
            width={100}
          />
        ) : (
          <>
            {this.state.blogs.map(blog => (
              <Link to={"/sourcecode-blog/blog/" + blog.id} key={blog.id}>
                <div className={this.getCardSize(blog.title)}>
                  {blog.title}
                  <p className="small-text-feed">{blog.username}</p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default DiscussionsFeed;
