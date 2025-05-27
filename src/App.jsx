import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import "./App.css";

import Loader from "./components/Loader";
const Navigation = lazy(() => import("./components/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));

// const url =
//   "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

// const options = {
//   headers: {
//     // eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMTZjOWU1MTMyNTlkYThmY2Y2MzAwZjFmZWI3OCIsIm5iZiI6MTc0MzcwNjgxNi42NTEsInN1YiI6IjY3ZWVkYWMwYjNlMDM1Mjg2Y2Q5MGQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhiQgrAi8xURVIwPyhgnrhq88KOZAEHcX1G8OwLmwQM
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMTZjOWU1MTMyNTlkYThmY2Y2MzAwZjFmZWI3OCIsIm5iZiI6MTc0MzcwNjgxNi42NTEsInN1YiI6IjY3ZWVkYWMwYjNlMDM1Mjg2Y2Q5MGQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhiQgrAi8xURVIwPyhgnrhq88KOZAEHcX1G8OwLmwQM",
//   },
// };

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={lazy(() => import("./pages/HomePage"))} />
          <Route
            path="/movies"
            element={lazy(() => import("./pages/MoviesPage"))}
          />
          <Route
            path="/movie/:id"
            element={lazy(() => import("./pages/MovieDetailsPage"))}
          >
            <Route
              path="cast"
              element={lazy(() => import("./components/MovieCast"))}
            />
            <Route
              path="reviews"
              element={lazy(() => import("./components/MovieReviews"))}
            />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
