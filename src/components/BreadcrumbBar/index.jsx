import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbArrow } from "../Icon";

const BreadcrumbBar = ({ path = "" }) => {
  let pathnames;
  let currentUrl = "";

  if (path === "") {
    path = useLocation();
    pathnames = path.pathname
      .split("/")
      .filter((x) => x)
      .map((ỉtem) => {
        return { url: ỉtem, label: ỉtem };
      });
  } else {
    pathnames = path;
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/"
      style={{
        textTransform: "capitalize",
        color: "var(--light-gray-text-color)",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      Thư viện
    </Link>,
    ...pathnames.map((item, index) => {
      if (index === pathnames.length - 1) {
        return (
          <Typography
            key={index}
            sx={{
              textTransform: "capitalize",
              color: "var(--white-text-color)",
              fontSize: 14,
              fontWeight: 400,
              cursor: "default",
            }}
          >
            {item.label}
          </Typography>
        );
      } else {
        currentUrl += "/" + item.url;
        return (
          <Link
            underline="hover"
            key={index}
            color="inherit"
            href="/"
            to={currentUrl}
            style={{
              textTransform: "capitalize",
              color: "var(--light-gray-text-color)",
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            {item.label}
          </Link>
        );
      }
    }),
  ];

  return (
    <Breadcrumbs
      separator={<BreadcrumbArrow />}
      aria-label="breadcrumb"
      sx={{ marginTop: "3rem", marginBottom: "3rem" }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumbBar;
