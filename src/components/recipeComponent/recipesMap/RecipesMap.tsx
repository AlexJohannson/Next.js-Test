'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { IRecipe } from "@/models/resipeModels/IRecipe";
import { getData } from "@/services/userService/api.user.service";
import RecipesList from "@/components/recipeComponent/recipesList/RecipesList";
import PaginationComponent from "@/components/paginationComponent/PaginationComponent";

const RecipesMap = () => {

    const searchParams = useSearchParams();
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const currentPage = searchParams.get('page') || '1';

    useEffect(() => {

        const fetchRecipes = async () => {

            const recipesResponse = await getData.getRecipeWithPagination(currentPage);
            setRecipes(recipesResponse.recipes);
        };
        fetchRecipes();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        window.history.pushState({}, '', `?${newParams.toString()}`);
    };

    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map((recipe: IRecipe) => <RecipesList key={recipe.id} recipe={recipe} />)
            ) : (
                <></>
            )}
            <PaginationComponent onPageChange={handlePageChange} />
        </div>
    );
};
export default RecipesMap;





