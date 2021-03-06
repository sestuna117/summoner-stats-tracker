import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import REGIONS from "../../api/util/regions";
import { FaSearch } from "react-icons/fa";
import ToggleSwitch from "../ToggleSwitch";
import { GiHamburgerMenu } from "react-icons/all";
import cx from "classnames";

export default function NavBar(props) {
  const { onSearch, changeTheme, theme } = props;
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("na1");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isSmallScreen = window.innerWidth < 800;
        if (isSmallScreen !== isMobile) {
          setIsMobile(isSmallScreen);
        }
      },
      false
    );
  }, [isMobile]);

  return (
    <nav className={cx({ navbar: !isMobile, "navbar-mobile": isMobile })}>
      <Link className="navbar-logo" to={"/"} target="_parent">
        THINKING CAP
      </Link>
      <div className="navbar-right">
        <ToggleSwitch event={changeTheme} isChecked={theme === "dark-mode"} />
        <GiHamburgerMenu
          className={cx("navbar-dropdown", {
            "navbar-dropdown-active": dropdownActive,
          })}
          onClick={() => {
            setDropdownActive((prev) => !prev);
          }}
        />
        <form
          className={cx("navbar-search", {
            "navbar-search-open": dropdownActive,
          })}
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(searchName, searchRegion);
            setDropdownActive(false);
            return false;
          }}
        >
          <input
            id="search"
            className="navbar-search-bar"
            value={searchName}
            type={"text"}
            placeholder={"Input Summoner Name..."}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <label form="search" />
          <button
            className="navbar-search-bar-button"
            type={"submit"}
            aria-label="Left Align"
          >
            <FaSearch />
          </button>
          <select
            className="navbar-search-bar-region-selected"
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
          >
            {Object.entries(REGIONS).map(([id, { name }]) => (
              <option className="navbar-search-bar-region" key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </form>
      </div>
    </nav>
  );
}
