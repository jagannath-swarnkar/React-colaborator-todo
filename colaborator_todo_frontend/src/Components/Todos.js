import React, { Component } from "react";
import TodoHeader from "./TodoHeader";
import AddTodo from "./AddTodo";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import TodoList from "./TodoList";
// import _ from 'underscore';
import { connect } from "react-redux";
import { todos } from "../actions";

export class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultList: "Total",
      redirect: false
    };
  }

  UNSAFE_componentWillMount() {
    axios
      .post("http://localhost:3030/getTodos", {
        token: reactLocalStorage.get("token"),
        project_id: this.props.match.params.id
      })
      .then(data => {
        console.log("data in willmount : ", data.data);

        this.setState({ itemList: data.data });
        this.props.Todos("GET_TODO", data.data);
      })
      .catch(err => {
        console.log("err in getting todos in will mount", err);
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

  deleteHandler = e => {
    var project_id = this.props.match.params.id;
    var Token = reactLocalStorage.get("token");
    axios
      .post("http://localhost:3030/delete/" + e, {
        id: e,
        token: Token,
        project_id: project_id
      })
      .then(result => {
        this.setState({ itemList: result.data });
      })
      .catch(err => {
        console.log("err in sending delete id to backend", err);
      });
  };

  listShouldbe = state => {
    this.setState({ defaultList: state });
  };
  logout = () => {
    reactLocalStorage.get("token", "");
    reactLocalStorage.clear();
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div>
        <div style={{ position: "sticky", top: 0, width: "100%" }}>
          <TodoHeader
            logout={this.logout}
            listShouldbe={this.listShouldbe}
            projectName={this.projectName}
          />
        </div>
        <AddTodo project_id={this.props.match.params.id} />
        <TodoList
          project_id={this.props.match.params.id}
          defaultList={this.state.defaultList}
          projectName={this.projectName}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Todos: (t, p) => dispatch(todos(t, p))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
