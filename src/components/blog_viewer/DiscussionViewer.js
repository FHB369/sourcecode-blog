import React, { Component } from "react";
import ProfileIcon from "../icons/ProfileIcon";
import querystring from "querystring";
import Loader from "react-loader-spinner";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

class DiscussionViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: localStorage.getItem("blogAuthenticated"),
      id: props.match.params.id,
      title: "",
      content: "",
      username: "",
      date: "",
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisiked: false,
      currentUser: localStorage.getItem("username"),
      comments: [],
      comment: ""
    };
  }

  componentDidMount() {
    var self = this;
    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/blog/" + this.state.id
    )
      .then(function(response) {
        // handle success
        self.setState({
          title: response.data.data[0].title,
          content: response.data.data[0].content,
          username: response.data.data[0].username,
          date: response.data.data[0].date
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });

    this.getReactions();
    this.getComments();
  }

  getReactions = () => {
    var self = this;

    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/like/" +
        this.state.id +
        "/" +
        this.state.currentUser
    )
      .then(function(response) {
        // handle success
        self.setState({
          likes: response.data.likes,
          isLiked: response.data.user_reacted
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
      "https://sourcecode-blog.000webhostapp.com/api/dislike/" +
        this.state.id +
        "/" +
        this.state.currentUser
    )
      .then(function(response) {
        // handle success
        self.setState({
          dislikes: response.data.dislikes,
          isDisliked: response.data.user_reacted
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  getComments = () => {
    var self = this;

    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/comment/" + this.state.id
    )
      .then(function(response) {
        // handle success
        self.setState({
          comments: response.data.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  handleLike = e => {
    if (!this.state.isLoggedin) {
      return;
    }
    if (this.state.isLiked) {
      this.removeReaction();
      return;
    }

    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/like",
      querystring.stringify({
        blog_id: self.state.id,
        username: self.state.currentUser
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          self.getReactions();
        }
      })
      .catch(function(error) {})
      .finally(function() {});
  };

  handleDislike = e => {
    if (!this.state.isLoggedin) {
      return;
    }
    if (this.state.isDisliked) {
      this.removeReaction();
      return;
    }

    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/dislike",
      querystring.stringify({
        blog_id: self.state.id,
        username: self.state.currentUser
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          self.getReactions();
        }
      })
      .catch(function(error) {})
      .finally(function() {});
  };

  removeReaction = () => {
    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/reaction/remove",
      querystring.stringify({
        blog_id: self.state.id,
        username: self.state.currentUser
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          self.getReactions();
        }
      })
      .catch(function(error) {})
      .finally(function() {});
  };

  postComment = e => {
    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/comment/new",
      querystring.stringify({
        blog_id: self.state.id,
        comment: self.state.comment,
        username: self.state.currentUser
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          self.getComments();
          document.getElementById("comment-form").reset();
        }
      })
      .catch(function(error) {})
      .finally(function() {});
  };

  render() {
    if (this.state.content === "") {
      return (
        <Loader
          type="Puff"
          className="center"
          color="#00BFFF"
          height={100}
          width={100}
        />
      );
    }
    return (
      <div className="content">
        <div>
          <h1>{this.state.title}</h1>
        </div>
        <br></br>

        <div>{ReactHtmlParser(this.state.content)}</div>
        <script src="prism.js"></script>

        <br />
        <div className="blog-attr">
          <div className="attr">
            <div className="small-attr">Posted by</div>
            <div className="large-attr">
              <ProfileIcon />
              &nbsp;&nbsp;{this.state.username}
            </div>
          </div>
          <div className="attr">
            <div className="small-attr">Posted on</div>
            <div className="large-attr">{this.state.date}</div>
          </div>
          <div className="attr">
            <div className="large-attr">
              &nbsp;&nbsp;
              <div
                className={
                  this.state.isLiked ? "press-like-blue" : "press-like"
                }
                onClick={this.handleLike}
              >
                <ion-icon name="md-thumbs-up"></ion-icon>
                &nbsp;{this.state.likes}
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              <div
                className={
                  this.state.isDisliked ? "press-dislike-blue" : "press-dislike"
                }
                onClick={this.handleDislike}
              >
                <ion-icon name="md-thumbs-down"></ion-icon>
                &nbsp;{this.state.dislikes}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h2 className="blue-text">&nbsp;Comments</h2>
        {this.state.isLoggedin ? (
          <form onSubmit={this.postComment} id="comment-form">
            <input
              className="title-editor"
              type="text"
              ref="someName"
              placeholder="Write your comment..."
              onChange={e => {
                this.setState({ comment: e.target.value });
              }}
            ></input>
            <button
              className="btn-submit"
              hidden
              type="submit"
              onClick={this.handleSubmit}
            >
              PUBLISH
            </button>
          </form>
        ) : (
          <div />
        )}
        <br />
        <br />
        <div>
          {this.state.comments.map(comment => (
            <div className="comment-box" key={comment.id}>
              <div className="attr">
                <ProfileIcon />
                &nbsp;&nbsp;{comment.username}
                <p>{comment.date}</p>
              </div>
              {comment.comment}
            </div>
          ))}
        </div>
        <br />
      </div>
    );
  }
}

export default DiscussionViewer;
