import React from "react";
import "./LoadingSpinner.css";
import cx from "classnames";

export default function LoadingSpinner(props) {
  const { isMatch } = props;

  return (
    <div
      className={cx("loader", {
        "match-loader": isMatch,
        "page-loader": !isMatch,
      })}
    >
      <img
        className="spinner"
        src={
          "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/spinner.png"
        }
        alt={"spinner"}
      />
    </div>
  );
}
