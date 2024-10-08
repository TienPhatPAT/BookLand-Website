import clsx from "clsx";
import classes from "./BookDetail.module.scss";
import { Button, Container, Typography, Link as MuiLink } from "@mui/material";
import anh from "./../../../assets/images/Rectangle 875.png";
import like from "./../../../assets/icons/Like.svg";
import comnent from "./../../../assets/icons/Vector (3).svg";
import React, { useState, useEffect } from "react";
import { StarIcon } from "../../../components/Icon";
import arrow from "./../../../assets/icons/arrow.svg";
import book from "./../../../assets/icons/book_v2_light.svg";
import playlight from "./../../../assets/icons/play_light.svg";
import starlight from "./../../../assets/icons/star_light.svg";
import crown from "./../../../assets/icons/crown (1).svg";
import unlike from "./../../../assets/icons/Like (2).svg";
import { useParams, Link as RouterLink } from "react-router-dom";
import arrow1 from "./../../../assets/icons/arrow (1).svg";
import { fetchApi, getApiEnv } from "../../../utils/api";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import Image from "../../../components/Image";
import StarBar from "../../../components/StarBar";
import * as Icon from "../../../components/Icon";
import { increaseQuantityById } from "../../../services/Cart";
import TypePath from "../Type/TypePath";
import { isAuthenticated } from "../../../services/AuthService";

const BookDetail = () => {
  const isLogin = isAuthenticated();
  const { id } = useParams();
  const [isShow, setInfo] = useState(false);
  const [book, setBook] = useState(null);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("idUser");
    fetchApi(getApiEnv() + "/Sach/" + id)
      .then((data) => {
        const mockReviews = [
          {
            id: 1,
            user: {
              name: "Nguyễn Văn A",
              avatar:
                "https://th.bing.com/th/id/R.e5e6dcd1122d90f64aef39c51c95fca2?rik=nbzY51ZOmhXSMQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-TynhaBM0klg%2fUuh3dUaWMcI%2fAAAAAAAAAXU%2fEj8cpl6tHQs%2fs1600%2fluffy.png&ehk=3lSXa4amsxZe8%2fwGCrka6Zg2Sq%2bWqgXARQc5aToSenA%3d&risl=&pid=ImgRaw&r=0",
            },
            time: "1 ngày trước",
            content:
              "Sách rất hay và bổ ích. Tôi rất thích nội dung của cuốn sách này!",
            likes: 12,
            replies: [],
          },
        ];

        setBook({
          ...data?.data,
          reviews: data.reviews || mockReviews,
        });
      })
      .catch((error) => console.error("Error fetching Book data:", error));
    fetchApi(getApiEnv() + `/sachyeuthich/${userId}`).then((data) => {
      setFavorite(data?.data.map((book) => book.id_sach.id).includes(id));
    });
  }, [id]);

  const handleFavorite = async (id) => {
    const idUser = localStorage.getItem("idUser");
    try {
      const response = await fetch(getApiEnv() + "/sachyeuthich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_nguoidung: idUser,
          id_sach: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isFavorite) {
          alert("Đã bỏ sách yêu thích");
        } else {
          alert("Đã thêm sách yêu thích");
        }
        window.location.reload();
      } else {
        // Đăng nhập thất bại
        const errorData = await response.json();
        alert("Thêm sách thất bại: " + errorData.message);
      }
    } catch (error) {
      alert("Lỗi khi gửi yêu cầu : " + error.message);
    }
  };

  const handleClick = () => setInfo(!isShow);

  if (!book) {
    return <p>Loading...</p>;
  }

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  return (
    <Container
      sx={{
        maxWidth: "calc(100% - 6rem) !important",
        padding: "0 !important",
        margin: "0 0 12rem auto !important",
      }}
      className={classes.bookDetailWrapper}
    >
      <BreadcrumbBar path={[{ label: book.ten, url: "" }]} />
      <div className={clsx(classes.bookDetail, "d-flex")}>
        <div className={clsx(classes.cover, "col-3")}>
          <Image url={book.img}>
            <div></div>
          </Image>
        </div>
        <div className={clsx(classes.infoBook, "col-9")}>
          <div className={classes.nameBookWrapper}>
            <h1 className={classes.name}>{book.ten}</h1>
            <span className={classes.recommendedLabel}>Được đề xuất</span>
          </div>

          <div className={classes.ratingWrapper}>
            <div className={classes.star}>
              <StarBar starCount={4.5} />
            </div>
            <div className={classes.point}></div>
            <span className={classes.rating}>123 lượt đánh giá</span>
          </div>
          <div className={classes.bookInforWrapper}>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex flex-column justify-content-start w-100">
                <h4>Tác giả</h4>
                {book.tacgia ? (
                  <RouterLink
                    to={`/author/${book.tacgia._id}`}
                    className={classes.user_name}
                  >
                    {book.tacgia.ten}
                  </RouterLink>
                ) : (
                  <span>Chưa có thông tin tác giả</span>
                )}
              </div>
              <div className="d-flex flex-column justify-content-start w-100">
                <h4>Nhà xuất bản</h4>
                <span>Kim Đồng</span>
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex flex-column justify-content-start w-100">
                <h4>Thể loại</h4>
                <div>
                  {book.theloaisach.map((t) => (
                    <TypePath key={t._id} id={t._id} name={t.ten} />
                  ))}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-start w-100">
                <h4>Gói cước</h4>
                <span>{formatPrice(book.gia)}</span>
              </div>
            </div>
          </div>

          <div className={classes.addCartWrapper}>
            <Button
              sx={{
                padding: "1rem 2rem",
                borderRadius: "100px",
                backgroundColor: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
              disableRipple
              className={classes.addBtn}
              onClick={() => {
                if (isLogin) {
                  location.reload();
                  increaseQuantityById(book._id);
                } else {
                  alert("Vui lòng đăng nhập trước khi thêm sản phẩm");
                }
              }}
            >
              <Icon.CartBagIcon type="light" color="var(--white-text-color)" />
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  color: "--white-text-color",
                  marginLeft: "1rem",
                  textTransform: "none",
                }}
              >
                Thêm vào giỏ hàng
              </Typography>
            </Button>
            <Button
              sx={{
                height: "4.3rem",
                width: "4.3rem",
                minWidth: "unset",
                borderRadius: "100px",
                backgroundColor: isFavorite
                  ? "var(--primary-color)"
                  : "rgba(255, 255, 255, .05)",
              }}
              disableRipple
              className={classes.icon}
              onClick={() => handleFavorite(book._id)}
            >
              <Icon.HeartIcon
                width={20}
                height="auto"
                type="light"
                color={
                  isFavorite
                    ? "var(--white-text-color)"
                    : "var(--gray-text-color)"
                }
              />
            </Button>
          </div>
          <div className={classes.book_description}>
            {isShow ? (
              <p>{book.mota}</p>
            ) : (
              <p>{book.mota.substring(0, 100)}...</p>
            )}
            <button onClick={handleClick} className={classes.more_info}>
              {isShow ? "Thu gọn" : "Xem thêm"}
            </button>
          </div>
          <div className={classes.reviews}>
            <div className={classes.reviews_header}>
              <div className={classes.reviews_count}></div>
              <div className={classes.ratings_count}>
                <h4>Đánh giá & nhận xét ({book.reviews.length})</h4>
              </div>
            </div>
            <div className={classes.reviews_list}>
              {/* {book.reviews &&
                book.reviews.map((review) => (
                  <div key={review.id} className={classes.review_item}>
                    <div className={classes.avt}>
                      <img src={review.user.avatar} className={classes.avatar} alt="avatar" />
                    </div>
                    <div className={classes.review}>
                      <div className={clsx(classes.review_user, "d-flex ")}>
                        <span className={classes.user_name}>
                          {review.user.name} <img src={crown} alt="" />
                        </span>
                        <span className={classes.time}>{review.time}</span>
                      </div>
                      <div className={classes.review_content}>
                        <p>{review.content}</p>
                      </div>
                      <div className={classes.review_actions}>
                        <span className={classes.like_count}>
                          {review.likes} <img src={like} alt="" />
                        </span>
                        <span className={classes.reply_count}></span>
                        <span className={classes.share_icon}></span>
                        <span className={classes.reply_button}>
                          <img src={comnent} alt="" /> Trả lời
                        </span>
                      </div>
                    </div>
                  </div>
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetail;
