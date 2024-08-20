const FavoriteBookList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        rowGap: "3rem",
        paddingRight: "4rem",
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
              name={book.name}
              label={book.price}
              id={book.id}
              isMargin={false}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default FavoriteBookList;
