import React from "react";

export default function ErrorPage() {
    return (
        <div className="body body-error">
            <p className="body-error-msg">
                Summoner not found in this region. Please check your spelling and try
                again.
            </p>
        </div>
    );
}
