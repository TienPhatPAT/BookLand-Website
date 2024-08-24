import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import clsx from "clsx";
import * as Icon from "../../components/Icon";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Badge, Button, Typography } from "@mui/material";
import SuggestSearch from "./SuggestSearch";
import { fetchApi, getApiEnv } from "../../utils/api";
import AdvanceSearch from "./AdvanceSearch";
import { groupResultsByMatchCount } from "../../utils/array";
import AccountLogin from "./AccountLogin";
import { getIdCartList } from "../../services/Cart";
import { isAuthenticated } from "../../services/AuthService";

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
  const isLogin = isAuthenticated();
  const [searchText, setSearchText] = React.useState("");
  const [suggestSearch, setSuggestSearch] = React.useState("");
  const searchRef = React.useRef(null);
  const [suggestList, setSuggestList] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const quantity = getIdCartList()?.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  // Fetch data từ BE với từ khóa tìm kiếm
  React.useEffect(() => {
    setSearchLoading(true);
    const delayDebounceFn = setTimeout(() => {
      fetchApi(getApiEnv() + `/timkiem?text=${searchText}`, { text: searchText })
        .then((data) => {
          const groupedResults = groupResultsByMatchCount(data?.results, searchText);
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
        })
        .catch((error) => {
          console.log(error);
          setSuggestList([]);
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

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
    if (searchText.trim()) {
      navigate(`/search/results?text=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>
      <div className={classes.heading}>
        <div className="d-flex align-items-center">
          <div className={classes.toolBtn}>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <Icon.LongArrowLeftIcon color="var(--header-text-color)" />
            </button>
            <button
              onClick={() => {
                navigate(1);
              }}
            >
              <Icon.LongArrowRightIcon color="var(--header-text-color)" />
            </button>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="d-flex align-items-center position-relative"
          >
            <div id="search-form" className={classes.search}>
              <input
                onFocus={openSearchHandle}
                value={suggestSearch || searchText}
                onChange={changeSearchTextHandle}
                type="text"
                id="search"
                name="search"
                ref={searchRef}
                autoComplete="off"
                placeholder="Tìm kiếm sách, tác giả"
              />
              <button type="submit">
                <Icon.MagnifyingIcon />
              </button>
            </div>
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
          {isLogin && (
            <Badge badgeContent={quantity} color="secondary">
              <NavLink to="/cart">
                <Icon.CartBagIcon type="light" color="var(--header-text-color)" />
              </NavLink>
            </Badge>
          )}
          {!isLogin && (
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>Login</Typography>
          )}
          <AccountLogin loginBox={loginBox} setLoginBox={setLoginBox} setSignUpBox={setSignUpBox} />
        </div>
      </div>
      <div className={classes.headingDummy}></div>
    </>
  );
};

export default Header;
