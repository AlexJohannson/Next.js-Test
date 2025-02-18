import React from 'react';
import SearchResultsComponent from "@/components/searchComponent/searchResultComponent/SearchResultComponent";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const SearchBarComponent = ({ type, handleChangeSearchValue, searchValue }: { type: "users" | "recipes", handleChangeSearchValue: Function, searchValue: string }) => {

    return (
        <div className={'search-bar'}>
            <label>
                <input
                    type="text"
                    placeholder="Search......"
                    value={searchValue}
                    onChange={(e) => handleChangeSearchValue(e.target.value)}
                />
            </label>
            <SearchResultsComponent type={type} searchResults={[]} />
        </div>
    );
};

export default SearchBarComponent;

