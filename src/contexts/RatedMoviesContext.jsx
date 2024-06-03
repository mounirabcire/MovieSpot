import { createContext, useContext, useEffect, useState } from "react";

const RatedMoviesContext = createContext();

function RatedMoviesProvider({ children }) {
    // Hooks
    const [ratedMovies, setRatedMovies] = useState(() => {
        const storedRated = window.localStorage.getItem("ratedMovies");
        try {
            return storedRated ? JSON.parse(storedRated) : [];
        } catch (error) {
            console.error(
                "Failed to parse rated movies from local storage:",
                error
            );
            return [];
        }
    });

    useEffect(() => {
        window.localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
    }, [ratedMovies]);

    // Functions
    const rateMovie = newItem => {
        setRatedMovies(prev => {
            const itemIndex = prev.findIndex(p => p.id === newItem.id);
            if (itemIndex > -1) {
                // If the item already exists and the rating is the same, return the previous state
                if (prev[itemIndex].rating === newItem.rating) {
                    return prev;
                }
                // Replace the existing item
                const updatedMovies = [...prev];
                updatedMovies[itemIndex] = newItem;
                return updatedMovies;
            }
            // Add the new item
            return [...prev, newItem];
        });
    };
    const contextValue = {
        values: {
            ratedMovies,
        },
        functions: {
            rateMovie,
        },
    };

    return (
        <RatedMoviesContext.Provider value={contextValue}>
            {children}
        </RatedMoviesContext.Provider>
    );
}

function useRatedMovies() {
    const context = useContext(RatedMoviesContext);
    if (!context) {
        throw new Error(
            "useRatedMovies must be used within a RatedMoviesProvider"
        );
    }
    return context;
}

export { RatedMoviesProvider, useRatedMovies };
