import { Container } from "@mui/material";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import classes from "./Type.module.scss";
import BookListHeading from "../../../components/BookListHeading";
import TypeList from "./TypeList";
import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../../../utils/api";

const Type = () => {
  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    fetchApi(getApiEnv() + "/TheLoai").then((data) => {
      setTypeList(data?.data);
    });
  }, []);
  return (
    <Container
      sx={{
        maxWidth: "calc(100% - 6rem) !important",
        padding: "0 !important",
        margin: "0 0 12rem auto !important",
      }}
    >
      <div className={classes.breadcrumb}>
        <BreadcrumbBar path={[{ label: "Chủ đề & Thể loại", url: "type" }]}></BreadcrumbBar>
      </div>
      <BookListHeading label="Thể loại" />
      <TypeList typeList={typeList} row={2} col={4} />
    </Container>
  );
};

export default Type;
