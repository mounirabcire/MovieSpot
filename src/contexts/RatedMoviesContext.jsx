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
    function rateMovie(newItem) {
        setRatedMovies(prev => {
            const itemExist = prev.some(p => p.id === newItem.id);
            if (itemExist) {
                return [...prev.filter(p => p.id !== newItem.id), newItem];
            }
            return [...prev, newItem];
        });
    }

    return (
        <RatedMoviesContext.Provider
            value={{
                values: {
                    ratedMovies,
                },
                functions: {
                    rateMovie,
                },
            }}
        >
            {children}
        </RatedMoviesContext.Provider>
    );
}

function useRatedMovies() {
    const context = useContext(RatedMoviesContext);
    if (!context) throw new Error("The context is used outside it's provider!");

    return context;
}

export { RatedMoviesProvider, useRatedMovies };
