const Temp = () => {
  return ( 
 
    <div className={classes.top_rated}>
      <div className={classes.hashtag}>#22</div>
      <span>
        trong Top xu hướng Sách điện tử <img src={arrow} alt="" />{" "}
      </span>
    </div>
    
    <div className={classes.book_actions}>
      
    </div>
    <div className={classes.book_description}>
      {isShow ? (
        <p>{book.description}</p>
      ) : (
        <p>{book.description.substring(0, 100)}...</p>
      )}
      <button onClick={handleClick} className={classes.more_info}>
        {isShow ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
    <div className={classes.reviews}>
      <div className={classes.reviews_header}>
        <div className={classes.reviews_count}>
          {/* <span>Bình luận ({book.comments.length})</span> */}
        </div>
        <div className={classes.ratings_count}>
          {/* <h4>Đánh giá & nhận xét ({book.reviews.length})</h4> */}
        </div>
      </div>
      <div className={classes.comment_section}>
        <div className="comment_avatar">
          <img
            src="https://i.pravatar.cc/300"
            className={classes.avatar}
            alt="avatar"
          />
        </div>
        <form>
          <textarea placeholder="Viết bình luận..." />
        </form>
      </div>
      <div className={classes.reviews_list}>
        {book.reviews.map((review) => (
          <div key={review.id} className={classes.review_item}>
            <div className={classes.avt}>
              <img
                src={review.user.avatar}
                className={classes.avatar}
                alt="avatar"
              />
            </div>
            <div className={classes.review}>
              <div
                className={clsx(
                  classes.review_user,
                  "d-flex justify-content-between"
                )}
              >
                <span className={classes.user_name}>
                  {review.user.name} <img src={crown} alt="" />
                </span>
                <span className={classes.time}>{review.time}</span>
              </div>
              <div className={classes.review_content}>
                <p>{review.content}</p>
              </div>
              <div className={classes.review_actions}>
                <span className={classes.like_count}>
                  {review.likes} <img src={like} alt="" />
                </span>
                <span className={classes.reply_count}>
                  {/* <img src={unlike} alt="" /> {review.replies.length} */}
                </span>
                <span className={classes.share_icon}></span>
                <span className={classes.reply_button}>
                  <img src={comnent} alt="" /> Trả lời
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> );
}
 
export default Temp;