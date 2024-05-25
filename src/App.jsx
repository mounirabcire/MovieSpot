import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/home/Home";
import { loader as loaderTrendingAll } from "./features/movie-categories/trending-all/TrendingAll";

import ErrorEl from "./components/error-element/ErrorEl";
import AppLayout from "./components/app-layout/AppLayout";

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
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
