import React from 'react';
import RecipesMap from "@/components/recipeComponent/recipesMap/RecipesMap";
import Search from "@/components/searchComponent/Search";
import RecipeTagFilterComponent from "@/components/recipeComponent/recipeByTag/RecipeTagFilterComponent";


const RecipesPage = () => {
    return (
        <div>
            <Search type={'recipes'}/>
            <RecipeTagFilterComponent/>
            <RecipesMap/>

        </div>
    );
};

export default RecipesPage;