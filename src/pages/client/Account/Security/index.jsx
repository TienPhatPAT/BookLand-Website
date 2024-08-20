import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#fff",
          fontSize: "20px",
        }}
      >
        Tài khoản và bảo mật
      </Typography>

      <Box
        component="form"
        sx={{
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "16px",
            fontSize: "15px",
            color: "#fff",
          }}
        >
          Thay đổi mật khẩu
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <TextField
            label="Mật khẩu hiện tại"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "16px",
              "& .MuiInputLabel-root": {
                color: "#aaa",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a259ff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontSize: "16px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  aria-label="toggle password visibility"
                  sx={{ color: "#888" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <TextField
            label="Mật khẩu mới"
            type={showNewPassword ? "text" : "password"}
            variant="outlined"
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "16px",
              "& .MuiInputLabel-root": {
                color: "#aaa",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a259ff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontSize: "16px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onClick={handleClickShowNewPassword}
                  aria-label="toggle password visibility"
                  sx={{ color: "#888" }}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <TextField
            label="Nhập lại mật khẩu mới"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "16px",
              "& .MuiInputLabel-root": {
                color: "#aaa",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a259ff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontSize: "16px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onClick={handleClickShowConfirmPassword}
                  aria-label="toggle password visibility"
                  sx={{ color: "#888" }}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            marginTop: "16px",
            fontSize: "16px", // Updated font size for the button text
            backgroundColor: "#a259ff",
          }}
        >
          Cập nhật mật khẩu
        </Button>

        <Divider
          sx={{
            margin: "20px 0",
            backgroundColor: "#444",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            color: "#aaa",
            textAlign: "center",
          }}
        >
          Bạn không có nhu cầu sử dụng tài khoản nữa?{" "}
          <Button
            variant="contained"
            sx={{
              fontSize: "12px",
              marginLeft: "8px",
              backgroundColor: "#a259ff",
            }}
            onClick={() => alert("Đăng xuất")}
          >
            Đăng Xuất
          </Button>
        </Typography>
      </Box>
    </div>
  );
};

export default Security;
