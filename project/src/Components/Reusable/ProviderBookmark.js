import { Checkbox } from "@mui/material";
import React from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from "react";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ProviderBookmark = () => {
  const [bookmart,isBookmarke] = useState(false);
  const handle = () => {
    bookmart == false ? isBookmarke(true) : isBookmarke(false)
  }

  // console.log("Bookmark" +bookmart)

  return <div >
    <Checkbox size="large" sx={{color:"white"}}
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={handle}
      />
  </div>;
};

export default ProviderBookmark;
