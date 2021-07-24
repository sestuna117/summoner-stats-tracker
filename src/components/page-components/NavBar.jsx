import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import REGIONS from "../../api/util/regions";

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
            {Object.entries(REGIONS).map(([id, { name }]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </form>
      </div>
    </nav>
  );
}
