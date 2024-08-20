import clsx from "clsx";
import classes from "./checkout.module.scss";
import qr from "./../../../assets/icons/checkout/icon-pay-qr.svg";
import bank from "./../../../assets/icons/checkout/icon-bank.svg";
import wallet from "./../../../assets/icons/checkout/icon-money-wallet.svg";
import card from "./../../../assets/icons/checkout/icon-money-card.svg";
import { Container } from "@mui/material";

const Checkout = () => {
  return (
    <>
      <Container
        sx={{
          maxWidth: "calc(100% - 6rem) !important",
          padding: "0 !important",
          margin: "0 0 12rem auto !important",
        }}
      >
        <div className={classes.payment_total}>
          <div className={classes.payment_total_info}>
            <h2>Chọn hình thức thanh toán</h2>
            <p>An toàn - Nhanh chóng - Bảo mật</p>
          </div>
          <div
            className={clsx(
              classes.payment_form,
              "d-flex justify-content-between"
            )}
          >
            <div className={clsx(classes.payment_methods, "col-6")}>
              <h3>Chọn phương thức thanh toán</h3>
              <div className={classes.qrcode}>
                <i className={classes.icon_qrcode}>
                  <img src={qr} alt="" />
                </i>
                <div className={classes.font}>Quét QR CODE</div>
              </div>
              <div className={classes.creditcard}>
                <i className={classes.creditcard_icon}>
                  <img src={bank} alt="" />
                </i>
                <div className={classes.name_creditcard}>
                  <div className={classes.font}>
                    Thẻ ATM có Internet Banking
                  </div>
                  <span>Thẻ ngân hàng nội địa</span>
                </div>
                <div className={classes.hiddenbank}>
                  <div className={classes.listbank}>
                    {/* <div className={classes.bank}>
                    <div className="d-flex gap-10">
                      <p>Chọn Ngân Hàng</p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className={classes.globe_americas}>
                <i className={classes.globe_americas_icon}>
                  <img src={wallet} alt="" />
                </i>
                <div className={classes.font}>Thẻ quốc tế Visa/Master/JBC</div>
              </div>
              <div className={classes.wallet}>
                <i className={classes.wallet_icon}>
                  <img src={card} alt="" />
                </i>
                <div className={classes.font}>Ví điện tử</div>
              </div>
            </div>

            <div className={clsx(classes.payment_details, "col-5")}>
              <h3>Thông tin thanh toán</h3>
              <table className={classes.table}>
                <tbody>
                  <tr className={classes.payment_item}>
                    <td>Sản phẩm</td>
                    <select>
                      <option value="waka-3-months">
                        Gói hội viên Waka 3 Tháng
                      </option>
                      <option value="waka-6-months">
                        Gói hội viên Waka 6 Tháng
                      </option>
                      <option value="waka-9-months">
                        Gói hội viên Waka 9 Tháng
                      </option>
                    </select>
                  </tr>
                  <tr className={classes.payment_item}>
                    <td>Tạm tính</td>
                    <td>99.000₫</td>
                  </tr>
                  <tr className={classes.payment_item}>
                    <td>Hình thức thanh toán</td>
                    <td>Chọn phương thức</td>
                  </tr>
                  <tr className={classes.payment_item_total}>
                    <td>
                      <p className={classes.tong}>TỔNG</p>
                    </td>
                    <td>
                      <p className={classes.price}>90.000 VNĐ</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={classes.payment_button}>Thanh toán</div>
            </div>
            <div className={classes.support}>
              <i className="fas fa-question-circle"></i>
              Hỗ trợ
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
