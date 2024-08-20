import clsx from "clsx";
import { isAuthenticated } from "../../../services/AuthService";
import classes from "./AccountLogin.module.scss";
import { Button } from "@mui/material";

const AccountLogin = ({ loginBox, setLoginBox, setSignUpBox }) => {
  const isLogin = isAuthenticated();

  const onClickLoginBtnHandle = () => {
    setLoginBox(true);
  };

  return (
    <div className={classes.loginBox}>
      {isLogin && <span className={classes.avt}></span>}
      {!isLogin && (
        <>
          <Button onClick={onClickLoginBtnHandle} className={clsx(classes.btn, classes.loginBtn)}>
            <div className={classes.defaultAvatar}> </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default AccountLogin;
