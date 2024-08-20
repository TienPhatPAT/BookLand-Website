import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi, getApiEnv } from "../../../utils/api";
import classes from "./BlogBanner.module.scss";
import BreadcrumbBar from "../../../components/BreadcrumbBar";
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";

const BlogBanner = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [listBanner, setListBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchApi(`${import.meta.env.VITE_API}/baiviet`).then((data) => {
      setListBanner(data?.data);
    });
  }, []);
  useEffect(() => {
    fetchApi(getApiEnv() + `/baiviet/${id}`)
      .then((data) => setBanner(data?.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!banner) {
    return <div>No banner found</div>;
  }

  return (
    <div className={classes.banner_detail}>
      <BreadcrumbBar path={[{ label: banner.tieude, url: "" }]} />
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              backgroundImage: `url(${banner.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
            }}
          ></Box>
          <h1 style={{ marginTop: "20px" }}>{banner.tieude}</h1>
          <p style={{ fontSize: "16px", color: "#fff" }}>{banner.noidung}</p>
        </Grid>
        <Grid item md={4} spacing={1} sx={{ overflow: "auto" }}>
          <Stack spacing={2}>
            {listBanner?.map((item, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  marginRight: 2,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                }}
                onClick={() => window.open("/banner/" + item._id)}
              >
                <CardMedia sx={{ height: 140, width: 200 }} image={item.img} title="green iguana" />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ textDecoration: "none" }}
                  >
                    {item.tieude}
                  </Typography>
                  <Typography sx={{ textDecoration: "none", fontSize: 12 }}>{item.mota}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default BlogBanner;
