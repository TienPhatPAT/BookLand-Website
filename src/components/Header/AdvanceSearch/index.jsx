import {
  Box,
  Checkbox,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import classes from "./AdvanceSearch.module.scss";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";
import * as Icon from "../../../components/Icon";

const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: "20rem",
      bgcolor: "rgba(18, 18, 18, .9)",
      backdropFilter: "blur(6px)",
      transition: "background-color 1s ease-in-out",
      "& > ul": { padding: 0 },
      "& > ul > li": {
        // borderRadius: "1rem",
        overflow: "hidden",
        padding: ".4rem",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, .05)",
        },
      },
      "& .MuiMenuItem-root": {
        // padding: 1.5,
        fontSize: "1.2rem",
        fontWeight: "400",
      },
      "& .Mui-selected": {
        backgroundColor: "rgba(255, 255, 255, .2) !important",
      },
      span: {
        fontSize: "1.3rem",
      },
    },
  },
};

const AdvanceSearch = () => {
  const [typeList, setTypeList] = useState([]);
  const [singleType, setSingleType] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [singleAuthor, setSingleAuthor] = useState([]);

  const handleChangeType = (event) => {
    const {
      target: { value },
    } = event;
    setSingleType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeAuthor = (event) => {
    const {
      target: { value },
    } = event;
    setSingleAuthor(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    fetchApi(`${getApiEnv()}/TheLoai`).then((data) => {
      setTypeList(data?.data.map((item) => item.ten));
    });
    fetchApi(`${getApiEnv()}author`).then((data) => {
      setAuthorList(data.map((item) => item.name));
    });
  }, []);

  const headingStyle = {
    fontSize: "1.3rem",
    fontWeight: "400",
    color: "rgba(var(--gray-text-color-rgb), .7)",
  };

  const selectStyle = {
    width: "100%",
    outline: "unset",
    // margin: "1rem 0",
    padding: "1rem",
    border: "1px solid rgba(var(--gray-text-color-rgb),.1)",
    borderRadius: "1rem",
    cursor: "pointer",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "&>div": {
      // padding: "1rem",
      minHeight: "28px !important",
    },
  };

  return (
    <div className={classes.searchBox}>
      <div className={classes.searchAdvanceHeading}>Tìm kiếm nâng cao:</div>
      <div className={classes.selectWrapper}>
        <InputLabel id="type" sx={headingStyle}>
          Thể loại
        </InputLabel>
        {/* {typeList.slice(0, 10).map((item, index) => { */}
        {/* return ( */}
        <Select
          labelId="type"
          id="type"
          name="type"
          form="search-form"
          multiple
          value={singleType}
          onChange={handleChangeType}
          className={classes.selectMultiple}
          // disableUnderline
          displayEmpty
          // input={<OutlinedInput label="Thể loại" />}
          MenuProps={MenuProps}
          sx={selectStyle}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return (
                <span className={classes.selectChipPlaceholder}>Nhấp để chọn các thể loại</span>
              );
            } else
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <span key={index} className={classes.selectChip}>
                      {value}
                    </span>
                  ))}
                </Box>
              );
          }}
          // renderValue={() => "123"}
        >
          {/* <em>Nhấp để chọn</em> */}
          {/* <MenuItem value={""} defaultValue>Chọn thể loại</MenuItem> */}
          {typeList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={singleType.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={classes.selectWrapper}>
        <InputLabel id="author" sx={headingStyle}>
          Tác giả
        </InputLabel>
        {/* {authorList.slice(0, 10).map((item, index) => { */}
        {/* return ( */}
        <Select
          labelId="author"
          id="author"
          name="author"
          form="search-form"
          multiple
          value={singleAuthor}
          onChange={handleChangeAuthor}
          className={classes.selectMultiple}
          // disableUnderline
          displayEmpty
          // input={<OutlinedInput label="Tác giả" />}
          MenuProps={MenuProps}
          sx={selectStyle}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return (
                <span className={classes.selectChipPlaceholder}>Nhấp để chọn các tác giả</span>
              );
            } else
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <span className={classes.selectChip} key={value}>
                      {value}
                    </span>
                  ))}
                </Box>
              );
          }}
        >
          {authorList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={singleAuthor.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </div>
      <Typography sx={headingStyle}>Năm xuất bản</Typography>
      <Typography sx={headingStyle}>Ngôn ngữ</Typography>
    </div>
  );
};

export default AdvanceSearch;
