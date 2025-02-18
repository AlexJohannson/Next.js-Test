'use client';
import React from 'react';
import SearchBarComponent from "@/components/searchComponent/searchBarComponent/SearchBarComponent";
import SearchResultsComponent from "@/components/searchComponent/searchResultComponent/SearchResultComponent";
import { useFindItems } from "@/components/searchComponent/until/until";

export const Search = ({ type }: { type: "users" | "recipes" }) => {

    const { searchResults, searchValue, handleChangeSearchValue } = useFindItems(type);

    return (
        <>
            <SearchBarComponent
                type={type}
                handleChangeSearchValue={handleChangeSearchValue}
                searchValue={searchValue}
            />
            <SearchResultsComponent
                type={type}
                searchResults={searchResults}
            />
        </>
    );
};

export default Search;

