'use client';
import { useState, useEffect } from 'react';
import { getData } from "@/services/userService/api.user.service";
import { IUser } from "@/models/usersModels/IUser";
import { IRecipe } from "@/models/resipeModels/IRecipe";


export const useFindItems = (type: "users" | "recipes") => {

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<IUser[] | IRecipe[]>([]);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null); // Зміна типу

    const handleChangeSearchValue = (value: string) => {

        setSearchValue(value);

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }

        const newTimer = setTimeout(async () => {

            try {
                let results: IUser[] | IRecipe[] = [];
                if (type === "users") {
                    const { users } = await getData.getUser();
                    results = users.filter(user =>
                        `${user.firstName} ${user.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
                        user.id.toString().includes(value)
                    );
                } else if (type === "recipes") {
                    const { recipes } = await getData.getRecipe();
                    results = recipes.filter(recipe =>
                        recipe.name.toLowerCase().includes(value.toLowerCase()) ||
                        recipe.id.toString().includes(value)
                    );
                }
                setSearchResults(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }, 300);
        setDebounceTimer(newTimer);
    };

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (!(event.target as HTMLElement).closest(".search-bar")) {
                setSearchValue("");
                setSearchResults([]);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {

            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return { handleChangeSearchValue, searchValue, searchResults };
};

