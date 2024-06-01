import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home, { loader as loaderTrendingAll } from "./components/home/Home";
import { loader as loaderDetails } from "./features/movie-details/Details";
import { loader as loaderMovies } from "./features/movie-categories/movies/Movies";
import { loader as loaderTvShows } from "./features/movie-categories/tv-shows/TvShows";
import { loader as loaderSearchedMovies } from "./features/searched-movies/SearchedMovies";

import ErrorEl from "./components/error-element/ErrorEl";
import AppLayout from "./components/app-layout/AppLayout";
import Details from "./features/movie-details/Details";
import Movies from "./features/movie-categories/movies/Movies";
import TvShows from "./features/movie-categories/tv-shows/TvShows";
import SearchedMovies from "./features/searched-movies/SearchedMovies";

// TODO: Add a feature on the Navbar component(using isInView hook).
// FIXME: TvShows compoenet > see details producing errors.
// TODO: Get a look of what is debouncing

function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <ErrorEl />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                    loader: loaderTrendingAll,
                },
                {
                    path: "/movies",
                    element: <Movies />,
                    loader: loaderMovies,
                },
                {
                    path: "/tvshows",
                    element: <TvShows />,
                    loader: loaderTvShows,
                },
                {
                    path: "/details/:id",
                    element: <Details />,
                    loader: loaderDetails,
                },
                {
                    path: "/search",
                    element: <SearchedMovies />,
                    loader: loaderSearchedMovies,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
