import React, { Component } from "react";
import { Typography, Button, TextField, ListItem } from "@material-ui/core";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { todos } from "../actions";
import { connect } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import FormData from "form-data";
// import CommentIcon from '@material-ui/icons/Comment';

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      files: null,
      urls: []
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({ note: this.props.todoNote });
    Axios.get("http://localhost:3030/getFiles/" + this.props.todoId)
      .then(result => {
        this.setState({ urls: result.data });
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  noteHandler = () => {
    this.props.closeNote();
    Axios.post("http://localhost:3030/note/" + this.props.todoId, {
      note: this.state.note,
      project_id: this.props.project_id,
      token: reactLocalStorage.get("token")
    })
      .then(result => {
        console.log(result.data);
        this.props.Todos("GET_TODO", result.data);
      })
      .catch(err => {
        console.log("err in sending note to backend", err);
      });
  };
  handleChange(files) {
    console.log(files[0]);
    this.setState({
      files: files[0]
    });
  }
  fileSubmit = () => {
    console.log("file................");

    const filedata = new FormData();
    filedata.append("image", this.state.files);
    Axios.post(
      "http://localhost:3030/file-upload/" + this.props.todoId,
      filedata
    )
      .then(data => {
        this.setState({ urls: data.data });
        console.log("file sent to backend", data.data);
      })
      .catch(err => {
        console.log("err in sending file to backend-", err);
      });
  };

  urlFile = () => {
    if (this.state.urls.length > 0) {
      return (
        <div>
          {this.state.urls.map((url, i) => {
            console.log(url.file);
            return (
              <ListItem
                key={i}
                style={{ background: "skyblue", margin: "5px" }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={url.file}
                >
                  File {i + 1}
                </a>
              </ListItem>
            );
          })}
        </div>
      );
    } else {
      return "";
    }
  };

  render() {
    if (this.props.editNote) {
      return (
        <div>
          <TextField
            autoFocus
            id="outlined-multiline-flexible"
            placeholder="Add a Description here..."
            multiline
            fullWidth
            value={this.state.note}
            onChange={e => {
              this.setState({ note: e.target.value });
            }}
            margin="normal"
            variant="outlined"
          />
          <div onClick={this.noteHandler}>
            <Button
              style={{
                background: "red",
                color: "white"
              }}
            >
              Submit
            </Button>
          </div>
          <div style={{ marginLeft: "-40px", display: "flex" }}>
            <div>
              <AttachFileIcon />
            </div>
            <div style={{ fontWeight: "bold" }}>Attatchment</div>
          </div>
          <div>{this.urlFile()}</div>
          <div
            style={{ marginTop: "20px", marginBottom: "10px" }}
            title="Click here to add a file"
          >
            <DropzoneArea onChange={this.handleChange.bind(this)} />
            <div onClick={this.fileSubmit}>
              <Button
                style={{
                  background: "red",
                  color: "white",
                  marginTop: "25px"
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            onClick={() => {
              this.props.openNote();
            }}
          >
            <Typography
              title="Click here to add a Description..."
              style={{ cursor: "pointer", minHeight: "100px" }}
            >
              {this.state.note || "Click here to add a Description..."}
            </Typography>
          </div>

          <div style={{ marginLeft: "-40px", display: "flex" }}>
            <div>
              <AttachFileIcon />
            </div>
            <div style={{ fontWeight: "bold" }}>Attatchment</div>
          </div>

          <div
            style={{ marginTop: "20px", marginBottom: "10px" }}
            title="Click here to add a file"
          >
            <DropzoneArea onChange={this.handleChange.bind(this)} />
            <div onClick={this.fileSubmit}>
              <Button
                style={{
                  background: "red",
                  color: "white",
                  marginTop: "25px"
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <div>{this.urlFile()}</div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Todos: (t, p) => dispatch(todos(t, p))
  };
};

export default connect(null, mapDispatchToProps)(Notes);
