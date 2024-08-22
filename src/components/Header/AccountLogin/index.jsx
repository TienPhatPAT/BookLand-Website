import clsx from "clsx";
import { isAuthenticated } from "../../../services/AuthService";
import classes from "./AccountLogin.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccountLogin = ({ loginBox, setLoginBox, setSignUpBox }) => {
  const isLogin = isAuthenticated();

  const navigate = useNavigate();

  const onClickLoginBtnHandle = () => {
    if (isLogin) navigate("/setting");
    else setLoginBox(true);
  };

  return (
    <div className={classes.loginBox}>
      <Button onClick={onClickLoginBtnHandle} className={clsx(classes.btn, classes.loginBtn)}>
        <div className={classes.defaultAvatar}> </div>
      </Button>
    </div>
  );
};

export default AccountLogin;
