import React from "react";

export interface SearchBarProps {
  searchNotes: (searchValue: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchNotes }) => {
  return (
    <input
      type="search"
      onChange={(event) => {
        event.preventDefault();
        searchNotes(event.target.value);
      }}
      placeholder="Search..."
    />
  );
};
