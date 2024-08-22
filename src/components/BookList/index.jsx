import { Box, Stack } from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";
import Slider from "react-slick";

const BookList = ({ heading = "", bookList = [] }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
  };
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}

      <Stack padding={"20px 0"}>
        <Slider {...settings}>
          {bookList.map((book, index) => {
            return (
              <Box padding="0 10px" key={index}>
                <BookItem cover={book.img} name={book.ten} label={book.gia} id={book._id} />
              </Box>
            );
          })}
        </Slider>
      </Stack>
    </>
  );
};

export default BookList;
