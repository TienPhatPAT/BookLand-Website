import { Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";
import RankList from "./RankList";

const Ranking = () => {
  const [value, setValue] = useState(0);
  const [newestBookList, setNewestBookList] = useState([]);
  const [recomendedBookList, setRecomendedBookList] = useState([]);
  const [topBookList, settopBookList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [currentLabel, setCurrentLabel] = useState("Sách mới");

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    fetchApi(`${getApiEnv()}/Sach`).then((data) => {
      setRecomendedBookList(
        data?.data
          .filter((item) => item.isRecommended === true)
          .sort((a, b) => a.recomendedPriority - b.recomendedPriority)
      );
      setNewestBookList(data?.data.sort((a, b) => a.ngayxuatban - b.ngayxuatban));
      settopBookList(data?.data.sort((a, b) => a.luotxem - b.luotxem));
    });

    fetchApi(`${getApiEnv()}/TheLoai`).then((data) => {
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
      <Typography
        sx={{
          marginTop: "3rem",
          marginBottom: "2rem",
          fontSize: "3.2rem",
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        BXH {currentLabel}
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
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
          label="Bán chạy"
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
          label="Yêu thích"
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
          label="Xem nhiều"
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
        <RankList
          setCurrentLabel={setCurrentLabel}
          newLabel="Sách mới"
          bookList={topBookList.sort((a, b) => b.ngayxuatban - a.ngayxuatban)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RankList
          setCurrentLabel={setCurrentLabel}
          newLabel="Bán chạy"
          bookList={topBookList.slice(0, topBookList.length - 1).sort((a, b) => b.sold - a.sold)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RankList
          setCurrentLabel={setCurrentLabel}
          newLabel="Yêu thích"
          bookList={topBookList
            .slice(0, topBookList.length - 1)
            .sort((a, b) => b.favorite - a.favorite)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <RankList
          setCurrentLabel={setCurrentLabel}
          newLabel="Xem nhiều"
          bookList={topBookList
            .slice(0, topBookList.length - 1)
            .sort((a, b) => b.luotxem - a.luotxem)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <RankList
          setCurrentLabel={setCurrentLabel}
          newLabel="Đề xuất"
          bookList={topBookList
            .filter((item) => item.isRecommended === true)
            .sort((a, b) => b.recomendedPriority - a.recomendedPriority)}
        />
      </CustomTabPanel>
    </Container>
  );
};

export default Ranking;
