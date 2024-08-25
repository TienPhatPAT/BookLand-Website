import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { getApiEnv } from "../../../../utils/api";

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: "Mật khẩu xác nhận không đúng" });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPassword, password, confirmPassword]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = !!Object.values(error).some((err) => err !== "");
    if (hasErrors || !currentPassword || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ");
    } else {
      const id = localStorage.getItem("idUser");
      try {
        const response = await fetch(getApiEnv() + `/nguoidung/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matkhau: confirmPassword,
          }),
        });

        if (response.ok) {
          alert("Câp nhật thành công:");
        } else {
          const errorData = await response.json();
          alert("Câp nhật thất bại: " + errorData.message);
        }
      } catch (error) {
        alert("Lỗi khi gửi yêu cầu: " + error.message);
      }
    }
  };

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
        sx={{
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setCurrentPassword(e.target.value)}
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
            {error?.currentPassword && (
              <Typography sx={{ fontSize: "14px", marginTop: "10px" }} color="red">
                {error.currentPassword}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <TextField
              label="Mật khẩu mới"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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
            {error?.password && (
              <Typography sx={{ fontSize: "14px", marginTop: "10px" }} color="red">
                {error.password}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <TextField
              label="Nhập lại mật khẩu mới"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {error?.confirmPassword && (
              <Typography sx={{ fontSize: "14px", marginTop: "10px" }} color="red">
                {error.confirmPassword}
              </Typography>
            )}
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{
              marginTop: "16px",
              fontSize: "16px", // Updated font size for the button text
              backgroundColor: "#a259ff !important",
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
              onClick={() => {
                navigator("/home");
                localStorage.removeItem("token");
                localStorage.removeItem("idUser");
                window.location.reload();
              }}
            >
              Đăng Xuất
            </Button>
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default Security;
