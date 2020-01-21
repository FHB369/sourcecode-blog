import React from "react";
import Axios from "axios";
import querystring from "querystring";
import M from "materialize-css";
import { Redirect, Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    err: "",
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/register",
      querystring.stringify({
        username: self.state.username,
        name: self.state.name,
        email: self.state.email,
        password: self.state.password
      })
    )
      .then(function(response) {
        if (response.status === 200) {
          localStorage.setItem("blogAuthenticated", "true");
          localStorage.setItem("username", response.data.username);

          self.setState({
            err: response.data.message,
            redirect: true
          });

          window.location.reload();
        } else {
          self.setState({
            err: "User already exists"
          });
          M.toast({ html: self.state.err });
        }
      })
      .catch(function(error) {
        self.setState({
          err: "User already exists"
        });
        M.toast({ html: self.state.err });
      })
      .finally(function() {});
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Sign Up</h2>
          <input
            className="title-editor"
            type="text"
            placeholder="Name"
            required
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          ></input>
          <input
            className="title-editor"
            type="text"
            placeholder="Username"
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          ></input>
          <input
            className="title-editor"
            type="text"
            placeholder="Email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          ></input>
          <input
            className="title-editor"
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          ></input>
          <button className="btn-submit" onClick={this.handleSubmit}>
            Sign Up
          </button>
          &nbsp; &nbsp; &nbsp;
          <Link to="/signin">
            <small>Already have an account? Sign In</small>
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;
