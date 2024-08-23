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

const FavoriteBook = () => {
  const { id } = useParams();
  const [bookList, setBookList] = useState([]);
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
    navigate("/type/" + event.target.value);
    fetchApi(getApiEnv() + "/Sach").then((data) => {
      const newData = data?.data.filter((book) =>
        book.type.some((t) => t._id === event.target.value)
      );
      setBookList(newData);
      setFullBookList(newData);
    });
  };

  useEffect(() => {
    fetchApi(getApiEnv() + "/Sach").then((data) => {
      const newData = data?.data.filter((book) => book.theloaisach.some((t) => t.id === id));
      setBookList(newData);
      setFullBookList(newData);
    });

    fetchApi(getApiEnv() + "/TheLoai").then((data) => {
      setTypeList(data?.data);
    });
  }, []);

  return (
    <Container
      sx={{
        maxWidth: "calc(100% - 6rem) !important",
        padding: "0 !important",
        margin: "0 0 12rem auto !important",
      }}
    >
      <BreadcrumbBar
        path={[
          { label: "Sách yêu thích", url: "type" },
          // { label: currentType.name || "Thể loại", url: "" },
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
          Sách yêu thích
        </Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChangeValue}
        aria-label="basic tabs example"
        indicatorColor="transparent"
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
        <GridBookList bookList={bookList.filter(() => true).sort((a, b) => b.price - a.price)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GridBookList bookList={bookList.filter(() => true).sort((a, b) => a.price - b.price)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GridBookList bookList={bookList.filter((item, index) => item.isRecommended === true)} />
      </CustomTabPanel>
    </Container>
  );
};

export default FavoriteBook;
