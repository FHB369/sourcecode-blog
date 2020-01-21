import React, { Component } from "react";
import Axios from "axios";
import querystring from "querystring";
import { Editor } from "@tinymce/tinymce-react";
import { Redirect } from "react-router-dom";
import M from "materialize-css";

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: localStorage.getItem("blogAuthenticated"),
      discussion: true,
      tutorial: false,
      title: "",
      content: "",
      type: "DISCUSSION",
      username: localStorage.getItem("username"),
      err: "",
      redirect: false
    };
  }

  setDiscussion = () => {
    this.setState({
      discussion: true,
      tutorial: false,
      type: "DISCUSSION"
    });
  };

  setTutorial = () => {
    this.setState({
      discussion: false,
      tutorial: true,
      type: "TUTORIAL"
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/blog/new",
      querystring.stringify({
        title: self.state.title,
        content: self.state.content.toString(),
        username: self.state.username,
        type: self.state.type
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          self.setState({
            err: response.data.message,
            redirect: true
          });

          window.location.reload();
        } else {
          self.setState({
            err: "Can't add blog. Try again"
          });
          M.toast({ html: self.state.err });
        }
      })
      .catch(function(error) {
        self.setState({
          err: "Can't add blog. Try again"
        });
        M.toast({ html: self.state.err });
      })
      .finally(function() {});
  };

  render() {
    if (this.state.redirect || !this.state.isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <div className="content">
        <div>
          <h1>Write a new blog</h1>
          <div
            className={
              this.state.discussion
                ? "discussion-catagory active low-bar"
                : "discussion-catagory"
            }
            onClick={this.setDiscussion}
          >
            Discussion
          </div>
          <div
            className={
              this.state.tutorial
                ? "tutorial-catagory active low-bar"
                : "tutorial-catagory"
            }
            onClick={this.setTutorial}
          >
            Tutorial
          </div>

          <div className="editor">
            <h3>&nbsp;&nbsp;Blog Title</h3>

            <input
              className="title-editor"
              type="text"
              placeholder="Write the title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            ></input>

            <h3>&nbsp;&nbsp;Blog Content</h3>
            <Editor
              apiKey="i7252if3limictidpuqd9e8tj6x234wgfm5unzlhfqx38cvg"
              initialValue="<p>Write your blog here</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                toolbar:
                  "undo redo | formatselect |image media link| bold italic backcolor forecolor |emoticons| table|alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
              }}
              onChange={e => {
                this.setState({ content: e.target.getContent() });
              }}
            />
            <br />

            <button className="btn-submit" onClick={this.handleSubmit}>
              PUBLISH
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBlog;
