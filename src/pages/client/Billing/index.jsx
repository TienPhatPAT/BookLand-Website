import { Container, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./Billing.module.scss";
import PropTypes from "prop-types";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Billing = () => {
  const [value, setValue] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

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
    // Dữ liệu mẫu
    const fetchOrders = async () => {
      const orders = [
        {
          id: "1",
          status: "Đang xử lý",
          date: "2023-07-08",
          items: [
            {
              name: "Nhà Giả Kim",
              author: "Paulo Coelho",
              price: "900.000 VNĐ",
              quantity: 2,
              imageUrl:
                "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.fm_audio_book/0/0/0/5237.jpg?v=1&w=360&h=526",
            },
          ],
          paid: false, // Trạng thái thanh toán
        },
        {
          id: "2",
          status: "Hoàn thành",
          date: "2023-06-15",
          items: [
            {
              name: "Harry Potter và Hòn Đá Phù Thủy",
              author: "J.K. Rowling",
              price: "500.000 VNĐ",
              quantity: 1,
              imageUrl:
                "https://cungdocsach.vn/wp-content/uploads/2019/10/Harry-potter-v%C3%A0-h%C3%B2n-%C4%91%C3%A1-ph%C3%B9-th%E1%BB%A7y.gif",
            },
          ],
          paid: true, // Trạng thái thanh toán
        },
        {
          id: "3",
          status: "Đã hủy",
          date: "2023-05-20",
          items: [
            {
              name: "Cuốn Sách Thần Bí",
              author: "John Doe",
              price: "300.000 VNĐ",
              quantity: 1,
              imageUrl:
                "https://th.bing.com/th/id/R.e5fd6a96eed08c9eeba458c2bb07cc6b?rik=0hdF15ahl3MU6w&riu=http%3a%2f%2fcantholib.org.vn%2fuploads%2fgts-tren-dai-truyen-hinh%2fthtpct%2fkien-truc-trong-van-hoa-oc-eo.jpg&ehk=WkuuAd%2bf0TIlgR90fspmDCzlV1LYQ386fiMsVJZ%2fgwM%3d&risl=&pid=ImgRaw&r=0",
            },
          ],
          paid: false, // Trạng thái thanh toán
        },
        {
          id: "4",
          status: "Hoàn thành",
          date: "2023-05-20",
          items: [
            {
              name: "Cuốn Sách Thần Bí",
              author: "John Doe",
              price: "300.000 VNĐ",
              quantity: 1,
              imageUrl:
                "https://th.bing.com/th/id/R.e5fd6a96eed08c9eeba458c2bb07cc6b?rik=0hdF15ahl3MU6w&riu=http%3a%2f%2fcantholib.org.vn%2fuploads%2fgts-tren-dai-truyen-hinh%2fthtpct%2fkien-truc-trong-van-hoa-oc-eo.jpg&ehk=WkuuAd%2bf0TIlgR90fspmDCzlV1LYQ386fiMsVJZ%2fgwM%3d&risl=&pid=ImgRaw&r=0",
            },
          ],
          paid: true, // Trạng thái thanh toán
        },
      ];
      setOrderList(orders);
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (id) => {
    const order = orderList.find((order) => order.id === id);
    navigate(`/billing/${id}`, { state: { order } }); // Chuyển dữ liệu đến `BillingDetail`
  };

  return (
    <Container
      sx={{
        maxWidth: "calc(100% - 6rem) !important",
        padding: "0 !important",
        margin: "0 0 12rem auto !important",
      }}
    >
      <BreadcrumbBar path={[{ label: "Đơn hàng của bạn", url: "type" }]} />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
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
        <Tab disableRipple label="Tất cả" sx={tabItemStyle} {...a11yProps(0)} />
        <Tab
          disableRipple
          label="Đang xử lý"
          sx={tabItemStyle}
          {...a11yProps(1)}
        />
        <Tab
          disableRipple
          label="Hoàn thành"
          sx={tabItemStyle}
          {...a11yProps(2)}
        />
        <Tab disableRipple label="Đã hủy" sx={tabItemStyle} {...a11yProps(3)} />
      </Tabs>
      <div className={classes.orderList}>
        <CustomTabPanel value={value} index={0}>
          {orderList.map((order) => (
            <div
              key={order.id}
              className={clsx(
                classes.orderItem,
                classes[order.status.replace(/\s+/g, "")]
              )}
              onClick={() => handleViewDetails(order.id)}
            >
              <div className={classes.img}>
                <img src={order.items[0].imageUrl} alt={order.items[0].name} />
              </div>
              <div className={classes.info}>
                <div className={classes.name_author}>
                  <Typography variant="h6">{order.items[0].name}</Typography>
                  <Typography variant="body2">
                    {order.items[0].author}
                  </Typography>
                </div>
                <div className={classes.price_amount}>
                  <Typography variant="h6">{order.items[0].price}</Typography>
                  <Typography variant="body2">
                    {order.items[0].quantity} x
                  </Typography>
                </div>
              </div>
              <div className={classes.more}>
                <Typography variant="body2">Xem Chi Tiết</Typography>
              </div>
            </div>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {orderList
            .filter((order) => order.status === "Đang xử lý")
            .map((order) => (
              <div
                key={order.id}
                className={clsx(classes.orderItem, classes.Pending)}
                onClick={() => handleViewDetails(order.id)}
              >
                <div className={classes.img}>
                  <img
                    src={order.items[0].imageUrl}
                    alt={order.items[0].name}
                  />
                </div>
                <div className={classes.info}>
                  <div className={classes.name_author}>
                    <Typography variant="h6">{order.items[0].name}</Typography>
                    <Typography variant="body2">
                      {order.items[0].author}
                    </Typography>
                  </div>
                  <div className={classes.price_amount}>
                    <Typography variant="h6">{order.items[0].price}</Typography>
                    <Typography variant="body2">
                      {order.items[0].quantity} x
                    </Typography>
                  </div>
                </div>
                <div className={classes.more}>
                  <Typography variant="body2">Xem Chi Tiết</Typography>
                </div>
              </div>
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {orderList
            .filter((order) => order.status === "Hoàn thành")
            .map((order) => (
              <div
                key={order.id}
                className={clsx(classes.orderItem, classes.Complete)}
                onClick={() => handleViewDetails(order.id)}
              >
                <div className={classes.img}>
                  <img
                    src={order.items[0].imageUrl}
                    alt={order.items[0].name}
                  />
                </div>
                <div className={classes.info}>
                  <div className={classes.name_author}>
                    <Typography variant="h6">{order.items[0].name}</Typography>
                    <Typography variant="body2">
                      {order.items[0].author}
                    </Typography>
                  </div>
                  <div className={classes.price_amount}>
                    <Typography variant="h6">{order.items[0].price}</Typography>
                    <Typography variant="body2">
                      {order.items[0].quantity} x
                    </Typography>
                  </div>
                </div>
                <div className={classes.more}>
                  <Typography variant="body2">Xem Chi Tiết</Typography>
                </div>
              </div>
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {orderList
            .filter((order) => order.status === "Đã hủy")
            .map((order) => (
              <div
                key={order.id}
                className={clsx(classes.orderItem, classes.Cancelled)}
                onClick={() => handleViewDetails(order.id)}
              >
                <div className={classes.img}>
                  <img
                    src={order.items[0].imageUrl}
                    alt={order.items[0].name}
                  />
                </div>
                <div className={classes.info}>
                  <div className={classes.name_author}>
                    <Typography variant="h6">{order.items[0].name}</Typography>
                    <Typography variant="body2">
                      {order.items[0].author}
                    </Typography>
                  </div>
                  <div className={classes.price_amount}>
                    <Typography variant="h6">{order.items[0].price}</Typography>
                    <Typography variant="body2">
                      {order.items[0].quantity} x
                    </Typography>
                  </div>
                </div>
                <div className={classes.more}>
                  <Typography variant="body2">Xem Chi Tiết</Typography>
                </div>
              </div>
            ))}
        </CustomTabPanel>
      </div>
    </Container>
  );
};

export default Billing;
