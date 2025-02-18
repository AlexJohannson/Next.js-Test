'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { getData } from "@/services/userService/api.user.service";
import { IRecipe } from "@/models/resipeModels/IRecipe";
import RecipesList from "@/components/recipeComponent/recipesList/RecipesList";

const RecipeTagFilterComponent = () => {

    const searchParams = useSearchParams();
    const tagItem = searchParams.get('tagItem');

    const [recipesByTag, setRecipesByTag] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (tagItem) {

            const fetchRecipesByTag = async () => {

                try {
                    setLoading(true);
                    const response = await getData.getRecipesByTag(tagItem);
                    setRecipesByTag(response.recipes);
                }
                catch (error) {
                    console.error('Error fetching recipes by tag:', error);
                }
                finally {
                    setLoading(false);
                }
            };
            fetchRecipesByTag();
        }
    }, [tagItem]);

    if (loading) {
        return;
    }

    return (
        <div>
            <h2>Recipes for Tag: {tagItem}</h2>
            {recipesByTag.length > 0 ? (
                recipesByTag.map((recipe, index) => (
                    <RecipesList key={index} recipe={recipe} />
                ))
            ) : (
                <div>
                      <p>No recipes found for this tag.</p>
                </div>
            )}
        </div>
    );
};

export default RecipeTagFilterComponent;











