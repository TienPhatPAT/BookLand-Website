import { Button, Typography } from "@mui/material";
import classes from "./SuggestSearch.module.scss";
import { highlightSubstring } from "../../../utils/string";
import * as Icon from "../../../components/Icon";

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
  const onMouseLeaveItemHandle = (e) => {
    setSuggestSearch("");
  };

  const onMouseEnterItemHandle = (e) => {
    // setSuggestSearch(e.target.value);
  };

  const onClickItemHandle = (e) => {
    setSearchText(e.target.value);
    // if (searchRef.current) {
    //   searchRef.current.focus();
    // }
    submitFormHandle(e);
  };

  return (
    !searchLoading && (
      <div className={classes.searchBox}>
        <Button
          onMouseEnter={onMouseEnterItemHandle}
          onMouseLeave={onMouseLeaveItemHandle}
          onClick={onClickItemHandle}
          value={searchText}
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

              ".highlight": {
                color: "var(--gray-text-color)",
                display: "inline-block",
              },
            }}
          >
            {highlightSubstring(searchText, searchText.trim())}
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 11 10"
            fill="none"
          >
            <path
              d="M1.25735 9.24282L9.74263 0.757543M9.74263 0.757543H3.37867M9.74263 0.757543V7.1215"
              stroke="var(--light-gray-text-color)"
              // stroke-opacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {suggestList.map((item, index) => {
          if (item.text !== searchText)
            return (
              <Button
                key={index}
                onMouseEnter={onMouseEnterItemHandle}
                onMouseLeave={onMouseLeaveItemHandle}
                onClick={onClickItemHandle}
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

                    ".highlight": {
                      color: "var(--gray-text-color)",
                      display: "inline-block",
                    },
                  }}
                >
                  {highlightSubstring(item.text, searchText.trim())}
                </Typography>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  viewBox="0 0 11 10"
                  fill="none"
                >
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
      </div>
    )
  );
};

export default SuggestSearch;
