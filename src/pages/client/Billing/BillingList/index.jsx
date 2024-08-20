import clsx from "clsx";
import classes from "./BillingList.module.scss";
import Image from "../../../../components/Image";
import { formatMoney } from "../../../../utils/string";

const BillingList = ({ billingList = [] }) => {
  return (
    <div className={classes.billing}>
      {/* <div className={classes.pending_payment}></div> */}
      <div className={classes.processing}>
        {billingList
          .sort((a, b) => b.order_date - a.order_date)
          // .sort((a, b) => a.order_date - b.order_date)
          .map((item, index) => {
            return (
              <div key={index} className={classes.processing_total}>
                <div className={classes.title}>
                  {item.status === 1 && <p>Chờ thanh toán</p>}
                  {item.status === 2 && <p>Đang giao hàng</p>}
                  {item.status === 3 && <p>Đã giao</p>}
                  {item.status === 4 && <p>Đã hủy</p>}
                  {item.status === 5 && <p>Hoàn trả</p>}
                </div>
                {item.books.map((book, index) => {
                  return (
                    <div className={clsx(classes.box_product, "d-flex")}>
                      <div key={index} className={classes.img}>
                        <Image url={book.img} className={classes.image}>
                          <div></div>
                        </Image>
                      </div>
                      <div className={classes.info}>
                        <div className={classes.name_author}>
                          <h2>{book.name}</h2>
                          <p>{book.author}</p>
                        </div>
                        <div className={classes.price_amount}>
                          <h2>{formatMoney(book.price)} VNĐ</h2>
                          <p>{book.quantity} x</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className={classes.more}>
                  <p>Xem Chi Tiết</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={classes.Cancelled}></div>
    </div>
  );
};

export default BillingList;
