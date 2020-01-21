import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home";

import Search from "./components/search/Search";
import Profile from "./components/profile/Profile";
import NewBlog from "./components/blog_writer/NewBlog";
import DiscussionViewer from "./components/blog_viewer/DiscussionViewer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import CreateIcon from "./components/icons/CreateIcon";
import Logo from "./components/icons/Logo";
import ProfileIcon from "./components/icons/ProfileIcon";
import SearchIcon from "./components/icons/SearchIcon";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("blogAuthenticated") === "true") {
      this.setState({
        isAuthenticated: true
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/sourcecode-blog">
            <div className="logo">
              <Logo />
            </div>
          </Link>

          {this.state.isAuthenticated ? (
            <Link to="/sourcecode-blog/newBlog">
              <div className="newBlog">
                <CreateIcon />
              </div>
            </Link>
          ) : (
            <Link to="/sourcecode-blog/signin">
              <div className="newBlog">
                <button className="btn-signin">Sign&nbsp;In</button>
              </div>
            </Link>
          )}

          <Link to="/sourcecode-blog/search">
            <div className={this.state.isAuthenticated ? "search" : "profile"}>
              <SearchIcon />
            </div>
          </Link>

          {this.state.isAuthenticated ? (
            <Link to="/sourcecode-blog/profile">
              <div className="profile">
                <ProfileIcon />
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Switch>
            <Route exact path="/sourcecode-blog/">
              <Home />
            </Route>
            <Route exact path="/sourcecode-blog/search">
              <Search />
            </Route>
            <Route
              path="/sourcecode-blog/blog/:id"
              component={DiscussionViewer}
            />

            <Route exact path="/sourcecode-blog/profile">
              <Profile />
            </Route>
            <Route exact path="/sourcecode-blog/newBlog">
              <NewBlog />
            </Route>

            <Route exact path="/sourcecode-blog/signin">
              <Login />
            </Route>
            <Route exact path="/sourcecode-blog/signup">
              <Register />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
