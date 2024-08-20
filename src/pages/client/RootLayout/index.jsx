import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "./RootLayout.module.scss";
import { useState } from "react";
import LoginForm from "../../../components/Header/LoginForm";
import SignUpForm from "../../../components/Header/SignUpForm";

const RootLayout = () => {
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false);
  const [loginBox, setLoginBox] = useState("");
  const [signUpBox, setSignUpBox] = useState("");

  console.log(signUpBox, "ddd");

  const onClickOutsideHandle = () => {
    setIsShowSearchBox(false);
    setIsOpenSearchAdvance(false);
  };

  return (
    <div onClick={onClickOutsideHandle} className={classes.rootLayout}>
      <Sidebar></Sidebar>
      <div className={classes.mainContain}>
        <Header
          isShowSearchBox={isShowSearchBox}
          setIsShowSearchBox={setIsShowSearchBox}
          isOpenAdvance={isOpenSearchAdvance}
          setIsOpenAdvance={setIsOpenSearchAdvance}
          loginBox={loginBox}
          setLoginBox={setLoginBox}
          setSignUpBox={setSignUpBox}
        ></Header>
        <Outlet></Outlet>
        {loginBox && <LoginForm setLoginBox={setLoginBox} setSignUpBox={setSignUpBox} />}
        {signUpBox && <SignUpForm setSignUpBox={setSignUpBox} setLoginBox={setLoginBox} />}
      </div>
    </div>
  );
};

export default RootLayout;
