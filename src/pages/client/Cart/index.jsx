import { Button, Container } from "@mui/material";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import classes from "./CartStyle.module.scss";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";
import { getIdCartList, resetCart } from "../../../services/Cart";
import CartList from "./CartList";
import * as Icon from "../../../components/Icon";
import { useNavigate } from "react-router-dom";
import PaymentBox from "./PaymentBox";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // resetCart();
    console.log(getIdCartList());
    getIdCartList().map((cartInfor) => {
      fetchApi(getApiEnv() + "/Sach/" + cartInfor.id).then((data, index) => {
        setCartList((prev) => prev.concat({ ...data?.data, quantity: cartInfor.quantity }));
        setTotalPrice((prev) => prev + cartInfor.quantity * data?.data.gia);
      });
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
      <div className={classes.cart}>
        <div className={classes.breadcrumb}>
          <BreadcrumbBar path={[{ label: "Sách của bạn", url: "" }]}></BreadcrumbBar>
        </div>
        <Button
          disableRipple
          disableFocusRipple
          sx={{
            padding: "1rem 2rem",
            color: "var(--gray-text-color)",
            fontSize: "1.4rem",
            fontWeight: "400",
            display: "flex",
            alignItems: "center",
            border: ".1rem solid rgba(var(--gray-text-color-rgb), .3)",
            gap: "1rem",
            borderRadius: "100px",
            textTransform: "none",
            marginBottom: "3rem",
          }}
          onClick={() => navigate("/favorite-book")}
        >
          <Icon.HeartIcon width={16} type="light" />
          Sách yêu thích (0)
        </Button>
        <div className={classes.cartContent}>
          <div className={classes.cartContentBookList}>
            <CartList
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              cartList={cartList}
            ></CartList>
          </div>
          <div className={classes.cartContentPaymentBox}>
            <PaymentBox
              totalQuantity={getIdCartList()?.reduce((total, item) => total + item.quantity, 0)}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
