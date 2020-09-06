// Create reference instance
import Lexer from "lex";
import React from "react";

export class Parser {
  constructor() {
    this.lexer = new Lexer();
    this.v = [];

    /**
     * Italics
     */
    this.lexer.addRule(/\_[^_\n]+\_/g, (text) => {
      this.v.push({
        type: "ITALICS",
        text: text.replace(/\_/g, ""),
      });
    });

    /**
     * Bold
     */
    this.lexer.addRule(/\*[A-z0-9]+\*/g, (text) => {
      this.v.push({
        type: "BOLD",
        text: text.replace(/\*/g, ""),
      });
    });

    /**
     * Bold
     */
    this.lexer.addRule(/```[a-z0-9\n ]*```/g, (text) => {
      this.v.push({
        type: "FENCED_CODE",
        text: text.replace(/```/g, ""),
      });
    });

    /**
     * Strikethrough
     */
    this.lexer.addRule(/~[A-z0-9]+~/g, (text) => {
      this.v.push({
        type: "STRIKETHROUGH",
        text: text.replace(/\~/g, ""),
      });
    });

    /**
     * List Item
     */
    this.lexer.addRule(/-[ A-z0-9]+/g, (text) => {
      this.v.push({
        type: "LIST_ITEM",
        text,
      });
    });

    /**
     * BLOCK_QUOTE
     */
    this.lexer.addRule(/>[ A-z0-9]+\n*/g, (text) => {
      this.v.push({
        type: "BLOCK_QUOTE",
        text: text.replace("> ", ""),
      });
    });

    /**
     * Paragraph
     */
    this.lexer.addRule(/([a-z0-9A-Z]*\?*\.*\,* *)*/g, (text) => {
      this.v.push({ type: "PARAGRAPH", text });
    });

    /**
     * NEW_LINE
     */
    this.lexer.addRule(/\n/g, (text) => {
      this.v.push({ type: "NEW_LINE", text });
    });
  }

  toHTML(token) {
    switch (token.type) {
      case "ITALICS":
        return (
          <span key={token.text} style={{ fontStyle: "italic" }}>
            {token.text}
          </span>
        );
      case "BOLD":
        return (
          <span key={token.text} style={{ fontWeight: "bold" }}>
            {token.text}
          </span>
        );
      case "STRIKETHROUGH":
        return (
          <span key={token.text} style={{ textDecoration: "line-through" }}>
            {token.text}
          </span>
        );
      case "BLOCK_QUOTE":
        return (
          <blockquote
            key={token.text}
            style={{ padding: "2em", borderLeft: "3px solid" }}
          >
            {token.text}
          </blockquote>
        );
      case "FENCED_CODE":
        return (
          <pre
            key={token.text}
            style={{ background: "lightgray", color: "black" }}
          >
            {token.text}
          </pre>
        );
      case "NEW_LINE":
        return <br key={"NEW_LINE"}></br>;
      default:
        return token.text;
    }
  }

  parse(input) {
    try {
      this.v = [];
      this.lexer.setInput(input);
      this.lexer.lex();

      return this.v.map((token) => this.toHTML(token));
    } catch (e) {
      return input;
    } finally {
      console.log(this.v);
    }
  }
}
