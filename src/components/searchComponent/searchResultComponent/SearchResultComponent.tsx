'use client';
import React from 'react';
import Link from 'next/link';
import './SearchResultComponent.css';

export const SearchResultsComponent = ({ type, searchResults }:
                                       { type: "users" | "recipes", searchResults: any[] }) => {

    return (
        <div className={'search-result-container'}>
            {searchResults.length > 0 ? (
                searchResults.map((res, index) => (
                    <div className={'search-result'} key={index}>
                        {type === "users" ? (
                            <Link href={'/users/' + res.id} className={'search-link-result'}>
                                {res.firstName} {res.lastName}
                            </Link>
                        ) : (
                            <Link href={'/recipes/' + res.id} className={'search-link-result'}>
                                {res.name}
                            </Link>
                        )}
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default SearchResultsComponent;

