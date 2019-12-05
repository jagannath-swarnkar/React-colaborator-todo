import React from "react";
import axios from "axios";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, TextareaAutosize } from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import { useDispatch } from "react-redux";
import { projects } from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2)
    }
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: red[800]
    }
  },
  header: {
    textAlign: "center"
  }
}));

export default function FontAwesome(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [description, setDescription] = React.useState("");
  // const [projects, setProjects] = React.useState([])
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const onChangeProject = e => {
    setItem(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = () => {
    var token = reactLocalStorage.get("token");
    axios
      .post("http://localhost:3030/project", {
        project: item,
        description: description,
        token: token
      })
      .then(data => {
        console.log("kallua :", data.data);
        dispatch(projects("GET_PROJECT", data.data));
        // props.projectHandler(data.data)
        setItem("");
        setDescription("");
        setOpen(false);
      })
      .catch(err => {
        console.log("err in sending project detail to backend", err);
      });
  };

  return (
    <div className={classes.root}>
      <Icon
        onClick={handleClickOpen}
        className={clsx(classes.iconHover, "fa fa-plus-circle")}
        color="error"
        style={{ fontSize: 60 }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{ background: "blue", color: "white" }}
          id="form-dialog-title"
          className={classes.header}
        >
          Create new project
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Project Name"
            fullWidth
            value={item}
            onChange={onChangeProject}
          />
          <TextareaAutosize
            id="text_detail"
            label="Project description"
            placeholder="Project description"
            rowsMax={6}
            rows={6}
            style={{
              width: "98%",
              border: "2px solid black",
              margin: "10px 0px 10px 0px"
            }}
            fullWidth
            value={description}
            onChange={onChangeDescription}
          />
        </DialogContent>
        <Button
          style={{ background: "red", color: "white" }}
          fullWidth
          onClick={onSubmitHandler}
        >
          Submit
        </Button>
      </Dialog>
    </div>
  );
}
