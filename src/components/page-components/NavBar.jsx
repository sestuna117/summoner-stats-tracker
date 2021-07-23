import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const { onSearch } = props;
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("na1");

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to={"/"} target="_parent">
        Home
      </Link>
      <div className="navbar-right">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(searchName, searchRegion);
            return false;
          }}
        >
          <input
            value={searchName}
            type={"text"}
            placeholder={"Input Summoner Name..."}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button type={"submit"}>Search</button>
          <select
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
          >
            <option value={"br1"}>BR</option>
            <option value={"eun1"}>EUNE</option>
            <option value={"euw1"}>EUW</option>
            <option value={"jp1"}>JP</option>
            <option value={"kr1"}>KR</option>
            <option value={"la1"}>LAN</option>
            <option value={"la2"}>LAS</option>
            <option value={"na1"}>NA</option>
            <option value={"oc1"}>OCE</option>
            <option value={"ru"}>RU</option>
            <option value={"tr1"}>TR</option>
          </select>
        </form>
      </div>
    </nav>
  );
}
