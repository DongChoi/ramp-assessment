import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [flag, setFlag] = useState("");

  const rootNodeRef = useRef(null);

  const removeAsterisks = (dataString) => {
    let newString = "";
    for (const char of dataString) {
      if (char !== "*") {
        newString += char;
      }
    }
    return newString;
  };

  useEffect(() => {
    const fetchData = async () => {
      let finalString = "";
      try {
        const response = await axios.get(
          "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
        );
        const htmlContent = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        finalString = findURL(doc.documentElement, finalString);
        setFlag(finalString);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }

      return finalString;
    };

    const findURL = (node) => {
      let url = "";
      for (const childNode of node.childNodes) {
        if (childNode.tagName === "UL") {
          for (const ulChildNode of childNode.childNodes) {
            if (ulChildNode.tagName === "LI") {
              for (const liChildNode of ulChildNode.childNodes) {
                if (liChildNode.tagName === "DIV") {
                  for (const spanNode of liChildNode.getElementsByTagName(
                    "SPAN"
                  )) {
                    if (spanNode.classList.contains("value")) {
                      const value = spanNode.getAttribute("value");
                      if (value && value !== "**") {
                        url += removeAsterisks(value);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (childNode.childNodes.length > 0) {
          url += findURL(childNode);
        }
      }
      return url;
    };
    fetchData();
  }, []);
  return <div ref={rootNodeRef}>{flag}</div>;
}

export default App;
