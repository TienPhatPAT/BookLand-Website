import React, { useState } from 'react';
import classes from './CustomerHelp.module.scss';

const CustomerHelp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý khi gửi biểu mẫu, ví dụ: gửi dữ liệu đến máy chủ
    console.log('Biểu mẫu được gửi:', formData);
    setFormStatus('success'); // Hoặc 'error' tùy theo kết quả thực tế
  };

  return (
    <div className={classes.supportPage}>
      <div className={classes.contactInfo}>
        <h2>Thông tin liên hệ</h2>
        <ul>
          <li>Zalo: <a href="https://zalo.me/bookland40">https://zalo.me/bookland40</a></li>
          <li>Hotline: 0913.345.678</li>
          <li>Fanpage: <a href="https://www.facebook.com/thuvienebookbookland">https://www.facebook.com/thuvienebookbookland</a></li>
          <li>Email: support@bookland.vn</li>
        </ul>
      </div>

      <div className={classes.faq}>
        <h2>Câu hỏi thường gặp</h2>
        <div className={classes.faqItem}>
          <h3 className={classes.faqQuestion}>Làm thế nào để đăng ký thành viên bookland?</h3>
          <p className={classes.faqAnswer}>Bạn có thể đăng ký thông qua ứng dụng bookland hoặc trang web bằng nhiều hình thức thanh toán như Apple Store, Google Play, ví điện tử, thẻ ngân hàng hoặc SMS.</p>
        </div>
        <div className={classes.faqItem}>
          <h3 className={classes.faqQuestion}>Gói hội viên bookland bao gồm những gì?</h3>
          <p className={classes.faqAnswer}>Gói hội viên bao gồm quyền truy cập không giới hạn vào ebook và audiobook có sẵn trong thư viện bookland. Không bao gồm sách bán lẻ, combo hoặc sách từ bộ sưu tập Hiệu Sồi.</p>
        </div>
        {/* Thêm các câu hỏi thường gặp khác ở đây */}
      </div>

      <div className={classes.contactForm}>
        <h2>Liên hệ với chúng tôi</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="message">Nội dung tin nhắn</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Gửi</button>
          {formStatus && (
            <p className={formStatus === 'success' ? classes.successMessage : classes.errorMessage}>
              {formStatus === 'success' ? 'Gửi thành công!' : 'Có lỗi xảy ra, vui lòng thử lại.'}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerHelp;
