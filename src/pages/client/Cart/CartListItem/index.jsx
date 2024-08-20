import React, { useState } from "react"; // Thêm import useState từ React
import Image from "../../../../components/Image";
import classes from "./CartItem.module.scss";
import * as Icon from "../../../../components/Icon";
import { Button, Typography } from "@mui/material";
import {
  increaseQuantityById,
  decreaseQuantityById,
  removeCartById,
} from "../../../../services/Cart";
import clsx from "clsx";
import { formatMoney } from "../../../../utils/string";
import { Link } from "react-router-dom";

const CartListItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [isShow, setIsShow] = useState(true);

  const quantityBtnStyle = {
    padding: "1.3rem",
    borderRadius: "10rem",
    minWidth: "unset",
    backgroundColor: "rgba(255, 255, 255, .05)",
    "&.Mui-disabled": {
      opacity: ".3",
    },
  };

  const increaseCartHandle = (idBook, price) => {
    increaseQuantityById(idBook);
    setQuantity((prev) => prev + 1);
    props.setTotalPrice((prev) => prev + price);
  };

  const decreaseCartHandle = (idBook, price) => {
    decreaseQuantityById(idBook);
    setQuantity((prev) => prev - 1);
    props.setTotalPrice((prev) => prev - price);
  };

  const removeCartHandle = (id) => {
    // Lấy số lượng sản phẩm cần xóa
    const quantityToRemove = quantity;

    // Xóa sản phẩm khỏi giỏ hàng
    removeCartById(id);

    // Cập nhật tổng giá
    props.setTotalPrice((prev) => {
      const newTotal = prev - props.price * quantityToRemove;
      return newTotal > 0 ? newTotal : 0; // Đảm bảo giá không bị âm
    });

    // Ẩn sản phẩm sau khi xóa
    setIsShow(false);
  };

  return (
    <>
      {isShow && (
        <div className={classes.cartList}>
          <Link to={"/book/" + props.id}>
            <Image url={props.img} className={classes.cover}>
              <div></div>
            </Image>
          </Link>
          <div className={classes.cartInfor}>
            <div className={classes.nameWrapper}>
              <Typography
                noWrap
                sx={{
                  color: "var(--white-text-color)",
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  maxWidth: "100%",
                }}
              >
                <Link to={"/book/" + props._id}>{props.ten}</Link>
              </Typography>
              <Typography
                sx={{
                  color: "var(--gray-text-color)",
                  fontSize: "1.4rem",
                  fontWeight: "400",
                }}
              >
                {props.tacgia}
              </Typography>
              <div className={classes.quantity}>
                <Button
                  sx={quantityBtnStyle}
                  onClick={() => decreaseCartHandle(props._id, props.gia)}
                  disabled={quantity === 1}
                >
                  <Icon.PlusIcon color="var(--gray-text-color)" />
                </Button>
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: "400",
                    color: "var(--white-text-color)",
                    userSelect: "none",
                  }}
                >
                  {quantity}
                </Typography>
                <Button
                  sx={quantityBtnStyle}
                  onClick={() => increaseCartHandle(props._id, props.gia)}
                >
                  <Icon.MinusIcon color="var(--gray-text-color)" />
                </Button>
              </div>
              <Button
                sx={{
                  padding: "unset",
                  textTransform: "none",
                  marginTop: "1.2rem",
                  padding: ".4rem 1rem .4rem 0",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                disableRipple
              >
                <Typography
                  sx={{
                    color: "var(--light-gray-text-color)",
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    display: "flex",
                    gap: ".4rem",
                    alignItems: "center",
                  }}
                >
                  <Icon.HeartIcon
                    color="var(--light-gray-text-color)"
                    type="light"
                    height="1.4rem"
                  />{" "}
                  Add to favorite
                </Typography>
              </Button>
            </div>
            <div className={clsx(classes.priceWrapper, "d-flex align-items-center")}>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "1.6rem",
                  color: "var(--light-gray-text-color)",
                }}
                className={classes.quantity}
              >
                {quantity} x
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "2rem",
                  color: "var(--white-text-color)",
                  textTransform: "uppercase",
                }}
                className={classes.price}
              >
                {formatMoney(props.gia)} VNĐ
              </Typography>
            </div>
          </div>
          <Button
            onClick={() => removeCartHandle(props._id)}
            className={classes.deleteBtn}
            sx={{
              minWidth: "unset",
              borderRadius: "100px",
              height: "3rem",
              width: "3rem",
              padding: "unset",
              "&:hover": {
                backgroundColor: "var(--red-text-color)",
                path: {
                  fill: "#fff",
                },
              },
            }}
          >
            <Icon.CloseIcon height={12} width={12} />
          </Button>
        </div>
      )}
    </>
  );
};

export default CartListItem;
