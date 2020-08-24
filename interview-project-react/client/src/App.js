import React, { useEffect, useState } from "react";
//import ProgressBar from "./ProgressBar";
import Accordion from "./Accordion";
import { useFetchBook } from "./useFetch";

function App() {
  const app = {
    width: "70%",
    margin: "0 auto",
  };

  const [response, loading, hasError] = useFetchBook(
    "http://localhost:8080/api/book/maths/"
  );

  return (
    <div style={{ margin: "5rem 0" }}>
      <h1 style={{ textAlign: "center" }}>Table of Contents</h1>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Error occurred.</div>
      ) : (
        response.map((element, idx) => (
          <div style={app} key={element.id}>
            <Accordion
              title={element.title}
              sequenceNO={element.sequenceNO}
              type={element.type}
              sectionId={element.id}
              completeCount={element.completeCount}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
