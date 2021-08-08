import React, { useState } from "react";
import thinkingCapLogo from "../../icons/thinkingcap.png";
import { FaSearch } from "react-icons/fa";
import REGIONS from "../../api/util/regions";
import "./DefaultHomePage.css";

export default function DefaultHomePage(props) {
  const { onSearch } = props;
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("na1");

  return (
    <div
      className="body body-home"
      style={{
        backgroundImage: `url(${thinkingCapLogo})`,
        backgroundSize: "1000px 771px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
      }}
    >
      <p className="site-name">Thinking Cap</p>
      <form
        className="main-search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(searchName, searchRegion);
          return false;
        }}
      >
        <input
          className="main-search-bar"
          value={searchName}
          type={"text"}
          placeholder={"Input Summoner Name..."}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="main-search-bar-button" type={"submit"}>
          <FaSearch />
        </button>
        <select
          className="main-search-bar-region-selected"
          value={searchRegion}
          onChange={(e) => setSearchRegion(e.target.value)}
        >
          {Object.entries(REGIONS).map(([id, { name }]) => (
            <option className="main-search-bar-region" key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
