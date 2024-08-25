import clsx from "clsx";
import classes from "./Information.module.scss";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../../utils/api";

function Information() {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [ten, setTen] = useState("");

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

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    fetchApi(`${getApiEnv()}/nguoidung/${id}`).then((data) => {
      setProfile(data?.data);
      setTen(data?.data?.ten);
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = localStorage.getItem("idUser");
    try {
      const response = await fetch(getApiEnv() + `/nguoidung/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ten,
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
  };

  return (
    <div className={clsx(classes["info_container"], "d-flex w-100")}>
      <div className={classes["info_information-container"]}>
        <form className={clsx(classes["info_list-input"])} onSubmit={handleSubmit}>
          <TextField
            sx={inputStyle}
            disabled
            label="Email"
            value={profile?.email || ""}
            className="fullWidth"
          />
          <TextField
            sx={inputStyle}
            disabled
            label="ID người dùng"
            value={profile?._id || ""}
            className="fullWidth"
          />
          <TextField
            sx={inputStyle}
            label="Họ và tên"
            // defaultValue={profile?.ten || ""}
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            className="fullWidth"
          />
          <div className={clsx(classes["info_manager-button"])}>
            <button
              type="submit"
              style={{
                backgroundColor: "#a259ff",
                borderRadius: "8px",
              }}
              className={clsx(classes["info_button"], classes["info_button_active"])}
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className={clsx(classes["info_button"])}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      <div className={classes["info_right"]}>
        {selectedFile ? (
          <img src={selectedFile} alt="Avatar" className={classes["info_avatar"]} />
        ) : (
          <img src={profile?.avt} alt="Avatar" className={classes["info_avatar"]} />
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
            onClick={() => document.getElementById("upload-photo").click()}
          >
            Thay ảnh
          </button>
        </label>
      </div>
    </div>
  );
}

export default Information;
