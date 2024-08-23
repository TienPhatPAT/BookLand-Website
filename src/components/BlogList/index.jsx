import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import BookItem from "../BookItem";
import BookListHeading from "../BookListHeading";
import classes from "./BookList.module.scss";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const BlogList = ({ heading = "", blogList = [] }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
  };
  const navigate = useNavigate();
  return (
    <>
      {heading && <BookListHeading label={heading}></BookListHeading>}

      <Stack padding={"20px 0"}>
        <Slider {...settings}>
          {blogList.map((blog, index) => {
            return (
              <Box sx={{ maxWidth: "250px !important" }} padding="0 10px" key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    marginRight: 2,
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/banner/" + blog._id)}
                >
                  <CardMedia sx={{ height: 140 }} image={blog.img} title="green iguana" />
                  <CardContent sx={{ padding: "10px 0" }}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{
                        textDecoration: "none",
                        fontSize: 14,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {blog.tieude}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Slider>
      </Stack>
    </>
  );
};

export default BlogList;
