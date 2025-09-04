import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import MovieDetailsPage from "./pages/MovieDetails/MovieDetailsPage";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

function App() {
  return (
    <div className="App">

      <Suspense fallback={<Loader />}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={<MoviesPage />}
          />
          <Route
            path="/movie/:id"
            element={<MovieDetailsPage />}
          >
            <Route
              path="cast"
              element={<MovieCast />}
            />
            <Route
              path="reviews"
              element={<MovieReviews />}
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
