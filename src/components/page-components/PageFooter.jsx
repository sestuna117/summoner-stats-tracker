import React from "react";
import "./PageFooter.css";

export default function PageFooter() {
  return (
    <div className="footer-container">
      <div className="footer">
        <p className="footer-copyright-title">
          © Copyright {new Date().getFullYear()} ThinkingCap. All rights
          reserved.
        </p>
        <p className="footer-copyright">
          {window.location.hostname} isn't endorsed by Riot Games and doesn't
          reflect the views or opinions of Riot Games or anyone officially
          involved in producing or managing Riot Games properties. Riot Games,
          and all associated properties are trademarks or registered trademarks
          of Riot Games, Inc.
        </p>
      </div>
    </div>
  );
}
