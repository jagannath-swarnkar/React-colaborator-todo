import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { reactLocalStorage } from "reactjs-localstorage";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AllOutOutlinedIcon from "@material-ui/icons/AllOutOutlined";
// import axios from 'axios';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const itemList = useSelector(state => state.todos);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const handleProfile = () => {
    console.log("clicked!");
  };

  const handleLogout = () => {
    reactLocalStorage.remove("token");
    props.logout();
  };
  const doneItem = () => {
    var count = 0;
    var total = itemList;
    for (var i of total) {
      if (i.done === true || i.done === 1) {
        count++;
      }
    }
    return count;
  };
  const pendingItem = () => {
    var count = 0;
    var total = itemList;
    for (var i of total) {
      if (i.done === false || i.done === 0) {
        count++;
      }
    }
    return count;
  };

  const pending = pendingItem();
  const done = doneItem();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          props.listShouldbe("Total");
        }}
      >
        <IconButton aria-label="done-todos" color="inherit">
          <Badge badgeContent={done + pending} color="secondary">
            <AllOutOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Total</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.listShouldbe("Done");
        }}
      >
        <IconButton aria-label="done-todos" color="inherit">
          <Badge badgeContent={done} color="secondary">
            <CheckCircleSharpIcon />
          </Badge>
        </IconButton>
        <p>Done</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.listShouldbe("Pending");
        }}
      >
        <IconButton aria-label="pending-todos" color="inherit">
          <Badge badgeContent={pending} color="secondary">
            <CancelSharpIcon />
          </Badge>
        </IconButton>
        <p>Pending</p>
      </MenuItem>
      <MenuItem onClick={handleProfile}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            title="Home"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Todo-App
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip
              title="Total"
              onClick={() => {
                props.listShouldbe("Total");
              }}
            >
              <IconButton aria-label="Total-todos" color="inherit">
                <Badge badgeContent={done + pending} color="secondary">
                  <AllOutOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Done"
              onClick={() => {
                props.listShouldbe("Done");
              }}
            >
              <IconButton aria-label="done-todos" color="inherit">
                <Badge badgeContent={done} color="secondary">
                  <CheckCircleSharpIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Pending"
              onClick={() => {
                props.listShouldbe("Pending");
              }}
            >
              <IconButton aria-label="pending-todos" color="inherit">
                <Badge badgeContent={pending} color="secondary">
                  <CancelSharpIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              title="Profile"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
