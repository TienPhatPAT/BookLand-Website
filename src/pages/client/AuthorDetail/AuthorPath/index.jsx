import classes from "./AuthorPath.module.scss";
import { Link } from "react-router-dom";

const AuthorPath = ({ name, profilePicture, id, description }) => {
  return (
    <Link to={`/authors/${id}`}>
      <div className={classes.AuthorPath} >
        <img src={profilePicture} alt={name} className={classes.profilePicture} />
        <div className={classes.label}>{name}</div>
        <p className={classes.title}>{description}</p>
      </div>
    </Link>
  );
};

export default AuthorPath;
