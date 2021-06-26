import React from "react";
import "./NavBar.css";

export default function NavBar(props) {
  const { name, region, onSearch, changeName, changeRegion } = props;
  return (
    <nav className="navbar">
      <a className="navbar-logo" href={"#"}>
        Home
      </a>
      <div className="navbar-right">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
            return false;
          }}
        >
          <input
            value={name}
            type={"text"}
            placeholder={"Input Summoner Name..."}
            onChange={(e) => changeName(e.target.value)}
          />
          <button type={"submit"}>Search</button>
          <select value={region} onChange={(e) => changeRegion(e.target.value)}>
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
