import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./loader/Loader";

// Loaders
import { loader as loaderTrendingAll } from "./components/home/Home";
import { loader as loaderDetails } from "./features/movie-details/Details";
import { loader as loaderMovies } from "./features/movie-categories/movies/Movies";
import { loader as loaderTvShows } from "./features/movie-categories/tv-shows/TvShows";
import { loader as loaderSearchedMovies } from "./features/searched-movies/SearchedMovies";

// Context Providers
import { FavoriteListProvider } from "./contexts/FavoriteListContext";
import { RatedMoviesProvider } from "./contexts/RatedMoviesContext";

// Lazy Loading Components
const AppLayout = lazy(() => import("./components/app-layout/AppLayout"));
const Home = lazy(() => import("./components/home/Home"));
const ErrorEl = lazy(() => import("./components/error-element/ErrorEl"));
const Movies = lazy(() => import("./features/movie-categories/movies/Movies"));
const TvShows = lazy(() => import("./features/movie-categories/tv-shows/TvShows"));
const SearchedMovies = lazy(() => import("./features/searched-movies/SearchedMovies"));
const Details = lazy(() => import("./features/movie-details/Details"));
const FavoriteList = lazy(() => import("./features/movie-favorite/FavoriteList"));

function App() {
    const router = createBrowserRouter([
        {
            element: (
                <FavoriteListProvider>
                    <RatedMoviesProvider>
                        <Suspense fallback={<Loader />}>
                            <AppLayout />
                        </Suspense>
                    </RatedMoviesProvider>
                </FavoriteListProvider>
            ),
            errorElement: (
                <Suspense fallback={<Loader />}>
                    <ErrorEl />
                </Suspense>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <Home />
                        </Suspense>
                    ),
                    loader: loaderTrendingAll,
                },
                {
                    path: "/movies",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <Movies />
                        </Suspense>
                    ),
                    loader: loaderMovies,
                },
                {
                    path: "/tvshows",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <TvShows />
                        </Suspense>
                    ),
                    loader: loaderTvShows,
                },
                {
                    path: "/details/:id",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <Details />
                        </Suspense>
                    ),
                    loader: loaderDetails,
                },
                {
                    path: "/search",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <SearchedMovies />
                        </Suspense>
                    ),
                    loader: loaderSearchedMovies,
                },
                {
                    path: "/favorite",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <FavoriteList />
                        </Suspense>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
