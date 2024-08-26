import { Button, Container, Typography } from "@mui/material";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import classes from "./CartStyle.module.scss";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";
import { getIdCartList } from "../../../services/Cart";
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
    getIdCartList()?.map((cartInfor) => {
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
        <div className={classes.cartContent}>
          {cartList?.length !== 0 ? (
            <>
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
            </>
          ) : (
            <Typography variant="h2" sx={{ width: "100%" }}>
              Giỏ hàng không có sản phẩm
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Cart;
