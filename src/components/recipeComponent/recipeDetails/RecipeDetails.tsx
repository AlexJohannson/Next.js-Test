import React from 'react';
import {SearchParams} from "next/dist/server/request/search-params";
import {IRecipe} from "@/models/resipeModels/IRecipe";




type RecipeIdProps = {
    searchParams: Promise<SearchParams>;
}

const RecipeDetails = async ({searchParams}: RecipeIdProps) => {

    const {data} = await searchParams;
    let recipe = null;
    if (typeof data === 'string') {
        recipe = JSON.parse(data) as IRecipe;
    }
    return (
        <div>
            {
                recipe &&
                <div>
                    <h2>Name - {recipe.name}</h2>
                    <h2>Cuisine - {recipe.cuisine}</h2>
                    <h2>Cook time per minutes - {recipe.cookTimeMinutes}</h2>
                    <h2>Difficulty - {recipe.difficulty}</h2>
                    <h2>Rating - {recipe.rating}</h2>
                    <h2>Calories per serving - {recipe.caloriesPerServing}</h2>
                </div>
            }
        </div>
    );
};

export default RecipeDetails;
