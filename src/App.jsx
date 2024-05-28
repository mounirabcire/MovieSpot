import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home, { loader as loaderTrendingAll } from "./components/home/Home";
import { loader as loaderDetails } from "./features/movie-details/Details";

import ErrorEl from "./components/error-element/ErrorEl";
import AppLayout from "./components/app-layout/AppLayout";
import Details from "./features/movie-details/Details";

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
                    element: <h1>Movies</h1>,
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
