import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";
import Slider from "react-slick";

const ArthorList = ({ heading = "", arthorList = [] }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
  };
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}
      <Stack padding={"20px 0"}>
        <Slider {...settings}>
          {arthorList.map((tacgia, index) => {
            return (
              <Box padding="0 10px" key={index}>
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
              </Box>
            );
          })}
        </Slider>
      </Stack>
    </>
  );
};

export default ArthorList;
