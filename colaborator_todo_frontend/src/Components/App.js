import React, { Component } from "react";
import Header from "./Header";
import Projects from "./Projects";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import Addicon from "./Addicon";
import axios from "axios";
import { connect } from "react-redux";
import { projects } from "../actions";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Projects: [],
      redirect: false
    };
  }

  UNSAFE_componentWillMount() {
    var token = reactLocalStorage.get("token");

    axios
      .post("http://localhost:3030/getProject", {
        token: token
      })
      .then(data => {
        this.setState({ Projects: data.data });
        this.props.projects("GET_PROJECT", data.data);
      })
      .catch(err => {
        console.log({
          status: 404,
          message: "err in fatching data from db",
          Error: err
        });
      });
  }

  componentDidUpdate() {
    var Token = reactLocalStorage.get("token");
    axios
      .get("http://localhost:3030/checkToken", { params: { token: Token } })
      .then(result => {
        if (result.data === "tokenExpires") {
          reactLocalStorage.get("token", "");
          reactLocalStorage.clear();
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.log("this is err in componentWillUpdate", err);
      });
  }

  logout = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (!reactLocalStorage.get("token")) {
      return <Redirect to={"/login"} />;
    }
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <React.Fragment>
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          <Projects logout={this.logout} />
        </div>
        <div
          style={{
            right: 10,
            margin: 30,
            marginRight: 60,
            position: "fixed",
            bottom: 5
          }}
        >
          <Addicon />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    projects: (t, p) => dispatch(projects(t, p))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
