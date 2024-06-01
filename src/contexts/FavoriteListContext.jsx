import { createContext, useContext, useEffect, useState } from "react";

const FavoriteListContext = createContext();

function FavoriteListProvider({ children }) {
    // Hooks
    const [favList, setFavList] = useState(() => {
        const storedFav = window.localStorage.getItem("favList");
        try {
            return storedFav ? JSON.parse(storedFav) : [];
        } catch (error) {
            console.error(
                "Failed to parse favorite list from local storage:",
                error
            );
            return [];
        }
    });

    useEffect(() => {
        window.localStorage.setItem("favList", JSON.stringify(favList));
    }, [favList]);

    // Functions
    function addNewItem(newItem) {
        setFavList(prev => {
            const itemExist = prev.some(p => p.id === newItem.id);
            if (itemExist) return prev;
            return [...prev, newItem];
        });
    }
    function deleteItem(itemId) {
        setFavList(prev => {
            const newData = prev.filter(p => p.id !== itemId);
            return newData;
        });
    }

    return (
        <FavoriteListContext.Provider
            value={{
                values: {
                    favList,
                },
                functions: {
                    addNewItem,
                    deleteItem,
                },
            }}
        >
            {children}
        </FavoriteListContext.Provider>
    );
}

function useFavoriteList() {
    const context = useContext(FavoriteListContext);
    if (!context) throw new Error("The context is used outside it's provider!");

    return context;
}

export { FavoriteListProvider, useFavoriteList };
