import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { fetchApi, getApiEnv } from "../../../utils/api";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GridBookList from "../../../components/GridBookList";

const TypeDetail = () => {
  const [bookList, setBookList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  // const [fullBookList, setFullBookList] = useState([]);
  const [currentType, setCurrentType] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

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
        {value === index && children}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event) => {
    navigate("/type/" + event.target.value, { replace: true });
    if (event.target.value === "tat-ca") {
      setCurrentType({ name: "Tất cả", id: "tat-ca" });
    } else {
      setCurrentType(typeList.filter((item) => item._id === event.target.value)[0]);
    }
    // if
    fetchApi(getApiEnv() + "/Sach").then((data) => {
      if (event.target.value !== "tat-ca") {
        const newData = data?.data.filter((book) =>
          book.theloaisach.some((t) => t._id === event.target.value)
        );
        setBookList(newData);
      } else {
        setBookList(data);
      }
      // setFullBookList(newData);
    });
  };

  useEffect(() => {
    fetchApi(getApiEnv() + "/Sach").then((data) => {
      if (id !== "tat-ca") {
        const newData = data?.data.filter((book) => book.theloaisach.some((t) => t._id === id));
        setBookList(newData);
      } else {
        setBookList(data?.data);
      }
      // setFullBookList(newData);
    });

    fetchApi(getApiEnv() + "/TheLoai").then((data) => {
      if (id === "tat-ca") {
        setCurrentType({ name: "Tất cả", id: "tat-ca" });
      } else {
        setCurrentType(data?.data.filter((item) => item._id === id)[0]);
      }
      setTypeList(data?.data);
    });
  }, []);

  return (
    <Container
      sx={{
        marginBottom: "12rem",
        maxWidth: "calc(100% - 6rem) !important",
        padding: "0 !important",
        margin: "0 0 12rem auto !important",
      }}
    >
      <BreadcrumbBar
        path={[
          { label: "Chủ đề & Thể loại", url: "type" },
          { label: currentType.ten || "Thể loại", url: "" },
        ]}
      ></BreadcrumbBar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",
          marginBottom: "2rem",
          gap: "2rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "3.2rem",
            fontWeight: "700",
            textTransform: "none",
          }}
        >
          Sách theo thể loại
        </Typography>
        {typeList.length > 0 && (
          <FormControl sx={{ m: 1, minWidth: 120, margin: "0" }}>
            <Select
              fullWidth={true}
              value={currentType._id}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              disableUnderline={true}
              variant="standard"
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: "20rem",
                    bgcolor: "rgba(18, 18, 18, .9)",
                    backdropFilter: "blur(6px)",
                    transition: "background-color 1s ease-in-out",
                    "& > ul": { padding: 0 },
                    "& > ul > li": {
                      borderRadius: "1rem",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, .05)",
                      },
                    },
                    "& .MuiMenuItem-root": {
                      padding: 1.5,
                      fontSize: "1.2rem",
                      fontWeight: "400",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, .2) !important",
                    },
                  },
                },
              }}
              sx={{
                backgroundColor: "rgba(0, 0, 0, .1)",
                border: "solid .1rem rgba(var(--gray-text-color-rgb), .3)",
                borderRadius: "100px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "1.4rem",
                fontWeight: "400",
                boxShadow: "none",
                padding: ".8rem 2rem .8rem 1.4rem",
                // height: "500px",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                // "& div": {
                // },
                "& div": {
                  padding: "0",
                },
                "& svg": {
                  marginRight: "1rem",
                },
              }}
            >
              <MenuItem value="tat-ca">Tất cả</MenuItem>
              {typeList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item._id}>
                    {item.ten}
                  </MenuItem>
                );
              })}
              ;
            </Select>
          </FormControl>
        )}
      </Box>
      <Tabs
        indicatorColor="transparent"
        value={value}
        onChange={handleChangeValue}
        aria-label="basic tabs example"
        sx={{
          marginTop: "2rem",
          marginBottom: "1.68rem",
          width: "100%",
          minHeight: "unset",
          "&>div>.MuiTabs-flexContainer": {
            overflowX: "auto",
          },
        }}
      >
        <Tab
          disableRipple
          label="Mới nhất"
          sx={{
            padding: ".4rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "var(--gray-text-color)",
            textTransform: "uppercase",
            border: "rgba(255, 255, 255, .1) solid .1rem",
            borderRadius: "100px",
            marginRight: "1.2rem",
            display: "block",
            minHeight: "unset",

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",
            },
          }}
          {...a11yProps(0)}
        />
        <Tab
          disableRipple
          label="Cũ nhất"
          sx={{
            padding: ".4rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "var(--gray-text-color)",
            textTransform: "uppercase",
            border: "rgba(255, 255, 255, .1) solid .1rem",
            borderRadius: "100px",
            marginRight: "1.2rem",
            display: "block",
            minHeight: "unset",

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",
            },
          }}
          {...a11yProps(1)}
        />
        <Tab
          disableRipple
          label="Giá cao nhất"
          sx={{
            padding: ".4rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "var(--gray-text-color)",
            textTransform: "uppercase",
            border: "rgba(255, 255, 255, .1) solid .1rem",
            borderRadius: "100px",
            marginRight: "1.2rem",
            display: "block",
            minHeight: "unset",

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",
            },
          }}
          {...a11yProps(2)}
        />
        <Tab
          disableRipple
          label="Giá thấp nhất"
          sx={{
            padding: ".4rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "var(--gray-text-color)",
            textTransform: "uppercase",
            border: "rgba(255, 255, 255, .1) solid .1rem",
            borderRadius: "100px",
            marginRight: "1.2rem",
            display: "block",
            minHeight: "unset",

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",
            },
          }}
          {...a11yProps(3)}
        />
        <Tab
          disableRipple
          label="Đề xuất"
          sx={{
            padding: ".4rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "var(--gray-text-color)",
            textTransform: "uppercase",
            border: "rgba(255, 255, 255, .1) solid .1rem",
            borderRadius: "100px",
            marginRight: "1.2rem",
            display: "block",
            minHeight: "unset",

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",
            },
          }}
          {...a11yProps(4)}
        />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <GridBookList
          bookList={bookList
            .filter(() => true)
            .sort((a, b) => {
              const dateA = new Date(a.ngaytao);
              const dateB = new Date(b.ngaytao);
              // return dateA - dateB; // Sắp xếp tăng dần theo ngày tạo
              return dateB - dateA; // Sắp xếp giảm dần theo ngày tạo
            })}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GridBookList
          bookList={bookList
            .filter(() => true)
            .sort((a, b) => {
              const dateA = new Date(a.ngaytao);
              const dateB = new Date(b.ngaytao);
              return dateA - dateB; // Sắp xếp tăng dần theo ngày tạo
              // return dateB - dateA; // Sắp xếp giảm dần theo ngày tạo
            })}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GridBookList bookList={bookList.filter(() => true).sort((a, b) => b.gia - a.gia)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GridBookList bookList={bookList.filter(() => true).sort((a, b) => a.gia - b.gia)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GridBookList bookList={bookList.filter((item, index) => item.isRecommended === true)} />
      </CustomTabPanel>
    </Container>
  );
};

export default TypeDetail;
