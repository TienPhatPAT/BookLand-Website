import clsx from "clsx";
import classes from "./Information.module.scss";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Information() {
  const [value, setValue] = React.useState(dayjs("2024-6-8"));
  const [selectedFile, setSelectedFile] = React.useState(null);

  const inputStyle = {
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
    marginBottom: "16px",
    width: "calc(50% - 10px )",
    "&.fullWidth": {
      width: "100%",
    },
    "& label": {
      color: "#ffffff",
      fontSize: "16px",
    },
    "&:hover label": {
      color: "#a259ff",
    },
    "& .Mui-disabled": {
      color: "#ffffff !important",
      WebkitTextFillColor: "#ffffff !important",
    },
    "& .MuiInputBase-input": {
      color: "#ffffff",
      fontSize: "16px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#444", // Màu viền mặc định
      },
      "&:hover fieldset": {
        borderColor: "#888", // Màu viền khi di chuột qua
      },
      "&.Mui-focused fieldset": {
        borderColor: "#a259ff", // Màu viền khi được chọn
      },
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "#ffffff",
    },
    "& .MuiInputAdornment-root .MuiTypography-root": {
      color: "#ffffff",
      fontSize: "16px",
    },
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className={clsx(classes["info_container"], "d-flex w-100")}>
      <div className={classes["info_information-container"]}>
        <div className={clsx(classes["info_list-input"])}>
          <TextField
            sx={inputStyle}
            disabled
            label="Tên đăng nhập"
            defaultValue="namdpps35870"
            className="fullWidth"
          />
          <TextField
            sx={inputStyle}
            disabled
            label="ID người dùng"
            defaultValue="9016363"
            className="fullWidth"
          />
          <TextField
            sx={inputStyle}
            label="Họ và tên"
            defaultValue="Do Phuong Nam (FPL HCM)"
            className="fullWidth"
          />
          <div className={clsx(classes["info_input_little"], "d-flex gap-20")}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Ngày sinh"
                value={value}
                sx={inputStyle}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              sx={inputStyle}
              select
              SelectProps={{
                native: true,
              }}
              label="Giới tính"
              defaultValue="Khác"
            >
              <option
                value="Nam"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Nam
              </option>
              <option
                value="Nữ"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Nữ
              </option>
              <option
                value="Khác"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Khác
              </option>
            </TextField>
          </div>
          <div className={clsx(classes["info_manager-button"])}>
            <button
              className={clsx(
                classes["info_button"],
                classes["info_button_active"]
              )}
            >
              Cập nhật
            </button>
            <button className={clsx(classes["info_button"])}>Hủy</button>
          </div>
        </div>
      </div>
      <div className={classes["info_right"]}>
        {selectedFile ? (
          <img
            src={selectedFile}
            alt="Avatar"
            className={classes["info_avatar"]}
          />
        ) : (
          <img
            src="https://symbols.vn/wp-content/uploads/2022/01/Hinh-Anh-Luffy-Hoi-Nho-Dep-cute.jpg"
            alt="Avatar"
            className={classes["info_avatar"]}
          />
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-photo"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-photo">
          <button
            className={clsx(classes["info_button_active"])}
            onClick={() => document.getElementById('upload-photo').click()}
          >
            Thay ảnh
          </button>
        </label>
      </div>
    </div>
  );
}

export default Information;
