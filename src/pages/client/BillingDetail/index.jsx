import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import classes from "./BillingDetail.module.scss";

const BillingDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // Nhận dữ liệu từ state

  if (!order) {
    return (
      <Typography variant="h6" color="error">
        Không có thông tin đơn hàng.
      </Typography>
    );
  }

  // Thông tin người mua cố định
  const buyer = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    avatarUrl: "https://avatarfiles.alphacoders.com/182/182133.jpg",
  };

  // Tính toán tổng số tiền
  const calculateTotalAmount = () => {
    return order.items?.reduce(
      (total, item) => total + parseFloat(item.price.replace(/[^0-9]/g, "")) * item.quantity,
      0
    );
  };

  // Xác định trạng thái thanh toán
  const paymentStatus = order.paid ? "Đã thanh toán" : "Chưa thanh toán";
  const paymentStatusClass = order.paid
    ? classes.paymentStatusValue
    : `${classes.paymentStatusValue} ${classes.unpaid}`;

  const renderOrderInfo = () => (
    <Box className={classes.orderInfo}>
      <Typography variant="h6" className={classes.infoTitle}>
        Mã đơn hàng: {order.id}
      </Typography>
      <Typography className={classes.infoText}>
        Ngày đặt hàng: {new Date(order.date).toLocaleDateString()}
      </Typography>
      <Typography className={classes.infoText}>Trạng thái: {order.status}</Typography>
    </Box>
  );

  const renderProductItem = (item) => (
    <Box key={item.name} className={classes.productItem}>
      <img src={item.imageUrl} alt={item.name} />
      <Box className={classes.productInfo}>
        <Typography variant="h6" className={classes.productName}>
          {item.name}
        </Typography>
        <Typography className={classes.productAuthor}>Tác giả: {item.author}</Typography>
        <Typography className={classes.productPrice}>Giá: {item.price}</Typography>
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
        <Typography className={paymentStatusClass}>{paymentStatus}</Typography>
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
          <Box className={classes.productList}>{order.items.map(renderProductItem)}</Box>
          {renderInvoice()}
        </Box>
        <Box className={classes.buyerInfoContainer}>
          <Box className={classes.buyerInfo}>
            <img src={buyer.avatarUrl} alt="Avatar" className={classes.avatar} />
            <Typography className={classes.buyerTitle}>{buyer.name}</Typography>
            <Typography className={classes.buyerText}>{buyer.email}</Typography>
            <Typography className={classes.buyerText}>{buyer.phone}</Typography>
            <Typography className={classes.buyerText}>{buyer.address}</Typography>
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
