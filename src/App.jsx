import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/home/Home";
import { loader as loaderTrendingAll } from "./features/movie-categories/trending-all/TrendingAll";

import ErrorEl from "./components/error-element/ErrorEl";
import AppLayout from "./components/app-layout/AppLayout";

// TODO: Create AppLayout componenet (The parent route) that contains the navbar and other
// elements that might appear in all pages.
function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <ErrorEl />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                    errorElement: <ErrorEl />,
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
