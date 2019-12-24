import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussion: true,
      tutorial: false
    };
  }

  setDiscussion = () => {
    this.setState({
      discussion: true,
      tutorial: false
    });
  };

  setTutorial = () => {
    this.setState({
      discussion: false,
      tutorial: true
    });
  };

  render() {
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
            ></input>

            {this.state.discussion ? (
              <div>
                <h3>&nbsp;&nbsp;Problem Link</h3>

                <input
                  className="title-editor"
                  type="text"
                  placeholder="Link of the discussed problem"
                ></input>
              </div>
            ) : (
              <div />
            )}
            <h3>&nbsp;&nbsp;Blog Content</h3>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Write your blog</p>"
              onInit={editor => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
            <br />

            {this.state.tutorial ? (
              <div>
                <h3>&nbsp;&nbsp;References & Further Readings</h3>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p></p>"
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            <button className="btn-submit">PUBLISH</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBlog;
