import { Box } from "@mui/material";
import BookItem from "../BookItem";

const GridBookList = ({ bookList = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        rowGap: "3rem",
        paddingRight: "4rem",
        marginTop: "3rem",
      }}
    >
      {bookList.map((book, index) => {
        return (
          <Box
            sx={{
              width: `calc(${(2 / 12) * 100}% - 2rem)`,
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
            }}
            key={index}
          >
            <BookItem
              cover={book.img}
              name={book.ten}
              label={book.gia}
              id={book._id}
              isMargin={false}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default GridBookList;
