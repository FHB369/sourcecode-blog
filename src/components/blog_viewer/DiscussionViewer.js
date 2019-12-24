import React, { Component } from "react";
import ProfileIcon from "../icons/ProfileIcon";
import AppreciateIcon from "../icons/AppreciateIcon";

class DiscussionViewer extends Component {
  render() {
    return (
      <div className="content">
        <div>
          <h1>Blog Title</h1>
        </div>
        <br></br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <h2>Heading 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <h2>Heading 2</h2>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>four</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>

        <br />
        <div className="blog-attr">
          <div className="attr">
            <div className="small-attr">Posted by</div>
            <div className="large-attr">
              <ProfileIcon />
              &nbsp;&nbsp;Lorem Ipsum
            </div>
          </div>
          <div className="attr">
            <div className="small-attr">Posted on</div>
            <div className="large-attr">21 Dec 2019</div>
          </div>
          <div className="attr">
            <div className="large-attr">
              <AppreciateIcon />
              &nbsp;&nbsp;30
            </div>
          </div>
        </div>
        <br />
        <br />
        <h2 className="blue-text">&nbsp;Comments</h2>
        <input
          className="title-editor"
          type="text"
          placeholder="Write your comment..."
        ></input>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default DiscussionViewer;
