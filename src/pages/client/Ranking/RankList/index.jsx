import classes from "./RankList.module.scss";
import Image from "../../../../components/Image";
import clsx from "clsx";
import * as Icon from "../../../../components/Icon";
import { Typography } from "@mui/material";
import StarBar from "../../../../components/StarBar";
import { abbreviateNumber } from "../../../../utils/string";
import { Link, useNavigate } from "react-router-dom";
import { increaseQuantityById } from "../../../../services/Cart";

const RankList = ({ bookList, setCurrentLabel, newLabel }) => {
  const navigate = useNavigate();
  setCurrentLabel(newLabel);
  return (
    <div className={classes.rankList}>
      {bookList.map((book, index) => {
        return (
          <div key={index} className={classes.rankListItem}>
            <div className={clsx(classes.number, "col-1")}>
              {index + 1 > 3 ? (
                index + 1
              ) : (
                <>
                  {index + 1 === 1 && <Icon.RankingNumber type={1} />}
                  {index + 1 === 2 && <Icon.RankingNumber type={2} />}
                  {index + 1 === 3 && <Icon.RankingNumber type={3} />}
                </>
              )}
            </div>
            <Image className={classes.cover} url={book.img}>
              <Link to={"/book/" + book._id}>
                <div></div>
              </Link>
            </Image>
            <div className={classes.nameWrapper}>
              <Link to={"/book/" + book._id}>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "500",
                    color: "#fff",
                  }}
                >
                  {book.ten}
                </Typography>
              </Link>
              {/* <StarBar starCount={book.__v}></StarBar> */}
            </div>
            <div className={clsx(classes.author, "col-2 d-flex justify-content-center")}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  color: "var(--light-gray-text-color)",
                }}
              >
                {book.author}
              </Typography>
            </div>
            <div className={clsx(classes.tool, "col-3  d-flex justify-content-end")}>
              <div
                className={classes.toolItem}
                onClick={() => {
                  location.reload();
                  increaseQuantityById(book._id);
                }}
              >
                <Icon.CartBagIcon
                  type="light"
                  color="var(--gray-text-color)"
                  height="2.5rem"
                  width="auto"
                />
                <span className={classes.label}>{abbreviateNumber(book.sold, 0)}</span>
              </div>
              <div className={classes.toolItem} onClick={() => navigate("/book/" + book._id)}>
                <Icon.EyeIcon
                  type="light"
                  color="var(--gray-text-color)"
                  height="2.5rem"
                  width="auto"
                />
                <span className={classes.label}>{abbreviateNumber(book.view, 0)}</span>
              </div>
              <div className={classes.toolItem}>
                <Icon.HeartIcon
                  type="light"
                  color="var(--gray-text-color)"
                  height="2.5rem"
                  width="auto"
                />
                <span className={classes.label}>{abbreviateNumber(book.favorite, 0)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RankList;
