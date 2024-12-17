// User/components/SearchContext.jsx
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [searchDataKeyword, setSearchDataKeyword] = useState(null);
  const [searchSinger, setSearchSinger] = useState(null);
  const [playlistData, setPlaylistData] = useState(null); // Thêm state cho playlist

  return (
    <SearchContext.Provider
      value={{
        searchData,
        setSearchData,
        searchDataKeyword,
        setSearchDataKeyword,
        searchSinger,
        setSearchSinger,
        playlistData, // Cung cấp playlistData
        setPlaylistData, // Cung cấp setPlaylistData
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
