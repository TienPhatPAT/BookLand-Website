import classes from "./TopSearchBox.module.scss";
import { fetchApi, getApiEnv } from "../../../utils/api";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const TopSearchBox = ({
  suggestSearch,
  setSuggestSearch,
  changeSearchTextHandle,
  setSearchText,
  searchText,
  searchRef,
}) => {
  const [suggestList, setSuggestList] = useState([]);
  const [loading, setLoading] = useState(false);
  if (localStorage.getItem("search-historyList")) localStorage.setItem("search-historyList", []);

  const itemStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: "1.2rem",
    fontWeight: "400",
    padding: ".6rem 1rem",
    borderRadius: "100px",
    display: "flex",
    alignItems: "center",
    color: "var(--gray-text-color)",
    gap: ".5rem",
    textTransform: "none",
    cursor: "pointer",

    ".historyIcon": {
      path: {
        stroke: "unset",
        fill: "var(--gray-text-color)",
      },
    },

    path: {
      stroke: "var(--gray-text-color)",
      // stroke: rgba(255, 255, 255, .8),
    },
  };

  useEffect(() => {
    setLoading(true);
    fetchApi(getApiEnv() + "/timkiem/search").then((data) => {
      data.sort((a, b) => b.count - a.count);
      setSuggestList(data);
      setLoading(false);
    });
  }, []);

  const onMouseLeaveItemHandle = (e) => {
    setSuggestSearch("");
  };

  const onMouseEnterItemHandle = (e) => {
    setSuggestSearch(e.target.value);
  };

  const onClickItemHandle = (e) => {
    setSearchText(e.target.value);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    !loading && (
      <div className={classes.searchBox}>
        <span className={classes.searchSuggestHeading}>Gợi ý</span>
        <ul className={classes.searchSuggestList}>
          {localStorage.getItem("search-historyList") &&
            localStorage.getItem("search-historyList").map((item, index) => {
              return (
                <li key={index}>
                  <Button
                    onMouseEnter={onMouseEnterItemHandle}
                    onMouseLeave={onMouseLeaveItemHandle}
                    onClick={onClickItemHandle}
                    value={item.text}
                    sx={itemStyle}
                    className={classes.searchSuggestItem}
                  >
                    {/* {item} */}
                    Sách lịch sử
                    <svg
                      className={classes.historyIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.07901 3.06902C6.87401 -0.720979 13.044 -0.680979 16.862 3.13802C20.682 6.95802 20.722 13.131 16.926 16.926C13.131 20.721 6.95801 20.682 3.13801 16.862C2.06351 15.792 1.25166 14.4874 0.766185 13.0508C0.280714 11.6141 0.134838 10.0845 0.34001 8.58202C0.366929 8.38483 0.471079 8.20641 0.629547 8.08602C0.788015 7.96562 0.987821 7.9131 1.18501 7.94002C1.3822 7.96694 1.56062 8.07109 1.68101 8.22956C1.80141 8.38803 1.85393 8.58783 1.82701 8.78502C1.65285 10.0583 1.77632 11.3547 2.18772 12.5722C2.59911 13.7898 3.28723 14.8953 4.19801 15.802C7.44301 19.046 12.666 19.065 15.866 15.866C19.065 12.666 19.046 7.44302 15.802 4.19802C12.559 0.956021 7.33901 0.935022 4.13901 4.13002L4.88701 4.13302C4.9855 4.13348 5.08294 4.15334 5.17376 4.19145C5.26457 4.22957 5.347 4.2852 5.41631 4.35517C5.48563 4.42514 5.54049 4.50807 5.57776 4.59924C5.61503 4.69041 5.63397 4.78803 5.63351 4.88652C5.63305 4.98501 5.6132 5.08245 5.57508 5.17327C5.53696 5.26409 5.48133 5.34651 5.41136 5.41583C5.3414 5.48515 5.25846 5.54 5.16729 5.57727C5.07612 5.61454 4.9785 5.63348 4.88001 5.63302L2.33401 5.62102C2.13631 5.61997 1.94702 5.5409 1.80732 5.40101C1.66762 5.26112 1.5888 5.07172 1.58801 4.87402L1.57501 2.33002C1.57448 2.23153 1.59336 2.1339 1.63057 2.0427C1.66778 1.95151 1.72258 1.86854 1.79185 1.79852C1.86112 1.7285 1.94351 1.67282 2.0343 1.63464C2.12509 1.59647 2.22252 1.57655 2.32101 1.57602C2.4195 1.5755 2.51713 1.59438 2.60833 1.63158C2.69952 1.66879 2.7825 1.72359 2.85251 1.79286C2.92253 1.86214 2.97821 1.94452 3.01639 2.03531C3.05456 2.12611 3.07448 2.22353 3.07501 2.32202L3.07901 3.06902ZM9.99901 5.24902C10.1979 5.24902 10.3887 5.32804 10.5293 5.46869C10.67 5.60934 10.749 5.80011 10.749 5.99902V9.68902L13.03 11.969C13.1017 12.0382 13.1588 12.1209 13.1982 12.2124C13.2375 12.3039 13.2583 12.4023 13.2592 12.5019C13.2601 12.6014 13.2412 12.7002 13.2035 12.7924C13.1658 12.8846 13.1102 12.9684 13.0398 13.0388C12.9694 13.1093 12.8857 13.165 12.7936 13.2027C12.7014 13.2405 12.6026 13.2595 12.5031 13.2587C12.4035 13.2579 12.3051 13.2372 12.2135 13.198C12.122 13.1587 12.0392 13.1016 11.97 13.03L9.25001 10.31V6.00002C9.25001 5.80111 9.32903 5.61034 9.46968 5.46969C9.61033 5.32904 9.8011 5.25002 10 5.25002"
                        fill="black"
                      />
                    </svg>
                  </Button>
                </li>
              );
            })}
          {suggestList.slice(0, 10).map((item, index) => {
            return (
              <li key={index}>
                <Button
                  onMouseEnter={onMouseEnterItemHandle}
                  onMouseLeave={onMouseLeaveItemHandle}
                  onClick={onClickItemHandle}
                  value={item.text}
                  sx={itemStyle}
                  className={classes.searchSuggestItem}
                >
                  {item.text}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    viewBox="0 0 11 10"
                    fill="none"
                  >
                    <path
                      d="M1.25735 9.24282L9.74263 0.757543M9.74263 0.757543H3.37867M9.74263 0.757543V7.1215"
                      // stroke="#9E9FB4"
                      // stroke-opacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </li>
            );
          })}
        </ul>
        {/* <div>
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chipLabel">Chip</InputLabel>
      <Select
        labelId="demo-multiple-chipLabel"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-multiple-chip" label="Chip" />
        }
        renderValue={(selected) => (
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
          >
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div> */}
      </div>
    )
  );
};

export default TopSearchBox;
