import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";

const BlogList = ({ heading = "", blogList = [] }) => {
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}

      <div className={classes.bookList}>
        {blogList.map((blog, index) => {
          return (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                marginRight: 2,
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => window.open("/banner/" + blog._id)}
            >
              <CardMedia sx={{ height: 140 }} image={blog.img} title="green iguana" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ textDecoration: "none" }}
                >
                  {blog.tieude}
                </Typography>
                <Typography sx={{ textDecoration: "none", fontSize: 12 }}>{blog.mota}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default BlogList;
