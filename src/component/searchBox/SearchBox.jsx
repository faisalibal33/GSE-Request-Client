import React, { useState } from "react";
import "./searchbox.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBox = () => {
  const [search, setSearch] = useState("");

  return {
    search,
    render: (
      <div className="headerSearchaa">
        <div className="headerSearchItem">
          <SearchOutlinedIcon color="gray" />
          <input
            type="text"
            placeholder="Search"
            className="headerSearchInput"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      </div>
    ),
  };
};

export default SearchBox;
