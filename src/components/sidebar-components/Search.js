import React, { useState } from "react";
import { Input } from "reactstrap";

import "../../styles/sidebar.scss";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-div">
      <Input value={search} onChange={handleChange} placeholder="Search" />
    </div>
  );
};

export default Search;
