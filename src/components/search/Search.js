import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Loader from "react-loader-spinner";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "x%$X%$A^X$%$$%A^$A%S$A%SA%S$AS%AS$^",
      results: []
    };
  }

  componentDidMount() {
    var self = this;
    Axios.get("https://sourcecode-blog.000webhostapp.com/api/blog/all")
      .then(function(response) {
        // handle success
        self.setState({
          results: response.data.data
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

  render() {
    if (this.state.results === []) {
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
      <div>
        <div>
          <input
            className="search-box"
            type="text"
            onChange={e => {
              this.setState({ query: e.target.value });
            }}
            placeholder="Search for blogs..."
          ></input>
        </div>
        <div className="search-results">
          <h4>Search Results</h4>
          {this.state.query !== "" ? (
            <div className="search-result-feed">
              {this.state.results.map(result =>
                result.title
                  .toLowerCase()
                  .search(this.state.query.toLowerCase()) !== -1 ||
                result.username
                  .toLowerCase()
                  .search(this.state.query.toLowerCase()) !== -1 ? (
                  <Link
                    to={"/sourcecode-blog/blog/" + result.id}
                    key={result.id}
                  >
                    <div className="search-result-box">
                      {result.title}
                      <p className="small-text">
                        {result.type} &nbsp;&nbsp;&nbsp; Posted by:{" "}
                        {result.username}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
