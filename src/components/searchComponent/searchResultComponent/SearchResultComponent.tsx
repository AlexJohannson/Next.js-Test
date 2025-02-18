'use client';
import React from 'react';
import Link from 'next/link';

export const SearchResultsComponent = ({ type, searchResults }: { type: "users" | "recipes", searchResults: any[] }) => {

    return (
        <div className={'search-result'}>
            {searchResults.length > 0 ? (
                searchResults.map((res, index) => (
                    <div key={index}>
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

