import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import MovieDetailsPage from "./pages/MovieDetails/MovieDetailsPage";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";
import Loader from "./components/Loader";


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
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
          >
            <Route
              path="/movies/:movieId/cast"
              element={<MovieCast />}
            />
            <Route
              path="/movies/:movieId/reviews"
              element={<MovieReviews />}
            />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false} />

      </Suspense>
    </div>
  );
}

export default App;
