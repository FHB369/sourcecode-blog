import React from "react";
import Axios from "axios";
import querystring from "querystring";
import M from "materialize-css";
import { Redirect, Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    err: "",
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();

    var self = this;
    Axios.post(
      "https://sourcecode-blog.000webhostapp.com/api/login",
      querystring.stringify({
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
            err: "Invalid Credentials. Try again"
          });
          M.toast({ html: self.state.err });
        }
      })
      .catch(function(error) {
        self.setState({
          err: "Invalid Credentials. Try again"
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
          <h2>Sign In</h2>

          <form id="login-form">
            <input
              className="title-editor"
              type="text"
              placeholder="Email"
              required
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            ></input>
            <input
              className="title-editor"
              type="password"
              placeholder="Password"
              required
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            ></input>
            <button className="btn-submit" onClick={this.handleSubmit}>
              Sign In
            </button>
            &nbsp; &nbsp; &nbsp;
            <Link to="/signup">
              <small>Create an account</small>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
