import classes from "./TypePath.module.scss";
import { Link } from "react-router-dom";

const TypePath = ({ name, img, id }) => {
  return (
    <Link to={"/type/" + id}>
      <div className={classes.typePath} url={img}>
        <div className={classes.label}>{name}</div>
      </div>
    </Link>
  );
};

export default TypePath;
