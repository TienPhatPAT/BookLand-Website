import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Alert,
} from "@mui/material";
import classes from "./PaymentBox.module.scss";
import * as Icon from "../../../../components/Icon";
import { formatMoney } from "../../../../utils/string";

const UserInfoForm = ({ open, handleClose, onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [noteError, setNoteError] = useState(false);

  const handleSave = () => {
    let hasError = false;

    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (phone.trim() === "") {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }

    if (address.trim() === "") {
      setAddressError(true);
      hasError = true;
    } else {
      setAddressError(false);
    }

    if (note.trim() === "") {
      setNoteError(true);
      hasError = true;
    } else {
      setNoteError(false);
    }

    if (!hasError) {
      onSave({ name, phone, address, note });
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: "#000", // Màu nền popup
          color: "var(--white-text-color)", // Màu chữ trong popup
        },
      }}
    >
      <DialogTitle sx={{ color: "var(--primary-color)" }}>Điền thông tin người dùng</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Họ và tên"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameError ? "Vui lòng điền họ và tên" : ""}
          InputProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          InputLabelProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white-text-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
          }}
        />
        <TextField
          margin="dense"
          id="phone"
          label="Số điện thoại"
          type="text"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          helperText={phoneError ? "Vui lòng điền số điện thoại" : ""}
          InputProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          InputLabelProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white-text-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
          }}
        />
        <TextField
          margin="dense"
          id="address"
          label="Địa chỉ"
          type="text"
          fullWidth
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={addressError}
          helperText={addressError ? "Vui lòng điền địa chỉ" : ""}
          InputProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          InputLabelProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white-text-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
          }}
        />
        <TextField
          margin="dense"
          id="note"
          label="Ghi chú"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          error={noteError}
          helperText={noteError ? "Vui lòng điền ghi chú" : ""}
          InputProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          InputLabelProps={{
            style: {
              color: "var(--white-text-color)",
            },
          }}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white-text-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
          }}
        />
        <Button
          sx={{
            marginTop: "1rem",
            backgroundColor: "var(--primary-color)",
            color: "var(--white-text-color)",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
              opacity: 0.8,
            },
          }}
          variant="contained"
          fullWidth
          onClick={handleSave}
        >
          Xác nhận
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const PaymentBox = ({ totalQuantity, totalPrice }) => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate(); // Hook cho việc điều hướng

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveUserInfo = (info) => {
    setUserInfo(info);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      // Hiển thị thông báo lỗi nếu chưa chọn phương thức thanh toán
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setOrderSuccess(true);
    localStorage.removeItem("cart");
    setTimeout(() => {
      navigate("/billing"); // Chuyển hướng sau khi đặt hàng thành công
    }, 1000); // Thay đổi độ trễ nếu cần
  };

  const handleCloseSuccessPopup = () => {
    setOrderSuccess(false);
  };

  return (
    <div className={classes.paymentBox}>
      <FormControl component="fieldset" fullWidth sx={{ marginBottom: "2rem" }}>
        <Typography
          sx={{
            color: "var(--white-text-color)",
            fontSize: "1.6rem",
            fontWeight: "400",
            marginBottom: "0.5rem",
          }}
        >
          Phương thức thanh toán
        </Typography>
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{
            ".MuiFormControlLabel-root": {
              color: "var(--white-text-color)", // Màu chữ của các tùy chọn radio
            },
            ".MuiRadio-root": {
              color: "var(--white-text-color)", // Màu của nút radio
            },
            ".MuiTypography-root": {
              fontSize: "1.6rem",
              fontWeight: "400",
            },
          }}
        >
          <FormControlLabel value="momo" control={<Radio />} label="Thanh toán Momo" />
          <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng" />
        </RadioGroup>
      </FormControl>

      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "1.6rem",
          color: "var(--white-text-color)",
          marginBottom: "1rem",
        }}
      >
        {totalQuantity} sản phẩm
      </Typography>
      <div className="d-flex justify-content-between align-items-center">
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "1.8rem",
            color: "var(--white-text-color)",
          }}
        >
          Tổng tiền
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "2.2rem",
            color: "var(--white-text-color)",
          }}
        >
          {formatMoney(totalPrice)} VNĐ
        </Typography>
      </div>
      <Button
        sx={{
          fontWeight: "600",
          fontSize: "1.6rem",
          color: "#fff !important",
          marginTop: "3rem",
          width: "100%",
          backgroundColor: "var(--primary-color)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
            opacity: ".8",
          },
        }}
        onClick={userInfo ? handlePlaceOrder : handleClickOpen}
        disabled={!paymentMethod} // Disable if payment method is not selected
      >
        {userInfo ? (
          "Đặt hàng"
        ) : (
          <>
            <Icon.CartPlusIcon color="#fff" height={20} /> Thanh toán
          </>
        )}
      </Button>
      <UserInfoForm open={open} handleClose={handleClose} onSave={handleSaveUserInfo} />

      {userInfo && (
        <div className={classes.userInfo}>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "1.6rem",
              color: "var(--white-text-color)",
              marginTop: "2rem",
            }}
          >
            Thông tin người dùng:
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "1.4rem",
              color: "var(--white-text-color)",
            }}
          >
            Họ và tên: {userInfo.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "1.4rem",
              color: "var(--white-text-color)",
            }}
          >
            Số điện thoại: {userInfo.phone}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "1.4rem",
              color: "var(--white-text-color)",
            }}
          >
            Địa chỉ: {userInfo.address}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "1.4rem",
              color: "var(--white-text-color)",
            }}
          >
            Ghi chú: {userInfo.note}
          </Typography>
        </div>
      )}

      <Dialog
        open={orderSuccess}
        onClose={handleCloseSuccessPopup}
        PaperProps={{
          sx: {
            backgroundColor: "var(--popup-background-color)", // Màu nền popup
            color: "var(--white-text-color)", // Màu chữ trong popup
          },
        }}
      >
        <DialogTitle sx={{ color: "var(--primary-color)" }}>Đặt hàng thành công</DialogTitle>
        <DialogContent>
          <Typography>
            Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </Typography>
          <Button
            sx={{
              marginTop: "1rem",
              backgroundColor: "var(--primary-color)",
              color: "var(--white-text-color)",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
                opacity: 0.8,
              },
            }}
            variant="contained"
            fullWidth
            onClick={handleCloseSuccessPopup}
          >
            Đóng
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentBox;
