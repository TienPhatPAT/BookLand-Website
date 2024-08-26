import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import classes from "./BillingDetail.module.scss";
import { formatMoney } from "../../../utils/string";

const BillingDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  // Nhận dữ liệu từ state

  if (!order) {
    return (
      <Typography variant="h6" color="error">
        Không có thông tin đơn hàng.
      </Typography>
    );
  }

  // Tính toán tổng số tiền
  const calculateTotalAmount = () => {
    return order.items.reduce((total, item) => {
      console.log(total, "1", item.book, "2");
      return total + parseFloat(item.book.gia) * item.quantity;
    }, 0);
  };

  // Xác định trạng thái thanh toán

  const paymentStatus = {
    cancelled: "Đã huỷ",
    pending: "Đang xử lý",
    completed: "Hoàn thành",
  };
  const paymentStatusClass =
    order.status === "completed"
      ? classes.paymentStatusValue
      : `${classes.paymentStatusValue} ${classes.unpaid}`;

  const renderOrderInfo = () => (
    <Box className={classes.orderInfo}>
      <Typography variant="h6" className={classes.infoTitle}>
        Mã đơn hàng: {order._id}
      </Typography>
      <Typography className={classes.infoText}>
        Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()}
      </Typography>
      <Typography className={classes.infoText} style={{ textTransform: "capitalize" }}>
        Trạng thái: {order.status}
      </Typography>
    </Box>
  );

  const renderProductItem = (item) => (
    <Box key={item.book.id} className={classes.productItem}>
      <img src={item.book.img} alt={item.book.ten} />
      <Box className={classes.productInfo}>
        <Typography variant="h6" className={classes.productName}>
          {item.book.ten}
        </Typography>
        <Typography className={classes.productAuthor}>Tác giả: {`author`}</Typography>
        <Typography className={classes.productPrice}>
          Giá: {`${formatMoney(item.book.gia)} VNĐ`}
        </Typography>
        <Typography className={classes.productQuantity}>Số lượng: {item.quantity}</Typography>
      </Box>
    </Box>
  );

  const renderInvoice = () => (
    <Box className={classes.invoice}>
      <Typography variant="h5" className={classes.sectionTitle}>
        Hóa Đơn
      </Typography>
      <Box className={classes.paymentStatus}>
        <Typography className={classes.paymentStatusText}>Trạng thái thanh toán:</Typography>
        <Typography className={paymentStatusClass} style={{ textTransform: "capitalize" }}>
          {paymentStatus[order.status]}
        </Typography>
      </Box>
      <Box className={classes.invoiceItem}>
        <Typography className={classes.invoiceText}>Tổng tiền hàng:</Typography>
        <Typography className={classes.invoiceAmount}>
          {calculateTotalAmount().toLocaleString()} VNĐ
        </Typography>
      </Box>
      <Box className={classes.invoiceItem}>
        <Typography className={classes.invoiceText}>Phí vận chuyển:</Typography>
        <Typography className={classes.invoiceAmount}>30.000 VNĐ</Typography>
      </Box>
      <Box className={`${classes.invoiceItem} ${classes.invoiceTotal}`}>
        <Typography className={classes.invoiceText}>Tổng thanh toán:</Typography>
        <Typography className={classes.invoiceAmount}>
          {(calculateTotalAmount() * 1 + 30000).toLocaleString()} VNĐ
        </Typography>
      </Box>
    </Box>
  );

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
          { label: "Đơn hàng của bạn", url: "/" },
          { label: order.items[0].name, url: "/" },
        ]}
        className={classes.breadcrumbBar}
      />
      <Box className={classes.orderDetail}>
        <Box className={classes.orderInfoContainer}>
          <Typography variant="h4" className={classes.pageTitle}>
            Chi Tiết Đơn Hàng
          </Typography>
          {renderOrderInfo()}
          <Typography variant="h5" className={classes.sectionTitle}>
            Danh Sách Sản Phẩm
          </Typography>
          <Box className={classes.productList}>
            {order.items.map((item) => renderProductItem(item))}
          </Box>
          {renderInvoice()}
        </Box>
        <Box className={classes.buyerInfoContainer}>
          <Box className={classes.buyerInfo}>
            <img
              src={order?.user?.avt || `https://avatarfiles.alphacoders.com/182/182133.jpg`}
              alt="Avatar"
              className={classes.avatar}
            />
            <Typography className={classes.buyerTitle}>
              {order?.user?.ten || `Nguyễn Văn A`}
            </Typography>
            <Typography className={classes.buyerText}>
              {order?.user?.email || `nguyenvana@gmail.com`}
            </Typography>
            <Typography className={classes.buyerText}>
              {order?.user?.phone || `090 123 456 789`}
            </Typography>
            <Typography className={classes.buyerText}>{order?.address}</Typography>
            <Button
              className={classes.contactButton}
              onClick={() => navigate("/customer-help")} // Chuyển hướng đến trang hỗ trợ
            >
              Liên Hệ
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BillingDetail;
