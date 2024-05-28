import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home, { loader as loaderTrendingAll } from "./components/home/Home";
import { loader as loaderDetails } from "./features/movie-details/Details";
import { loader as loaderMovies } from "./features/movie-categories/movies/moviespage/Movies";

import ErrorEl from "./components/error-element/ErrorEl";
import AppLayout from "./components/app-layout/AppLayout";
import Details from "./features/movie-details/Details";
import Movies from "./features/movie-categories/movies/moviespage/Movies";

// TODO: Add a feature on the Navbar component(using isInView hook).

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
                    path: "/details/:id",
                    element: <Details />,
                    loader: loaderDetails,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
