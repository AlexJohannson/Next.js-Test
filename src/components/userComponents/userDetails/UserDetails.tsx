// import React from 'react';
// import {SearchParams} from "next/dist/server/request/search-params";
// import {IUser} from "@/models/usersModels/IUser";
// import {IRecipe} from "@/models/resipeModels/IRecipe";
// import {getData} from "@/services/userService/api.user.service";
//
//
// type UserIdProps = {
//     searchParams: Promise<SearchParams>;
// }
//
// const UserDetails = async ({searchParams}:UserIdProps) => {
//
//     const {data} = await searchParams;
//     let user: IUser | null = null;
//     let recipe: IRecipe | null = null;
//     if (typeof data === 'string') {
//         user = JSON.parse(data) as IUser;
//         try {
//             const recipeResponse = await getData.getRecipeByUserId(user.id);
//             if (recipeResponse.recipes.length > 0) {
//                 recipe = recipeResponse.recipes[0];
//             }
//         } catch (error) {
//             console.error('Error fetching recipe data:', error);
//         }
//     }
//
//     return (
//         <div>
//             {
//                 user &&
//                 <div>
//                     <h2>{user.firstName} {user.lastName}</h2>
//                     <h4>Password - {user.password}</h4>
//                     <h4>Username - {user.username}</h4>
//                     <h4>Phone - {user.phone}</h4>
//                     <h4>Meddle name - {user.maidenName}</h4>
//                     <h4>Age - {user.age}</h4>
//                 </div>
//             } {recipe ?
//             ( <div>{recipe.name}</div>)
//             :(<div>No recipe found for this user.</div>)}
//         </div>
//     );
// };
//
// export default UserDetails;
'use client';
import React, { useState, useEffect } from 'react';
 // Correct import
import { IUser } from "@/models/usersModels/IUser";
import { IRecipe } from "@/models/resipeModels/IRecipe";
import { getData } from "@/services/userService/api.user.service";
import {useRouter} from "next/navigation";

const UserDetails = () => {
    const router = useRouter();
   // Access the user ID from the URL query
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch user and recipes when id changes
    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                try {
                    setLoading(true);  // Set loading to true before fetching
                    const userResponse = await getData.getUserById(Number(id)); // Fetch user by ID
                    setUser(userResponse); // Set user data

                    // Fetch recipes for the user
                    const recipeResponse = await getData.getRecipeByUserId(Number(id));
                    setRecipes(recipeResponse.recipes); // Set recipes data
                } catch (error) {
                    console.error('Error fetching user or recipe data:', error);
                } finally {
                    setLoading(false); // Set loading to false once data is fetched
                }
            };

            fetchUserData(); // Call the function to fetch user and recipes
        }
    }, [id]);  // Run the effect when `id` changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user found.</div>;
    }

    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <h4>Password: {user.password}</h4>
            <h4>Username: {user.username}</h4>
            <h4>Phone: {user.phone}</h4>
            <h4>Middle Name: {user.maidenName}</h4>
            <h4>Age: {user.age}</h4>

            <h3>Recipes:</h3>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No recipe found for this user.</div>
            )}
        </div>
    );
};

export default UserDetails;


