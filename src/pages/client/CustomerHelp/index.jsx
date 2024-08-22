import React, { useState } from "react";
import classes from "./CustomerHelp.module.scss";

const CustomerHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý khi gửi biểu mẫu, ví dụ: gửi dữ liệu đến máy chủ
    console.log("Biểu mẫu được gửi:", formData);
    setFormStatus("success"); // Hoặc 'error' tùy theo kết quả thực tế
  };

  return (
    <div className={classes.supportPage}>
      <div className={classes.contactInfo}>
        <h2>Thông tin liên hệ</h2>
        <ul>
          <li>
            Zalo: <a href="https://zalo.me/bookland40">https://zalo.me/bookland40</a>
          </li>
          <li>Hotline: 0913.345.678</li>
          <li>
            Fanpage:{" "}
            <a href="https://www.facebook.com/thuvienebookbookland">
              https://www.facebook.com/thuvienebookbookland
            </a>
          </li>
          <li>Email: support@bookland.vn</li>
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.130135142411!2d106.61538357570342!3d10.801343658732295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b9535b60699%3A0x4737f3be8bd41d5b!2s%C3%86ON%20MALL%20Tan%20Phu%20Celadon!5e0!3m2!1sen!2s!4v1724332385159!5m2!1sen!2s"
          width="100%"
          height="550"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
      </div>
    </div>
  );
};

export default CustomerHelp;
