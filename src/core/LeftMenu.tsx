import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, Dashboard, Create } from "@mui/icons-material";
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
    transition: "width 0.3s ease",  // Add transition property
    zIndex: 9999
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
});

const LeftMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const classes = useStyles();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenuOnClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
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
      <div ref={menuRef} className={classes.leftMenu} style={{ width: isMenuOpen ? "200px" : "40px" }}>
        <div>
          <IconButton onClick={toggleMenu} className={classes.menuButton}>
            <Menu />
          </IconButton>
        </div>
        <div>
          <div className={classes.listItem}>
            <IconButton>
              <Dashboard className={classes.icon} />
            </IconButton>
            {isMenuOpen && <span>Dashboard</span>}
          </div>
          <div className={classes.listItem}>
            <IconButton>
              <Create className={classes.icon} />
            </IconButton>
            {isMenuOpen && <span>Create Job</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;