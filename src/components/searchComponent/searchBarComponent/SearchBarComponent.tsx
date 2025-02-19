import React from 'react';
import SearchResultsComponent from "@/components/searchComponent/searchResultComponent/SearchResultComponent";
import './SearchBarComponent.css';


interface SearchBarProps {
    type: "users" | "recipes";
    handleChangeSearchValue: (value: string) => void;
    searchValue: string;
}

export const SearchBarComponent: React.FC<SearchBarProps> = ({ type, handleChangeSearchValue, searchValue }) => {

    return (
        <div className={'search-bar'}>
            <label className={'label-search-bar'}>
                Enter please letter or ID
                <input className={'input-search'} type="text" placeholder="Search......" value={searchValue}
                    onChange={(e) => handleChangeSearchValue(e.target.value)}/>
            </label>
            <SearchResultsComponent type={type} searchResults={[]}/>
        </div>
    );
};

export default SearchBarComponent;

