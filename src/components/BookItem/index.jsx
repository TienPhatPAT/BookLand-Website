import clsx from "clsx";
import classes from "./BookItem.module.scss";
import freeIcon from "../../assets/icons/free_gradient.svg";
import cartIcon from "../../assets/icons/Cart_check_gradient.svg";
import membershipIcon from "../../assets/icons/crown_gradient.svg";
import { formatMoney } from "../../utils/string";
import Image from "../Image";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const BookItem = ({
  cover = false,
  name = false,
  label = false,
  progress = false,
  type = false,
  id = "#",
  isMargin = true,
}) => {
  return (
    <>
      <Link
        to={"/book/" + id}
        className={clsx(classes.bookItem, {
          [classes.bookItem__noMargin]: !isMargin,
        })}
      >
        {cover && (
          <Image className={classes.cover} url={cover}>
            {progress && (
              <div
                className={classes.progress}
                style={{ "--progress-value": progress + "%" }}
              ></div>
            )}
            {label && (
              <div
                className={clsx(classes.label, {
                  [classes.label_free]: label === "free",
                  [classes.label_membership]: label === "membership",
                  [classes.label_price]: label !== "free" && label !== "membership",
                })}
              >
                {label === "free" && (
                  <div className={classes.free}>
                    <span className={classes.text}>Miễn phí</span>
                    <div className={classes.icon}>
                      <img src={freeIcon} alt="" />
                    </div>
                  </div>
                )}
                {label === "membership" && (
                  <div className={classes.membership}>
                    <span className={classes.text}>Gói hội viên</span>
                    <div className={classes.icon}>
                      <img src={membershipIcon} alt="" />
                    </div>
                  </div>
                )}
                {label !== "free" && label !== "membership" && (
                  <div className={classes.price}>
                    <span className={classes.text}>{formatMoney(label)}Đ</span>
                    <div className={classes.icon}>
                      <img src={cartIcon} alt="" />
                    </div>
                  </div>
                )}
              </div>
            )}
            {type && <div className={classes.type}></div>}
          </Image>
        )}
        {name && (
          <Typography noWrap className={classes.name}>
            {name}
          </Typography>
        )}
      </Link>
    </>
  );
};

export default BookItem;
