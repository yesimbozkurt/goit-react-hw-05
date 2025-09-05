import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMTZjOWU1MTMyNTlkYThmY2Y2MzAwZjFmZWI3OCIsIm5iZiI6MTc0MzcwNjgxNi42NTEsInN1YiI6IjY3ZWVkYWMwYjNlMDM1Mjg2Y2Q5MGQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhiQgrAi8xURVIwPyhgnrhq88KOZAEHcX1G8OwLmwQM"

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
    const url = `${BASE_URL}/trending/movie/day?language=en-US`;
    const options = {
        headers: {
            Authorization:
                `Bearer ${API_KEY}`,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
}

export const fetchSearchedMovies = async (query = "") => {
    const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    const options = {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
};

export const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
    const options = {
        headers: {
            Authorization:
                `Bearer ${API_KEY}`,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from API:", error.response?.data || error.message);
        throw error;
    }
}
export const fetchMovieCasts = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
    const options = {
        headers: {
            Authorization:
                `Bearer ${API_KEY}`,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data.cast;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
}
export const fetchMovieReviews = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
    const options = {
        headers: {
            Authorization:
                `Bearer ${API_KEY}`,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
}

