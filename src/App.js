import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home";

import Search from "./components/search/Search";
import Profile from "./components/profile/Profile";
import NewBlog from "./components/blog_writer/NewBlog";
import DiscussionViewer from "./components/blog_viewer/DiscussionViewer";

import CreateIcon from "./components/icons/CreateIcon";
import Logo from "./components/icons/Logo";
import ProfileIcon from "./components/icons/ProfileIcon";
import SearchIcon from "./components/icons/SearchIcon";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <div className="logo">
            <Logo />
          </div>
        </Link>

        <Link to="/newBlog">
          <div className="newBlog">
            <CreateIcon />
          </div>
        </Link>

        <Link to="/search">
          <div className="search">
            <SearchIcon />
          </div>
        </Link>

        <Link to="/profile">
          <div className="profile">
            <ProfileIcon />
          </div>
        </Link>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/newBlog">
            <NewBlog />
          </Route>
          <Route path="/blog/:id">
            <DiscussionViewer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
