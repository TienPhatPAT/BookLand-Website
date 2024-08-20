import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Home.module.scss";
import PropTypes from "prop-types";
import HomeSlider from "./HomeSlider";
import homeVideo from "../../../assets/images/book_gif.gif";
import clsx from "clsx";
import TypeItem from "../../../components/TypeItem";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";
import BookListHeading from "../../../components/BookListHeading";
import * as Icon from "../../../components/Icon";
import BookList from "../../../components/BookList";
import ArthorList from "../../../components/ArthorList";
import BlogList from "../../../components/BlogList";

const Home = () => {
  const [value, setValue] = useState(0);
  const [newestBookList, setNewestBookList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [recomendedBookList, setRecomendedBookList] = useState([]);
  const [topBookList, settopBookList] = useState([]);
  const [typeList, setTypeList] = useState([]);

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

  const tabItemStyle = {
    color: "#ffffff !important",

    "&.Mui-selected": {
      color: "var(--primary-color) !important",
    },
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
          .sort((a, b) => b.recomendedPriority - a.recomendedPriority)
      );
      setNewestBookList(data?.data.sort((a, b) => b.ngayxuatban - a.ngayxuatban));
      settopBookList(data?.data.sort((a, b) => b.luotxem - a.luotxem));
    });

    fetchApi(`${import.meta.env.VITE_API}/TheLoai`).then((data) => {
      setTypeList(data?.data);
    });
    fetchApi(`${import.meta.env.VITE_API}/baiviet`).then((data) => {
      setBlogList(data?.data);
    });
    fetchApi(`${import.meta.env.VITE_API}/tacgia`).then((data) => {
      setAuthorList(data?.data);
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
      <div className={classes.slider}>
        <div className="col-12">
          <HomeSlider />
        </div>
        {/* <div
          className={clsx(classes.homeVideo, "col-4")}
          style={{ "--background-url": `url(${homeVideo})` }}
        /> */}
      </div>
      <BookListHeading
        icon={<Icon.CupIcon type="light" color="#fff" height={24} />}
        to="/ranking"
        label="Top sách nổi bật"
      ></BookListHeading>
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
          // disableRipple
          label="Tất cả"
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
            position: "relative",

            "&:hover:before": {
              content: "''",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(255, 255, 255, .05)",
              // opacity: 0,
              // backgroundColor: "transparent",
              // transition: "opacity 1s ease-in out",
            },

            "&.Mui-selected": {
              color: "#fff",
              border: "none",
              backgroundColor: "var(--primary-color)",

              "&:hover:before": {
                opacity: 0,
              },
            },
          }}
          {...a11yProps(0)}
        />
        {typeList?.map((item, index) => {
          return (
            <Tab
              key={index}
              // disableRipple
              label={item?.ten}
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
                position: "relative",

                "&:hover:before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(255, 255, 255, .05)",
                  // opacity: 0,
                  // backgroundColor: "transparent",
                  // transition: "opacity 1s ease-in out",
                },

                "&.Mui-selected": {
                  color: "#fff",
                  border: "none",
                  backgroundColor: "var(--primary-color)",

                  "&:hover:before": {
                    opacity: 0,
                  },
                },
              }}
              {...a11yProps(index + 1)}
            />
          );
        })}
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <BookList bookList={topBookList} />
      </CustomTabPanel>
      {typeList.map((item, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index + 1}>
            <BookList
              bookList={topBookList.filter((book) => {
                let check = false;
                book?.type?.map((type) => {
                  if (type.ten === item.ten) {
                    check = true;
                    return;
                  }
                });
                return check;
              })}
            />
          </CustomTabPanel>
        );
      })}

      <BookListHeading
        icon={<Icon.TypeIcon type="light" color="#fff" height={24} />}
        to="/type"
        label="Sách theo thể loại"
      ></BookListHeading>
      <div className={classes.typeList}>
        {typeList.slice(0, 10).map((item, index) => {
          return <TypeItem key={index} id={item._id} image={item.img} label={item.ten} />;
        })}
        {/* <div>
          <TypeItem
            image="https://www.umt.edu.vn/vi-vn/images/resize-770x0/upload/media/M64ec4d3879ff6/nganh-khoa-hoc-du-lieu-la-gi.jpg?v=1.31"
            label="Khoa học - Công nghệ"
          />
          <TypeItem
            image="https://genk.mediacdn.vn/2018/6/28/il570xn10681225567052-1530159639243155971532.jpg"
            label="Trinh thám - Kinh dị"
          />
          <TypeItem
            image="https://suno.vn/blog/wp-content/uploads/2019/03/thu-hut-khach-hang.jpg"
            label="Marketing - Bán hàng"
          />
          <TypeItem
            image="https://static.ybox.vn/2021/4/0/1618132768785-ezgif.com-resize%20(1).jpg"
            label="Tài chính cá nhân"
          />
          <TypeItem
            image="https://openend.vn/wp-content/uploads/2020/06/moi-nguoi-deu-co-diem-manh-800x400.png"
            label="Phát triển cá nhân"
          />
          <TypeItem
            image="https://www.umt.edu.vn/vi-vn/images/resize-770x0/upload/media/M64ec4d3879ff6/nganh-khoa-hoc-du-lieu-la-gi.jpg?v=1.31"
            label="Học tập - Hướng nghiệp"
          />
          <TypeItem
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFjPB6NeLGt4ASrD7dgE_5FL3oqi4zUEhPUA&s"
            label="Tâm lý - Giới tính"
          />
          <TypeItem
            image="https://giadungthongminhvn.com/Systems/2020/02/24/suc-khoe-va-lam-dep.png"
            label="Sức khỏe - Làm đẹp"
          />
          <TypeItem
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVAFETHQnrMBwpV_B53A8nxTW6W8Sqdr_og&s"
            label="Tư duy - Sáng tạo"
          />
          <TypeItem
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpIHfUbRJcmfrJGv7ePuT_tbYtSC3ehlacUA&s"
            label="Ngôn tình"
          />
          <TypeItem
            image="https://laodongthudo.vn/stores/news_dataimages/quocdai/052021/31/15/covid120210531154121.6203330.jpg"
            label="Thiếu nhi"
          />
          <TypeItem
            image="https://thuvienbinhthuan.com.vn/wp-content/uploads/2021/07/b.jpg"
            label="Tiểu thuyết"
          />
          <TypeItem
            image="https://voiz-prod.s3-wewe.cloud.cmctelecom.vn/uploads/avatar/filename/414514/dcd1f112d0352f7e.jpg"
            label="Nghệ thuật sống"
          />
          <TypeItem
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQekWhwtRNBjQ4APBePJQ7mmY8hxREknkNUqw&s"
            label="Kinh doanh - Làm giàu"
          />
        </div> */}
        <Link to={"/type"} className={classes.moreBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="3"
            viewBox="0 0 11 3"
            fill="none"
          >
            <path
              d="M1.56676 2.08523C1.30398 2.08523 1.07848 1.99112 0.89027 1.80291C0.70206 1.6147 0.607955 1.3892 0.607955 1.12642C0.607955 0.863636 0.70206 0.638139 0.89027 0.449929C1.07848 0.261719 1.30398 0.167614 1.56676 0.167614C1.82955 0.167614 2.05504 0.261719 2.24325 0.449929C2.43146 0.638139 2.52557 0.863636 2.52557 1.12642C2.52557 1.30043 2.48118 1.46023 2.3924 1.60582C2.30717 1.75142 2.19176 1.86861 2.04616 1.95739C1.90412 2.04261 1.74432 2.08523 1.56676 2.08523ZM5.69762 2.08523C5.43484 2.08523 5.20934 1.99112 5.02113 1.80291C4.83292 1.6147 4.73881 1.3892 4.73881 1.12642C4.73881 0.863636 4.83292 0.638139 5.02113 0.449929C5.20934 0.261719 5.43484 0.167614 5.69762 0.167614C5.9604 0.167614 6.1859 0.261719 6.37411 0.449929C6.56232 0.638139 6.65643 0.863636 6.65643 1.12642C6.65643 1.30043 6.61204 1.46023 6.52326 1.60582C6.43803 1.75142 6.32262 1.86861 6.17702 1.95739C6.03498 2.04261 5.87518 2.08523 5.69762 2.08523ZM9.82848 2.08523C9.5657 2.08523 9.3402 1.99112 9.15199 1.80291C8.96378 1.6147 8.86967 1.3892 8.86967 1.12642C8.86967 0.863636 8.96378 0.638139 9.15199 0.449929C9.3402 0.261719 9.5657 0.167614 9.82848 0.167614C10.0913 0.167614 10.3168 0.261719 10.505 0.449929C10.6932 0.638139 10.7873 0.863636 10.7873 1.12642C10.7873 1.30043 10.7429 1.46023 10.6541 1.60582C10.5689 1.75142 10.4535 1.86861 10.3079 1.95739C10.1658 2.04261 10.006 2.08523 9.82848 2.08523Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
      <BookList bookList={newestBookList} heading="Sách mới nhất" />
      <BookList bookList={recomendedBookList} heading="Đề xuất cho bạn" />
      <BlogList blogList={blogList} heading="Bài Viết" />
      <ArthorList arthorList={authorList} heading="Tác giả" />
      {/* <BookList bookList={topBookList} heading="Top sách nổi bật" /> */}
      {/* <BookListHeading
        icon={<Icon.Icon9 type="light" color="#fff" height={24} />}
        to="/type"
        label="Tuyển tập chọn lọc"
      ></BookListHeading> */}
    </Container>
  );
};

export default Home;
