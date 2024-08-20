import { NavLink, useNavigate, useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import clsx from "clsx";
import * as Icon from "../../components/Icon";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";
import { Badge, Button } from "@mui/material";
import TopSearchBox from "./TopSearchBox";
import SuggestSearch from "./SuggestSearch";
import { fetchApi, getApiEnv } from "../../utils/api";
import AdvanceSearch from "./AdvanceSearch";
import { groupResultsByMatchCount } from "../../utils/array";
import AccountLogin from "./AccountLogin";
import { getIdCartList } from "../../services/Cart";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Header = ({
  isShowSearchBox,
  setIsShowSearchBox,
  isOpenAdvance,
  setIsOpenAdvance,
  loginBox,
  setLoginBox,
  setSignUpBox,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [suggestSearch, setSuggestSearch] = React.useState("");
  const searchRef = React.useRef(null);
  const [suggestList, setSuggestList] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const quantity = getIdCartList()?.reduce((total, item) => total + item.quantity, 0);

  React.useEffect(() => {
    setSearchLoading(true);
    const delayDebounceFn = setTimeout(() => {
      fetchApi(getApiEnv() + `/timkiem/search?text=${searchText}`, { text: searchText }).then(
        (data) => {
          const groupedResults = groupResultsByMatchCount(data, searchText);
          let sortedResults = [];

          Object.keys(groupedResults).forEach((groupKey) => {
            const groupItems = groupedResults[groupKey];
            groupItems.sort((a, b) => {
              if (groupKey !== "match_0") {
                // Số từ trùng khớp giảm dần
                const matchCountA = parseInt(groupKey.split("_")[1]);
                const matchCountB = parseInt(groupKey.split("_")[1]);
                if (matchCountA !== matchCountB) {
                  return matchCountB - matchCountA;
                }
              }
              // Count giảm dần
              return b.count - a.count;
            });

            // Thêm vào mảng kết quả, chỉ lấy 10 phần tử nếu chưa đủ
            console.log(sortedResults);
            sortedResults = [...groupItems.slice(0, 10)];
            console.log(sortedResults);
            // console.log(groupItems.slice(0, 10));

            // Kiểm tra nếu đã đủ 10 phần tử thì dừng lặp

            if (sortedResults.length >= 5) {
              return;
            }
          });

          // console.log(sortedResults);
          // data.sort((a, b) => a.index - b.index);
          setSuggestList(sortedResults.slice(0, 5));
          setSearchLoading(false);
        }
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const openSearchHandle = () => {
    setIsShowSearchBox(true);
  };
  const closeSearchHandle = () => {
    setIsShowSearchBox(false);
  };

  const changeSearchTextHandle = (e) => {
    setSuggestSearch("");
    setSearchText(e.target.value);
  };

  const submitFormHandle = (e) => {
    e.preventDefault();
    alert("submit");
  };

  return (
    <>
      <div className={classes.heading}>
        <div className="d-flex align-items-center">
          <div className={classes.toolBtn}>
            <button>
              <Icon.LongArrowLeftIcon color="var(--header-text-color)" />
            </button>
            <button>
              <Icon.LongArrowRightIcon color="var(--header-text-color)" />
            </button>{" "}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="d-flex align-items-center position-relative"
          >
            <form id="search-form" className={classes.search} onSubmit={submitFormHandle}>
              <input
                onFocus={openSearchHandle}
                value={suggestSearch || searchText}
                onChange={changeSearchTextHandle}
                // onBlur={closeSearchHandle}
                type="text"
                id="search"
                name="search"
                ref={searchRef}
                autoComplete="off"
                placeholder="Tìm kiếm sách, tác giả"
                // hidden={suggestSearch}
              />
              <button type="submit">
                <Icon.MagnifyingIcon />
              </button>
            </form>
            <Button
              onClick={() => {
                setIsOpenAdvance((prev) => !prev);
              }}
              className={clsx(classes.advanceBtn, {
                [classes.advanceBtn__active]: isOpenAdvance,
              })}
              sx={{
                backgroundColor: "rgba(255,255,255,.05)",
                color: "var(--light-gray-text-color)",
                textTransform: "unset",
                // height: "3rem",
                padding: ".8rem 1.2rem",
                fontSize: "1.2rem",
                marginLeft: "1rem",
                borderRadius: "1000px",
                backgroundColor: "transparent",
                border: "1px solid rgba(var(--gray-text-color-rgb), .5)",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              Nâng cao
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="5"
                viewBox="0 0 11 5"
                fill="none"
              >
                <path
                  d="M2.44133 9.53674e-07L9.45663 9.53674e-07C9.73358 -0.000268459 10.005 0.0522509 10.2394 0.151481C10.4739 0.250711 10.6618 0.392595 10.7814 0.560708C10.9214 0.760175 10.9753 0.982098 10.937 1.20119C10.8987 1.42027 10.7697 1.62772 10.5647 1.79987L7.05709 4.65948C6.91944 4.76637 6.74925 4.85209 6.55806 4.91084C6.36687 4.96959 6.15915 5 5.94898 5C5.7388 5 5.53108 4.96959 5.33989 4.91084C5.1487 4.85209 4.97851 4.76637 4.84086 4.65948L1.33321 1.79987C1.12824 1.62772 0.999259 1.42027 0.960958 1.20119C0.922659 0.982098 0.976583 0.760175 1.11658 0.560708C1.23618 0.392595 1.42407 0.250711 1.65851 0.151481C1.89296 0.0522509 2.16437 -0.000268459 2.44133 9.53674e-07Z"
                  fill={!isOpenAdvance ? "var(--light-gray-text-color)" : "var(--primary-color)"}
                />
              </svg>
            </Button>
            {isShowSearchBox && searchText === "" && !isOpenAdvance && (
              <TopSearchBox
                suggestSearch={suggestSearch}
                setSuggestSearch={setSuggestSearch}
                changeSearchTextHandle={changeSearchTextHandle}
                setSearchText={setSearchText}
                searchText={searchText}
                searchRef={searchRef}
              />
            )}
            {isShowSearchBox && searchText !== "" && !isOpenAdvance && (
              <SuggestSearch
                suggestSearch={suggestSearch}
                setSuggestSearch={setSuggestSearch}
                changeSearchTextHandle={changeSearchTextHandle}
                setSearchText={setSearchText}
                searchText={searchText}
                searchRef={searchRef}
                submitFormHandle={submitFormHandle}
                suggestList={suggestList}
                searchLoading={searchLoading}
              />
            )}
            {isOpenAdvance && <AdvanceSearch />}
          </div>
        </div>
        <div className={clsx("d-flex align-items-center", classes.accountWrapper)}>
          <Badge badgeContent={quantity} color="secondary">
            <NavLink to="/cart">
              <Icon.CartBagIcon type="light" color="var(--header-text-color)" />
            </NavLink>
          </Badge>
          <Icon.BellWithArrow color="var(--header-text-color)" />
          <Icon.SettingIcon type="light" color="var(--header-text-color)" />
          <AccountLogin loginBox={loginBox} setLoginBox={setLoginBox} setSignUpBox={setSignUpBox} />
        </div>
      </div>
      <div className={classes.headingDummy}></div>
    </>
  );
};

export default Header;
