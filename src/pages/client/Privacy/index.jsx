import React from 'react';
import classes from './Privacy.module.scss';

const Privacy = () => {
  return (
    <div className={classes.container}>
      <h1>CHÍNH SÁCH ĐỔI / TRẢ / HOÀN TIỀN</h1>
      <p>Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Bookland.com</p>
      <p>Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách hàng khi trải nghiệm mua hàng tại Bookland.com. Do đó chúng tôi luôn cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ mọi nhu cầu mua sắm của quý khách.</p>
      <p>Bookland.com chúng tôi luôn luôn cam kết tất cả các sản phẩm bán tại Bookland.com 100% là những sản phẩm chất lượng và xuất xứ nguồn gốc rõ ràng, hợp pháp cũng như an toàn cho người tiêu dùng. Để việc mua sắm của quý khách tại Bookland.com là trải nghiệm dịch vụ thân thiện, chúng tôi hy vọng quý khách sẽ kiểm tra kỹ các nội dung sau trước khi nhận hàng:</p>
      <ul>
        <li>Thông tin sản phẩm: tên sản phẩm và chất lượng sản phẩm.</li>
        <li>Số lượng sản phẩm.</li>
      </ul>
      <p>Trong trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết, hư hỏng hoặc không như mô tả, Bookland.com cam kết bảo vệ khách hàng bằng chính sách đổi trả/ hoàn tiền trên tinh thần bảo vệ quyền lợi người tiêu dùng nhằm cam kết với quý khách về chất lượng sản phẩm và dịch vụ của chúng tôi.</p>
      <p>Khi quý khách hàng có hàng hóa mua tại Bookland.com cần đổi/ trả/bảo hành/hoàn tiền, xin quý khách hàng liên hệ với chúng tôi qua hotline 1900636467 hoặc truy cập <a href="https://Bookland.com/chinh-sach-doi-tra-hang" target="_blank" rel="noopener noreferrer">Bookland.com/chinh-sach-doi-tra-hang</a> để tìm hiểu thêm về chính sách đổi/trả:</p>

      <h2>1. Thời gian áp dụng đổi/trả</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th></th>
            <th>Sản phẩm lỗi (do nhà cung cấp)</th>
            <th>Sản phẩm không lỗi (*)</th>
            <th>Sản phẩm lỗi do người sử dụng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sản phẩm Điện tử, Đồ chơi điện - điện tử, điện gia dụng,... (có tem phiếu bảo hành từ nhà cung cấp)</td>
            <td>7 ngày đầu tiên<br />Đổi mới</td>
            <td>Trả hàng không thu phí</td>
            <td>Bảo hành hoặc sửa chữa có thu phí theo quy định của nhà cung cấp.</td>
            <td>Trả không thu phí</td>
          </tr>
          <tr>
            <td></td>
            <td>8 - 30 ngày<br />Bảo hành</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>30 ngày trở đi<br />Bảo hành</td>
            <td>Không hỗ trợ đổi/ trả</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Voucher/ E-voucher</td>
            <td>30 ngày đầu tiên<br />Đổi mới</td>
            <td>Không hỗ trợ đổi/ trả</td>
            <td>Không hỗ trợ đổi/ trả</td>
            <td>Trả hàng không thu phí</td>
          </tr>
          <tr>
            <td></td>
            <td>30 ngày trở đi<br />Không hỗ trợ đổi trả</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Đối với các ngành hàng còn lại</td>
            <td>30 ngày đầu tiên<br />Đổi mới</td>
            <td>Trả hàng không thu phí</td>
            <td>Không hỗ trợ đổi/ trả</td>
            <td>Trả không thu phí</td>
          </tr>
          <tr>
            <td></td>
            <td>30 ngày trở đi<br />Không hỗ trợ đổi/ trả</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>Quý khách vui lòng thông báo về cho Bookland.com ngay khi:</p>
      <ul>
        <li>Kiện hàng giao tới ngoại quan bên ngoài có dấu hiệu hư hại, sản phẩm bên trong trầy xước, gãy bìa, rách, móp méo, ướt, bể vỡ... trong vòng 2 ngày kể từ khi nhận hàng thành công.</li>
        <li>Sản phẩm giao tới bị sai hàng, giao thiếu hàng trong vòng 2 ngày kể từ khi nhận hàng thành công.</li>
      </ul>
      <p>Sau khi Bookland.com xác nhận mail tiếp nhận yêu cầu kiểm tra xử lý, Bookland.com sẽ liên hệ đến quý khách để xác nhận thông tin hoặc nhờ bổ sung thông tin (nếu có). Trường hợp không liên hệ được Bookland.com rất tiếc xin được phép từ chối xử lý yêu cầu. Thời gian Bookland.com liên hệ trong giờ hành chính tối đa 3 lần trong vòng 7 ngày sau khi nhận thông tin yêu cầu.</p>
      <p>Chúng tôi sẽ kiểm tra các trường hợp trên và giải quyết cho quý khách tối đa trong 30 ngày làm việc kể từ khi quý khách nhận được hàng, quá thời hạn trên rất tiếc chúng tôi không giải quyết khiếu nại.</p>

      <h2>2. Các trường hợp yêu cầu đổi trả</h2>
      <ul>
        <li>Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung, sản phẩm điện tử, đồ chơi điện – điện tử không hoạt động..)</li>
        <li>Giao nhầm/ giao thiếu (thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo)</li>
        <li>Chất lượng hàng hóa kém, hư hại do vận chuyển.</li>
        <li>Hình thức sản phẩm không giống mô tả ban đầu.</li>
        <li>Quý khách đặt nhầm/ không còn nhu cầu (*)</li>
      </ul>
      <p><strong>(*) Đối với các Sản phẩm không bị lỗi, chỉ áp dụng khi sản phẩm đáp ứng đủ điều kiện sau:</strong></p>
      <ul>
        <li>Quý khách có thể trả lại sản phẩm đã mua tại Bookland.com trong vòng 30 ngày kể từ khi nhận hàng với đa số sản phẩm khi thỏa mãn các điều kiện sau:</li>
        <li>Sản phẩm không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hay niêm phong của nhà sản xuất.</li>
        <li>Sản phẩm còn đầy đủ phụ kiện hoặc phiếu bảo hành cùng quà tặng kèm theo (nếu có).</li>
        <li>Nếu là sản phẩm điện – điện tử thì chưa bị kích hoạt, chưa có sao ghi dữ liệu vào thiết bị.</li>
      </ul>

      <h2>3. Điều kiện đổi trả</h2>
      <p>Bookland.com hỗ trợ đổi/ trả sản phẩm cho quý khách nếu:</p>
      <ul>
        <li>Sản phẩm còn nguyên bao bì như hiện trạng ban đầu.</li>
        <li>Sản phẩm còn đầy đủ phụ kiện, quà tặng khuyến mãi kèm theo.</li>
        <li>Hóa đơn GTGT (nếu có).</li>
        <li>Cung cấp đầy đủ thông tin đối chứng theo yêu cầu (điều 4).</li>
      </ul>

      <h2>4. Quy trình đổi trả</h2>
      <p>Quý khách vui lòng thông tin đơn hàng cần hỗ trợ đổi trả theo Hotline 1900636467 hoặc email về địa chỉ: <a href="mailto:cskh@Bookland.com.vn">cskh@Bookland.com.vn</a> với tiêu đề “Đổi Trả Đơn Hàng Mã đơn hàng”.</p>
      <p>Quý khách cần cung cấp đính kèm thêm các bằng chứng để đối chiếu/ khiếu nại sau:</p>
      <ul>
        <li>Video clip quay rõ các mặt của kiện hàng trước khi khui để thể hiện tình trạng của kiện hàng.</li>
        <li>Video clip mở kiện hàng từ lúc bắt đầu khui ngoại quan đến kiểm tra sản phẩm bên trong thùng hàng.</li>
        <li>Video quay rõ nét, không mờ, nhoè, thể hiện đầy đủ thông tin mã đơn hàng và quay cận cảnh lỗi của sản phẩm.</li>
        <li>Hình chụp tem kiện hàng có thể hiện mã đơn hàng.</li>
        <li>Hình chụp tình trạng ngoại quan (băng keo, seal, hình dạng thùng hàng, bao bì), đặc biệt các vị trí nghi ngờ có tác động đến sản phẩm (móp méo, ướt, rách...)</li>
        <li>Hình chụp tình trạng sản phẩm bên trong, nêu rõ lỗi kỹ thuật nếu có.</li>
      </ul>
      <p>Để đảm bảo quyền lợi khách hàng và để Bookland.com có cơ sở làm việc với các bộ phận liên quan, tất cả yêu cầu đổi/ trả/ bảo hành quý khách cần cung cấp hình ảnh/ clip sản phẩm lỗi. Quá thời gian đổi/ trả sản phẩm nếu chưa nhận được đủ hình ảnh/ clip từ quý khách, Bookland.com xin phép từ chối hỗ trợ.</p>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Nội dung</th>
            <th>Cách thức giải quyết</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung, sản phẩm điện tử không hoạt động..)</td>
            <td>
              Bookland.com có sản phẩm → đổi mới cùng sản phẩm<br />
              Bookland.com hết hàng → Hoàn tiền hoặc quý khách có thể chọn mặt hàng khác tại website <a href="https://www.Bookland.com" target="_blank" rel="noopener noreferrer">www.Bookland.com</a>.<br />
              Đổi/trả không thu phí
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sản phẩm hỏng do quý khách</td>
            <td>Không hỗ trợ đổi/ trả</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Lý do đổi/trả sản phẩm như: khách đặt nhầm hoặc không còn nhu cầu.</td>
            <td>
              Hỗ trợ thu hồi và hoàn tiền 100% giá trị sản phẩm cho quý khách hàng.<br />
              <strong>Lưu ý: Bookland.com rất tiếc sẽ không hỗ trợ hoàn lại chi phí vận chuyển trong đơn hàng cho trường hợp này.</strong><br />
              Đổi/trả không thu phí
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Giao nhầm/ giao thiếu (thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo)</td>
            <td>
              Giao nhầm → Đổi lại đúng sản phẩm đã đặt.<br />
              Giao thiếu → Giao bù thêm số lượng còn thiếu theo đơn hàng.<br />
              Đổi/trả không thu phí
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Chất lượng hàng hóa kém do vận chuyển</td>
            <td>
              Khi quý khách hàng nhận gói hàng bị móp méo, ướt, chúng tôi khuyến cáo khách hàng nên kiểm tra thực tế hàng hóa bên trong ngay thời điểm nhận hàng, vui lòng phản ánh hiện trạng hàng hóa lên bill nhận hàng từ phía nhân viên giao nhận và liên lạc với chúng tôi về hotline 1900-636467 trong vòng 48 giờ để được hỗ trợ giải quyết cụ thể.<br />
              Đổi/trả không thu phí
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Hình thức sản phẩm không giống mô tả ban đầu</td>
            <td>
              Hãy liên hệ với chúng tôi qua số hotline 1900636467, chúng tôi sẵn sàng lắng nghe và giải quyết cho bạn (cụ thể theo từng trường hợp).<br />
              Đổi/trả không thu phí
            </td>
          </tr>
        </tbody>
      </table>

      <h2>5. Cách thức chuyển sản phẩm đổi trả về Bookland.com</h2>
      <p>Khi yêu cầu đổi trả được giải quyết, quý khách vui lòng đóng gói sản phẩm như hiện trạng khi nhận hàng ban đầu (bao gồm sản phẩm, quà tặng, phụ kiện kèm theo sản phẩm,…nếu có).</p>
      <ul>
        <li>Hóa đơn giá trị gia tăng của Bookland.com (nếu có).</li>
        <li>Phụ kiện đi kèm sản phẩm và quà tặng khuyến mãi kèm theo (nếu có).</li>
        <li>Quý khách cần quay video clip đóng gói sản phẩm để làm bằng chứng đối chiếu/ khiếu nại liên quan đến đổi trả về sau (nếu cần).</li>
        <li>Quý khách vui lòng chịu trách nhiệm về trạng thái nguyên vẹn của sản phẩm khi gửi về Bookland.com.</li>
      </ul>
      <p>Sau khi nhận được sản phẩm quý khách gửi về, Bookland.com sẽ phản hồi và cập nhật thông tin trên từng giai đoạn xử lý đến quý khách qua điện thoại/email.</p>
      <p><strong>Lưu ý khác:</strong></p>
      <ul>
        <li>Các sản phẩm thuộc "Phiên chợ sách cũ", "Sách cũ đồng giá" sẽ không được áp dụng chính sách đổi trả của Bookland.com.</li>
        <li>Nếu quý khách hủy đơn hàng cũ, đã thanh toán thành công, mà không có nhu cầu đặt lại đơn hàng khác, hoặc quý khách yêu cầu trả hàng hoàn tiền → chúng tôi sẽ hoàn tiền lại cho quý khách qua hình thức thanh toán ban đầu, đối với các đơn hàng quý khách thanh toán bằng tiền mặt sẽ được hoàn qua tài khoản Ngân hàng do quý khách chỉ định. Thời gian hoàn tiền được quy định tại Điều 6.</li>
        <li>Không áp dụng đổi / trả / hoàn tiền đối với mặt hàng Chăm Sóc Cá Nhân và các Đơn Hàng Bán Sỉ.</li>
      </ul>

      <h2>6. Thời gian hoàn tiền</h2>
      <p>Đối với những đơn hàng thanh toán trả trước: sau khi cập nhật hủy, thời gian hoàn tiền sẽ tùy thuộc vào phương thức thanh toán. Quý khách vui lòng tham khảo thời gian hoàn tiền như sau:</p>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Phương thức thanh toán</th>
            <th>Thời gian hoàn tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ATM nội địa/ Cổng Zalo Pay/ Cổng VNPay</td>
            <td>5 - 7 ngày làm việc</td>
          </tr>
          <tr>
            <td>Chuyển khoản</td>
            <td>5 - 7 ngày làm việc</td>
          </tr>
          <tr>
            <td>Visa/ Master/ JCB</td>
            <td>5 - 7 ngày làm việc (*)</td>
          </tr>
          <tr>
            <td>Ví Momo/ Moca/Zalopay/ShopeePay</td>
            <td>1 - 3 ngày làm việc</td>
          </tr>
          <tr>
            <td>Fpoint</td>
            <td>24 giờ</td>
          </tr>
        </tbody>
      </table>
      <p><strong>(*) Lưu ý:</strong></p>
      <ul>
        <li>Đối với thẻ Visa/ Master/ JCB, số tiền hoàn sẽ được ngân hàng chuyển vào tài khoản quý khách dao động 1-3 tuần làm việc (tùy theo chính sách của từng ngân hàng).</li>
        <li>Ngày làm việc không bao gồm thứ 7, chủ nhật và ngày lễ.</li>
      </ul>
      <p>Đối với những đơn hàng thanh toán khi nhận hàng, Bookland.com sẽ hoàn tiền qua tài khoản Ngân hàng do quý khách chỉ định trong vòng 7 ngày làm việc.</p>

      <h2>7. Thông tin liên hệ</h2>
      <p>Để được tư vấn và hỗ trợ về chính sách đổi trả, quý khách vui lòng liên hệ với chúng tôi qua:</p>
      <ul>
        <li>Hotline: 1900 636 467</li>
        <li>Email: <a href="mailto:cskh@Bookland.com.vn">cskh@Bookland.com.vn</a></li>
      </ul>
    </div>
  );
};

export default Privacy;
