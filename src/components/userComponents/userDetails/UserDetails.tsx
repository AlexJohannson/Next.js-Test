'use client';
import React, { useEffect, useState } from 'react';
import { getData } from "@/services/userService/api.user.service";
import { IUser } from "@/models/usersModels/IUser";
import { IRecipe } from "@/models/resipeModels/IRecipe";
import { useParams } from 'next/navigation';
import Link from "next/link";



const UserDetails = () => {

    const { id } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (id) {

            const fetchData = async () => {

                try {
                    const userResponse = await getData.getUserById(Number(id));
                    setUser(userResponse);
                    const recipeResponse = await getData.getRecipeByUserId(Number(id));
                    const userRecipes = recipeResponse.recipes.filter((recipe) => recipe.userId === Number(id));
                    setRecipes(userRecipes);
                }
                catch (error) {
                    console.error('Error from api', error);
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
    if (!user) {
        return;
    }
    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <h4>Password: {user.password}</h4>
            <h4>Username: {user.username}</h4>
            <h4>Phone: {user.phone}</h4>
            <h4>Middle name: {user.maidenName}</h4>
            <h4>Age: {user.age}</h4>

            <h3>Recipes:</h3>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link href={{pathname: '/recipes/' + recipe.id.toString(), query:{data: JSON.stringify(recipe)}}}>
                                {recipe.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <h3>This user dont have any recipes.</h3>
                </div>
            )}
        </div>
    );
};

export default UserDetails;









