import { Typography } from "@mui/material";
import classes from "./Text.module.scss";

const Text = ({ size, weight, color, children, ...props }) => {
  var textStyle = {
    "--size": size,
    "--weight": weight,
    "--color": color,
  };
  return (
    <Typography className={classes.text} style={textStyle} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
