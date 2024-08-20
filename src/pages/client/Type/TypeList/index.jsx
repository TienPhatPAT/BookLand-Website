import { Button } from "@mui/material";
import TypeItem from "../TypeItem";
import classes from "./TypeList.module.scss";
import clsx from "clsx";
import { useState } from "react";

const TypeList = ({ row = 3, col = 4, typeList = [] }) => {
  const [isShowAll, setIsShowAll] = useState(true);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className={clsx(classes.typeList, "w-100")} style={{ "--col": col }}>
        <TypeItem
          name="Tất cả"
          id="tat-ca"
          img="https://static.vecteezy.com/system/resources/previews/000/518/751/original/vector-black-triangular-abstract-texture-low-light-background.jpg"
        />
        {!isShowAll &&
          typeList.slice(0, row * col).map((item, index) => {
            return <TypeItem key={index} {...item} />;
          })}
        {isShowAll &&
          typeList.map((item, index) => {
            return <TypeItem key={index} {...item} />;
          })}
      </div>
      {/* <Button
        sx={{
          padding: ".9rem 2.4rem",
          borderRadius: "100px",
          border: ".1rem solid rgba(var(--gray-text-color-rgb), .3)",
          fontSize: "1.2rem",
          fontWeight: "300",
          color: "var(--white-text-color)",
          marginTop: "2rem",
        }}
        disableRipple
        onClick={() => setIsShowAll((prev) => !prev)}
      >
        {!isShowAll ? <>Xem tất cả</> : <>Ẩn</>}
      </Button> */}
    </div>
  );
};

export default TypeList;
