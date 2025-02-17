import React from 'react';
import RecipeDetails from "@/components/recipeComponent/recipeDetails/RecipeDetails";
import {SearchParams} from "next/dist/server/request/search-params";

interface IRecipePageProps {
    searchParams: Promise<SearchParams>;
}

const RecipePage = ({searchParams}: IRecipePageProps) => {
    return (
        <div>
            <RecipeDetails searchParams={searchParams}/>
        </div>
    );
};

export default RecipePage;