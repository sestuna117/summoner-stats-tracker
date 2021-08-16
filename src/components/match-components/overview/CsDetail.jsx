import React, { useState } from "react";
import "./TableDetailSection.css";
import { usePopper } from "react-popper";

export default function CsDetail(props) {
  const { duration, cs } = props;
  const durationInMin = duration / (1000 * 60);

  const [isVisible, setIsVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top", "bottom"] } },
    ],
  });

  return (
    <div>
      <div
        className="table-detail table-detail-cs"
        ref={setReferenceElement}
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
      >
        <span>{cs}</span>
        <span>{(cs / durationInMin).toFixed(1) + "/m"}</span>
      </div>
      {isVisible ? (
        <div
          className="popper-tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div>
            <p>{`Total CS: ${cs}`}</p>
            <p>{`CS per minute: ${(cs / durationInMin).toFixed(1)}`}</p>
          </div>
          <div
            className="popper-arrow"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      ) : null}
    </div>
  );
}
