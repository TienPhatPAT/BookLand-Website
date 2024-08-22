import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const ArthorList = ({ heading = "", arthorList = [] }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
  };
  const navigate = useNavigate();
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}
      <Stack padding={"20px 0"}>
        <Slider {...settings}>
          {arthorList.map((tacgia, index) => {
            return (
              <Box padding="0 10px" key={index}>
                <Stack
                  justifyContent="center"
                  alignItems={"center"}
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/author/${tacgia._id}`)}
                >
                  <Avatar alt="Remy Sharp" src={tacgia.img} sx={{ width: 150, height: 150 }} />
                  <Typography sx={{ textAlign: "center", fontSize: "14px" }}>
                    {tacgia.ten}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Slider>
      </Stack>
    </>
  );
};

export default ArthorList;
