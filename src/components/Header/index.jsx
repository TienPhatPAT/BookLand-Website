import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import clsx from "clsx";
import * as Icon from "../../components/Icon";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Badge, Button } from "@mui/material";
import TopSearchBox from "./TopSearchBox";
import SuggestSearch from "./SuggestSearch";
import { fetchApi, getApiEnv } from "../../utils/api";
import AdvanceSearch from "./AdvanceSearch";
import { groupResultsByMatchCount } from "../../utils/array";
import AccountLogin from "./AccountLogin";
import { getIdCartList } from "../../services/Cart";

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
  const [searchText, setSearchText] = React.useState("");
  const [suggestSearch, setSuggestSearch] = React.useState("");
  const searchRef = React.useRef(null);
  const [suggestList, setSuggestList] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const quantity = getIdCartList()?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const navigate = useNavigate();

  // Fetch data từ BE với từ khóa tìm kiếm
  React.useEffect(() => {
    if (searchText) {
      setSearchLoading(true);
      const delayDebounceFn = setTimeout(() => {
        fetchApi(
          `${getApiEnv()}/timkiem/search?text=${encodeURIComponent(searchText)}`
        )
          .then((data) => {
            const groupedResults = groupResultsByMatchCount(data, searchText);
            let sortedResults = [];

            Object.keys(groupedResults).forEach((groupKey) => {
              const groupItems = groupedResults[groupKey];
              groupItems.sort((a, b) => b.count - a.count);

              sortedResults = [...sortedResults, ...groupItems.slice(0, 10)];

              if (sortedResults.length >= 10) {
                return;
              }
            });

            setSuggestList(sortedResults.slice(0, 5));
            setSearchLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
            setSearchLoading(false);
          });
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSuggestList([]);
    }
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
            <form
              id="search-form"
              className={classes.search}
              onSubmit={submitFormHandle}
            >
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
            </form>
            <Button
              onClick={() => {
                setIsOpenAdvance((prev) => !prev);
              }}
              className={clsx(classes.advanceBtn, {
                [classes.advanceBtn__active]: isOpenAdvance,
              })}
              sx={{
                color: "var(--light-gray-text-color)",
                textTransform: "unset",
                padding: ".8rem 1.2rem",
                fontSize: "1.2rem",
                marginLeft: "1rem",
                borderRadius: "1000px",
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
                  fill={
                    !isOpenAdvance
                      ? "var(--light-gray-text-color)"
                      : "var(--primary-color)"
                  }
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
        <div
          className={clsx("d-flex align-items-center", classes.accountWrapper)}
        >
          <Badge badgeContent={quantity} color="secondary">
            <NavLink to="/cart">
              <Icon.CartBagIcon type="light" color="var(--header-text-color)" />
            </NavLink>
          </Badge>
          <Icon.BellWithArrow color="var(--header-text-color)" />
          <Icon.SettingIcon type="light" color="var(--header-text-color)" />
          <AccountLogin
            loginBox={loginBox}
            setLoginBox={setLoginBox}
            setSignUpBox={setSignUpBox}
          />
        </div>
      </div>
      <div className={classes.headingDummy}></div>
    </>
  );
};

export default Header;
