import React, { useState } from "react";
import { toHTML } from "slack-markdown";
import "./App.css";
import HtmlParser from "react-html-parser";

function App() {
  const [text, setText] = useState("");

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <textarea
          style={{ width: "100%", height: "100vh", flex: 1 }}
          onChange={onChange}
        ></textarea>
        <div
          style={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "1em",
          }}
        >
          <h1>Message Preview</h1>
          <div
            style={{
              background: "grey",
              borderRadius: "10px",
              padding: "10px",
              flex: 1,
              textAlign: "left",
            }}
          >
            {HtmlParser(toHTML(text))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
