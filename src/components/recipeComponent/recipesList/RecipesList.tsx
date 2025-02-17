import React from 'react';
import {IRecipe} from "@/models/resipeModels/IRecipe";
import Link from "next/link";


type RecipeProps = {
    recipe: IRecipe;
}

const RecipesList = ({recipe}: RecipeProps) => {
    return (
        <div>
            <Link href={{pathname: '/recipes/' + recipe.id.toString(), query:{data: JSON.stringify(recipe)}}}>
                <h1>{recipe.id} - {recipe.name}</h1>
            </Link>
        </div>
    );
};

export default RecipesList;


