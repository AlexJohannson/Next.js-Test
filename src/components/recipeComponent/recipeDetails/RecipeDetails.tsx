'use client';
import React, { useEffect, useState } from 'react';
import { getData } from "@/services/userService/api.user.service";
import { IRecipe } from "@/models/resipeModels/IRecipe";
import { IUser } from "@/models/usersModels/IUser";
import { useParams } from 'next/navigation';
import Link from "next/link";
import './RecipeDetails.css';

const RecipeDetails = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (id) {

            const fetchData = async () => {

                try {

                    const recipeResponse = await getData.getRecipeById(Number(id));
                    setRecipe(recipeResponse);

                    const userResponse = await getData.getUserById(recipeResponse.userId);
                    setUser(userResponse);
                }

                catch (error) {
                    console.error('Error fetching recipe or user data:', error);
                }

                finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [id]);

    if (loading) {
        return;
    }

    if (!recipe) {
        return <div className={'no-recipe-found'}>
                     <h3>No recipe found.</h3>
               </div>;
    }

    return (
        <div className={'recipe-details-container'}>
            <h2>Name: {recipe.name}</h2>
            <h3>Cuisine: {recipe.cuisine}</h3>
            <h3>Cook time (minutes): {recipe.cookTimeMinutes}</h3>
            <h3>Difficulty: {recipe.difficulty}</h3>
            <h3>Rating: {recipe.rating}</h3>
            <h3>Calories per serving: {recipe.caloriesPerServing}</h3>
            {user && (
                <div>
                    <h3>Created by:</h3>
                    <Link  className={'recipe-detail-link-user'} href={`/users/${user.id}`}>
                        {user.firstName} {user.lastName}
                    </Link>
                </div>
            )}
            <div>
                <h4>Tags:</h4>
                {recipe.tags && recipe.tags.length > 0 ? (
                    <ul>
                        {recipe.tags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                ) : (
                    <div className={'no-tag-to-recipe'}>
                          <p>No tags available to recipes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;



