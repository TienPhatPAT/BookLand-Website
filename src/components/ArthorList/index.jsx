import { Avatar, Link, Stack, Typography } from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";

const ArthorList = ({ heading = "", arthorList = [] }) => {
  console.log(arthorList, "ssss");
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}

      <div className={classes.bookList}>
        {arthorList.map((tacgia, index) => {
          return (
            <Link key={index} href={"/author/" + tacgia._id}>
              <Stack
                justifyContent="center"
                alignItems={"center"}
                spacing={1}
                sx={{ cursor: "pointer" }}
              >
                <Avatar alt="Remy Sharp" src={tacgia.img} sx={{ width: 100, height: 100 }} />
                <Typography>{tacgia.ten}</Typography>
              </Stack>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ArthorList;
