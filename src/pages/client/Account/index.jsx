import clsx from "clsx";
import { Container, Typography } from "@mui/material";
import classes from "./Account.module.scss";
import "./Account.scss";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Information from "./Information";
import Security from "./Security";
import LinkedAccounts from "./Link";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Account = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabItemStyle = {
    color: "#ffffff !important",

    "&.Mui-selected": {
      color: "var(--primary-color) !important",
    },
  };

  return (
    <>
      <Container>
        <div className={clsx(classes.left, "w-100")}>
          <div>
            <h1>Quản lí thông tin</h1>
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                TabIndicatorProps={{
                  sx: { backgroundColor: "#a259ff" },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  sx={tabItemStyle}
                  className="tab-pane-item"
                  label="Thông tin cá nhân"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={tabItemStyle}
                  className="tab-pane-item"
                  label="Tài khoản và bảo mật"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={tabItemStyle}
                  className="tab-pane-item"
                  label="Tài khoản liên kết"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Information />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Security />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <LinkedAccounts />
            </CustomTabPanel>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default Account;
