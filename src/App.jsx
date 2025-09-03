import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import "./App.css";

import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

function App() {
  return (
    <div className="App">

      <Suspense fallback={<Loader />}>
        <Navigation />
        <Routes>
          <Route path="/" element={lazy(() => import("./pages/HomePage/HomePage"))} />
          <Route
            path="/movies"
            element={lazy(() => import("./pages/MoviesPage/MoviesPage"))}
          />
          <Route
            path="/movie/:id"
            element={lazy(() => import("./pages/MovieDetails/MovieDetailsPage"))}
          >
            <Route
              path="cast"
              element={lazy(() => import("./components/MovieCast/MovieCast"))}
            />
            <Route
              path="reviews"
              element={lazy(() => import("./components/MovieReviews/MovieReviews"))}
            />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </Suspense>
    </div>
  );
}

export default App;
