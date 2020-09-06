import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import "./App.css";
import { Parser } from "./util/lexer";
function App() {
  const parser = new Parser();
  const input = `
*bold*

_italic_

hello we are all good

~strikethrough~

> quote

- List 1`;

  const [text, setText] = useState("");

  const onChange = (event) => {
    const text = event.target.value;
    setText(text);
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
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h1>Preview</h1>
          <div
            style={{
              background: "grey",
              borderRadius: "10px",
              padding: "10px",
              flex: 1,
              textAlign: "left",
            }}
          >
            {parser.parse(text)}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
