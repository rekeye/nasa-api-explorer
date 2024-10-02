import React, { useState } from "react";
import { useAssets } from "../../context/assets";
import SearchSvg from "../../assets/search.svg?react";

const SearchBar = () => {
  const { handleSearch } = useAssets();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
      <input
        className="grow p-2 rounded-md outline-focus shadow-md"
        type="text"
        placeholder="Search NASA media..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="h-10 w-10 flex items-center justify-center outline-focus bg-background-primary rounded-md shadow-md"
      >
        <SearchSvg height="20" width="20" />
      </button>
    </form>
  );
};

export default SearchBar;
