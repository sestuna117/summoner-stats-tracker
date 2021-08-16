import React, { useState } from "react";
import "./TableDetailSection.css";
import { usePopper } from "react-popper";

export default function WardDetails(props) {
  const { wardsPlaced, wardsKilled, redsPlaced, visionScore } = props;

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
        className="table-detail table-detail-vision"
        ref={setReferenceElement}
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
      >
        <span>{visionScore}</span>
        <span>{`${wardsPlaced} (${redsPlaced}) / ${wardsKilled}`}</span>
      </div>
      {isVisible ? (
        <div
          className="popper-tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div>
            <p>Vision Score: {visionScore}</p>
            <p>Total Wards Placed: {wardsPlaced}</p>
            <p>Red Wards Placed: {redsPlaced}</p>
            <p>Wards Killed: {wardsKilled}</p>
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
