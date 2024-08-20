import { Link } from "react-router-dom";
import Image from "../Image";
import classes from "./TypeItem.module.scss";

const TypeItem = ({ image, label, id }) => {
  return (
    <Link to={"/type/" + id} className={classes.typeItem}>
      <Image className={classes.img} url={image}></Image>
      <span className={classes.label}>{label}</span>
    </Link>
  );
};

export default TypeItem;
