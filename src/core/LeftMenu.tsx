import React, { useState, useEffect, useRef } from "react";
import { Menu, Dashboard, Create,PersonSearch } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";

const useStyles = makeStyles({
  leftMenuContainer: {
    position: "relative",
  },
  leftMenu: {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    boxShadow: "4px 0px 7px rgba(0, 0, 0, 0.2)",
    transition: "width 0.3s ease",
    zIndex: 9999,
  },
  menuButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "black",
  },
  listItem: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "5px",
  },
  linkStyle:{
    textDecoration: "none",
  }
});

const LeftMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenuOnClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLElement)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={classes.leftMenuContainer}>
      <div
        ref={menuRef}
        className={classes.leftMenu}
        style={{ width: isMenuOpen ? "200px" : "40px" }}
      >
        <div>
          <IconButton onClick={toggleMenu} className={classes.menuButton}>
            <Menu />
          </IconButton>
        </div>
        <div>
          <a className={classes.linkStyle} href="/">
            <div className={classes.listItem}>
              <IconButton>
                <Dashboard className={classes.icon} />
              </IconButton>
              {isMenuOpen && <span>Dashboard</span>}
            </div>
          </a>
          <a className={classes.linkStyle} href="/create-job">
            <div className={classes.listItem}>
              <IconButton>
                <Create className={classes.icon} />
              </IconButton>
              {isMenuOpen && <span>Create Job</span>}
            </div>
          </a>
           <a className={classes.linkStyle} href="/search">
            <div className={classes.listItem}>
              <IconButton>
                <PersonSearch className={classes.icon} />
              </IconButton>
              {isMenuOpen && <span>Create Job</span>}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
