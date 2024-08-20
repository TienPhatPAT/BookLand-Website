import classes from "./TypeItem.module.scss";
import Image from "../../../../components/Image";
import { Link } from "react-router-dom";

const TypeItem = ({ ten, img, _id }) => {
  return (
    <Image className={classes.background} url={img}>
      <Link to={"/type/" + _id}>
        <div className={classes.typeItem}>
          <div className={classes.label}>{ten || "Tất Cả"}</div>
        </div>
      </Link>
    </Image>
  );
};

export default TypeItem;
