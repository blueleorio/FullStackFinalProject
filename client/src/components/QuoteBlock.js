import axios from "axios";

import { useEffect, useState } from "react";

import { Typography } from "@mui/material";

export const Quote = () => {
  const [quote, setQuote] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.quotable.io/quotes/random")
      .then((res) => {
        setQuote(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Typography variant="h5"> Quote Of The Day</Typography>
      <Typography align="right">
        <svg
          className="mb-4 h-8 w-8 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
          style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', width: '16px', height: '16px' }} // Inline styling for alignment
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        {quote.content}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>-- {quote.author}</Typography>
    </>
  );
}