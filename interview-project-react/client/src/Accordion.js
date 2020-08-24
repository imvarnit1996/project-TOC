import React, { useState, useRef, useEffect } from "react";
import { useFetchSection } from "./useFetch";
import "./Accordion.css";
import ProgressBar from "./ProgressBar";
const Accordion = (props) => {
  const titleStyle = {
    fontWeight: 600,
    fontSize: "14px",
    marginLeft: "8rem",
  };

  const [active, setActive] = useState(false);
  const [section, setSection] = useState(4443990);

  const contentRef = useRef();

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleActive = (sectionId) => {
    setSection(sectionId);
    setActive(!active);
  };

  const { title, sequenceNO, type, sectionId, completeCount } = props;

  const [response, loading, hasError] = useFetchSection(section);

  return (
    <>
      <div className="accordion-section">
        <button
          className="accordion-title"
          onClick={() => toggleActive(sectionId)}
        >
          <p style={titleStyle}>
            {type} {sequenceNO}: {title}
          </p>
          <ProgressBar completed={completeCount * 10} />
          <span className={active ? "accordion-icon rotate" : "accordion-icon"}>
            {">"}
          </span>
        </button>

        <div className="accordion-content">
          {loading ? (
            <div>Loading...</div>
          ) : hasError ? (
            <div>Error occurred.</div>
          ) : (
            <div ref={contentRef} className="accordion-content">
              {response !== undefined &&
                response.map((element, idx) => (
                  <div key={idx}>
                    <div>
                      <p style={{ textAlign: "left", marginLeft: "5rem" }}>
                        {element.type} {element.sequenceNO}: {element.title}
                      </p>
                    </div>
                    <div>
                      <span style={{ marginLeft: "50rem" }}>
                        {element.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
