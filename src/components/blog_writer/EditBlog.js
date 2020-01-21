import React, { Component } from "react";
import Axios from "axios";
import querystring from "querystring";
import { Editor } from "@tinymce/tinymce-react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import M from "materialize-css";

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
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

  componentDidMount() {
    var self = this;
    Axios.get(
      "https://sourcecode-blog.000webhostapp.com/api/blog/" + this.state.id
    )
      .then(function(response) {
        // handle success
        self.setState({
          title: response.data.data[0].title,
          content: response.data.data[0].content
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
      "https://sourcecode-blog.000webhostapp.com/api/blog/update",
      querystring.stringify({
        id: self.state.id,
        title: self.state.title,
        content: self.state.content.toString()
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

  handleDelete = e => {
    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/blog/delete",
      querystring.stringify({
        id: self.state.id
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
            err: "Can't delete blog. Try again"
          });
          M.toast({ html: self.state.err });
        }
      })
      .catch(function(error) {
        self.setState({
          err: "Can't delete blog. Try again"
        });
        M.toast({ html: self.state.err });
      })
      .finally(function() {});
  };

  render() {
    if (this.state.redirect || !this.state.isLoggedin) {
      return <Redirect to={"/sourcecode-blog/"} />;
    }
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
          <h1>Edit blog</h1>
          <div className="editor">
            <h3>&nbsp;&nbsp;Blog Title</h3>
            <input
              className="title-editor"
              type="text"
              placeholder="Write the title"
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            ></input>
            <h3>&nbsp;&nbsp;Blog Content</h3>
            <Editor
              apiKey="i7252if3limictidpuqd9e8tj6x234wgfm5unzlhfqx38cvg"
              initialValue={this.state.content}
              init={{
                selector: "textarea", // change this value according to your HTML
                skin: "oxide-dark",
                content_css: "dark",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor codesample emoticons",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                codesample_languages: [
                  { text: "HTML/XML", value: "markup" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "CSS", value: "css" },
                  { text: "PHP", value: "php" },
                  { text: "Ruby", value: "ruby" },
                  { text: "Python", value: "python" },
                  { text: "Java", value: "java" },
                  { text: "C", value: "c" },
                  { text: "C#", value: "csharp" },
                  { text: "C++", value: "cpp" }
                ],
                toolbar:
                  "undo redo | formatselect |image media link codesample| bold italic backcolor forecolor |emoticons| table|alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
              }}
              onChange={e => {
                this.setState({ content: e.target.getContent() });
              }}
            />
            <br />
            <button className="btn-submit" onClick={this.handleSubmit}>
              PUBLISH
            </button>

            <button className="btn-submit btn-red" onClick={this.handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBlog;
