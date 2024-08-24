import { Box, Button, Typography } from "@mui/material";
import classes from "./SuggestSearch.module.scss";
import { highlightSubstring } from "../../../utils/string";
import * as Icon from "../../../components/Icon";
import { useNavigate } from "react-router-dom";

const SuggestSearch = ({
  suggestSearch,
  setSuggestSearch,
  changeSearchTextHandle,
  setSearchText,
  searchText,
  searchRef,
  submitFormHandle,
  suggestList,
  searchLoading,
}) => {
  const navigate = useNavigate();
  const onMouseLeaveItemHandle = (e) => {
    setSuggestSearch("");
  };

  const onMouseEnterItemHandle = (e) => {
    // setSuggestSearch(e.target.value);
  };

  const onClickItemHandle = (item) => {
    if (item.type === "sach") {
      navigate(`/book/${item.id}`);
    }

    if (item.type === "tacgia") {
      navigate(`/author/${item.id}`);
    }
  };

  return (
    <div className={classes.searchBox}>
      {searchLoading && (
        <Box
          sx={{
            width: "100%",
            textTransform: "unset",
            padding: "1.2rem 2rem 1rem 2.4rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "var(--light-gray-text-color)",
              fontSize: "1.4rem",
              fontWeight: "400",

              ".highlight": {
                color: "var(--gray-text-color)",
                display: "inline-block",
              },
            }}
          >
            Loading ...
          </Typography>
        </Box>
      )}

      {!searchLoading &&
        suggestList.length > 0 &&
        suggestList.map((item, index) => {
          return (
            <Button
              key={index}
              onMouseEnter={onMouseEnterItemHandle}
              onMouseLeave={onMouseLeaveItemHandle}
              onClick={() => onClickItemHandle(item)}
              value={item.text}
              sx={{
                width: "100%",
                textTransform: "unset",
                padding: "1.2rem 2rem 1rem 2.4rem",
                justifyContent: "space-between",
                alignItems: "center",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,.05)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "var(--light-gray-text-color)",
                  fontSize: "1.4rem",
                  fontWeight: "400",
                  textAlign: "left !important",
                  ".highlight": {
                    color: "var(--gray-text-color)",
                    display: "inline-block",
                  },
                }}
              >
                {highlightSubstring(item.ten, searchText?.trim())}
              </Typography>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 11 10" fill="none">
                <path
                  d="M1.25735 9.24282L9.74263 0.757543M9.74263 0.757543H3.37867M9.74263 0.757543V7.1215"
                  stroke="var(--light-gray-text-color)"
                  // stroke-opacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          );
        })}
      {!searchLoading && suggestList.length === 0 && (
        <Box
          sx={{
            width: "100%",
            textTransform: "unset",
            padding: "1.2rem 2rem 1rem 2.4rem",
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Typography
            sx={{
              color: "var(--light-gray-text-color)",
              fontSize: "1.4rem",
              fontWeight: "400",
              textAlign: "left !important",
              ".highlight": {
                color: "var(--gray-text-color)",
                display: "inline-block",
              },
            }}
          >
            Not found
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SuggestSearch;
