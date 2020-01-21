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
          <Link to="/">
            <div className="logo">
              <Logo />
            </div>
          </Link>

          {this.state.isAuthenticated ? (
            <Link to="/newBlog">
              <div className="newBlog">
                <CreateIcon />
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <div className="newBlog">
                <button className="btn-signin">Sign&nbsp;In</button>
              </div>
            </Link>
          )}

          <Link to="/search">
            <div className={this.state.isAuthenticated ? "search" : "profile"}>
              <SearchIcon />
            </div>
          </Link>

          {this.state.isAuthenticated ? (
            <Link to="/profile">
              <div className="profile">
                <ProfileIcon />
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="/blog/:id" component={DiscussionViewer} />

            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/newBlog">
              <NewBlog />
            </Route>

            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Register />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
