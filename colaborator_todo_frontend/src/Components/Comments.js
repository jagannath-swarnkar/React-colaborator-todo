import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Dialog, Card } from "@material-ui/core";
import Axios from "axios";
// import { fontSize } from '@material-ui/system';

export class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      comments: [],
      reply: null,
      subComment: "sub",
      subCommentList: [],
      comment_id: ""
    };
  }
  UNSAFE_componentWillMount() {
    Axios.get("http://localhost:3030/comment" + this.props.todoId)
      .then(data => {
        console.log("comment get from backed", data.data);
        this.setState({ comments: data.data });
      })
      .catch(err => {
        console.log("err in sending comment into backend", err);
      });

    Axios.get("http://localhost:3030/getSubComment" + this.props.todoId)
      .then(data => {
        console.log(data.data);
        this.setState({ subCommentList: data.data });
      })
      .catch(err => {
        console.log("err in getting subcomments", err);
      });
  }
  commentHandler = e => {
    Axios.post("http://localhost:3030/comment" + this.props.todoId, {
      comment: this.state.item
    })
      .then(data => {
        console.log("comment sent to backed", data.data);
        this.setState({ comments: data.data, item: "" });
      })
      .catch(err => {
        console.log("err in sending comment into backend", err);
      });
  };
  submitReply = () => {
    console.log(this.state.comment_id);
    Axios.post(
      "http://localhost:3030/subComment/" +
        this.props.todoId +
        "/" +
        this.state.comment_id,
      {
        subComment: this.state.subComment
      }
    )
      .then(data => {
        // console.log('comment sent to backed',data.data)
        this.setState(
          { subCommentList: data.data, subComment: "", reply: false },
          () => {
            console.log(this.state.subCommentList);
          }
        );
      })
      .catch(err => {
        console.log("err in sending comment into backend", err);
      });
  };

  render() {
    let comments = this.state.comments.map((e, i) => {
      return (
        <div>
          <Card
            style={{
              background: "lightgreen",
              padding: "5px",
              marginTop: "15px"
            }}
          >
            <li style={{ listStyleType: "none" }} key={i}>
              {e.comment}
            </li>
            <span
              style={{
                margin: "5px",
                fontSize: "12px",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              {this.state.subCommentList
                .filter(a => {
                  return a.comment_id === e.comment_id;
                })
                .map((p, q) => {
                  console.log(p);
                  return (
                    <li style={{ listStyleType: "none" }} key={q}>
                      {p.sub_comment},{" "}
                    </li>
                  );
                })}
            </span>
          </Card>
          <span
            onClick={() => {
              this.setState({ reply: true, comment_id: e.comment_id });
            }}
            style={{
              marginLeft: "20px",
              margin: "5px",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            reply
          </span>
          <span>-</span>
          <span
            style={{
              margin: "5px",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            edit
          </span>
          <span>-</span>
          <span
            style={{
              margin: "5px",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            delete
          </span>
        </div>
      );
    });
    return (
      <div>
        <div style={{ display: "flex" }}>
          <TextField
            onChange={e => {
              this.setState({ item: e.target.value });
            }}
            id="outlined-basic"
            label="Add comment here..."
            margin="normal"
            variant="outlined"
            value={this.state.item}
          />

          <div onClick={this.commentHandler} style={{ marginTop: "16px" }}>
            <Button
              style={{
                background: "red",
                color: "white",
                margin: "10px"
              }}
            >
              Submit
            </Button>
          </div>
        </div>

        <div>{comments}</div>
        <div>
          <Dialog
            open={this.state.reply}
            onClose={() => {
              this.setState({ reply: false });
            }}
          >
            <div>
              <Card
                style={{
                  border: "2px solid black",
                  width: "400px",
                  height: "auto"
                }}
              >
                <input
                  onChange={e => {
                    this.setState({ subComment: e.target.value });
                  }}
                  style={{
                    border: "0px solid black",
                    padding: "8px",
                    width: "100%",
                    fontSize: "17px",
                    height: "20px"
                  }}
                  type="text"
                  value={this.state.subComment}
                  placeholder="comment here..."
                />

                <div onClick={this.submitReply}>
                  <Card
                    style={{
                      background: "black",
                      textAlign: "center",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "20px"
                    }}
                  >
                    {"Submit"}
                  </Card>
                </div>
              </Card>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Comments;
