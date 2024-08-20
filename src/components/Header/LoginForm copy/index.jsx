import { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import classes from "./LoginForm.module.scss";
// import logo from "../../../assets/images/";
import * as Icon from "../../Icon";
import { getApiEnv } from "../../../utils/api";

const LoginForm = ({ setLoginBox }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle = {
    marginTop: "1rem",
    marginBottom: 0,
    input: {
      color: "var(--light-gray-text-color)",
      fontSize: "1.3rem",
      fontWeight: "500",
      // padding: "2rem",
      // height: "4rem ! important",
      // boxSizing: "border-box",
    },
    label: {
      color: "var(--light-gray-text-color)",
      display: "flex",
      alignItems: "center",
      fontSize: "1.3rem",
      fontWeight: "500",
      // marginLeft: "1rem",
      // backgroundColor: "rgba(12, 12, 12, .3)",
      // backdropFilter: "blur(6px)",
      // padding: "1rem",
    },

    legend: { backgroundColor: "#fff !important" },

    "& .Mui-focused": {
      color: "var(--gray-text-color) !important",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(var(--gray-text-color-rgb), .3)", // Màu border khi không focus
        borderRadius: "100px !important",
        // padding: "1rem",
      },
      "&:hover fieldset": {
        borderColor: "rgba(var(--gray-text-color-rgb), .4)", // Màu border khi hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(var(--gray-text-color-rgb), .5)", // Màu border khi focus
      },
    },

    "& .MuiFormLabel-asterisk": {
      color: "rgba(var(--red-text-color), .5)", // Màu sắc của dấu *
    },
  };

  const onCloseLoginForm = () => {
    setLoginBox(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(getApiEnv() + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          matkhau: password,
        }),
      });

      if (response.ok) {
        // Đăng nhập thành công
        const data = await response.json();
        console.log("Đăng nhập thành công:", data);
      } else {
        // Đăng nhập thất bại
        const errorData = await response.json();
        alert("Đăng nhập thất bại: " + errorData.message);
      }
    } catch (error) {
      alert("Lỗi khi gửi yêu cầu đăng nhập: " + error.message);
    }
  };

  return (
    <div onClick={onCloseLoginForm} className={classes.loginForm}>
      {/* <Container
        className={classes.form}
        maxWidth="sm"
      > */}
      <Box
        className={classes.form}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon.Logo width="100px" />
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputStyle}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyle}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            sx={{
              backgroundColor: "var(--primary-color) !important",
              borderRadius: "100px !important",
              fontSize: "1.3rem !important",
              fontWeight: "500",
              marginTop: "2rem",
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
      {/* </Container> */}
    </div>
  );
};

export default LoginForm;
