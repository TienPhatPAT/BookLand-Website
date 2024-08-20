import { Link } from "react-router-dom";
import classes from "./BookListHeading.module.scss";
import * as Icon from "../../components/Icon";

const BookListHeading = ({ label = "", to = "", icon = "" }) => {
  let isHaveIcon = false;
  if (icon !== "") isHaveIcon = true;
  return (
    <>
      {!to && (
        <div className={classes.heading}>
          {isHaveIcon && <div className={classes.icon}>{icon}</div>}
          {label}
        </div>
      )}
      {to && (
        <div className={classes.heading}>
          <Link to={to}>
            {isHaveIcon && <div className={classes.icon}>{icon}</div>}
            {label}
            <Icon.Arrowleft height={14} color="#fff" />
          </Link>
        </div>
      )}
    </>
  );
};

export default BookListHeading;
