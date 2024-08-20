import { Badge, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import classes from "./SidebarITem.module.scss";
import clsx from "clsx";
import React, { useState } from "react";

const SidebarItem = ({ activeLink = [], icon, label, to, badge = 0 }) => {
  const style = { "--sidebar-text-color": "var(--white-text-color)" };
  const [active, setActive] = useState(false);

  const isUrlContainsAnyPath = (paths) => {
    const currentUrl = window.location.pathname;
    return paths.some((path) => currentUrl.includes(path));
  };

  return (
    <NavLink
      to={to}
      disabled={active}
      className={({ isActive }) => {
        if (isActive) {
          setActive(true);
        } else {
          setActive(false);
        }
        if (isUrlContainsAnyPath(activeLink)) setActive(true);
        return clsx(classes.sidebarItem, {
          [classes.sidebarItem_active]: isActive || isUrlContainsAnyPath(activeLink),
        });
      }}
    >
      <Button className={classes.sidebarContent}>
        <div className={classes.icon}>
          {active &&
            React.cloneElement(icon, {
              color: "var(--active-sidebar-text-color)",
            })}
          {!active && icon}
        </div>
        {badge ? (
          <Badge badgeContent={badge} color="secondary">
            <span className={classes.label}>{label}</span>
          </Badge>
        ) : (
          <span className={classes.label}>{label}</span>
        )}
      </Button>
    </NavLink>
  );
};

export default SidebarItem;
