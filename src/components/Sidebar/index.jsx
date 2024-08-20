import clsx from "clsx";
import { Link } from "react-router-dom";
import classes from "./Sidebar.module.scss";
import lightIcon from "../../assets/icons/lights.svg";
import SidebarItem from "./SidebarItem";
import * as Icon from "../Icon";
import SidebarLine from "./SidebarLine";

const Sidebar = () => {
  return (
    <>
      <div className={clsx(classes.sidebar, classes.dummy)}></div>
      <div className={classes.sidebar}>
        <div className={classes.logoWrapper}>
          <div className={classes.light}>
            <img src={lightIcon} alt="" />
          </div>
          <Link className={classes.logo} to="/">
            <Icon.Logo></Icon.Logo>
          </Link>
        </div>
        <SidebarItem
          label="Trang chủ"
          icon={
            <Icon.BookIconV2
              type="light"
              height="2.2rem"
              width="2.5rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/home"
          activeLink={["/book"]}
        />
        <SidebarItem
          label="Giỏ hàng"
          icon={
            <Icon.EarthIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/cart"
        />
        <SidebarItem
          label="Thể loại sách"
          icon={
            <Icon.TypeIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/type"
        />
        <SidebarLine></SidebarLine>
        <SidebarItem
          label="BXH Sách mới"
          icon={
            <Icon.CupIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/ranking"
        />
        <SidebarItem
          label="Sách yêu thích"
          icon={
            <Icon.HeartIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/favorite-book"
        />
        <SidebarItem
          label="Đơn hàng đã mua"
          icon={
            <Icon.HistoryIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/billing"
        />
        <SidebarLine></SidebarLine>
        <SidebarItem
          label="Hỗ trợ khách hàng"
          icon={
            <Icon.PhoneIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/customer-help"
        />
        <SidebarItem
          label="Chính sách"
          icon={
            <Icon.SecurityIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/privacy"
        />
        <SidebarItem
          label="Cài đặt"
          icon={
            <Icon.SettingIcon
              type="light"
              height="2.2rem"
              width="2.2rem"
              color="var(--sidebar-text-color)"
            />
          }
          to="/setting"
        />
      </div>
    </>
  );
};

export default Sidebar;
