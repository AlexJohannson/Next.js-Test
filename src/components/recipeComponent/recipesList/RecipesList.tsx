'use client';
import React from 'react';
import { IRecipe } from "@/models/resipeModels/IRecipe";
import Link from "next/link";
import './RecipesList.css';

type RecipeProps = {
    recipe: IRecipe;
}

const RecipesList = ({ recipe }: RecipeProps) => {

    return (
        <div className={'recipes-list'}>
            <Link className={'recipe-link'} href={{ pathname: '/recipes/' + recipe.id.toString(), query: { data: JSON.stringify(recipe) } }}>
                <h1>{recipe.id} - {recipe.name}</h1>
            </Link>
            <div>
                <h4>Tags:</h4>
                {recipe.tags && recipe.tags.length > 0 ? (
                    <ul>
                        {recipe.tags.map((tag, index) => (
                            <li key={index}>
                                <Link className={'link-tag'} href={`?tagItem=${tag}`}>
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default RecipesList;








