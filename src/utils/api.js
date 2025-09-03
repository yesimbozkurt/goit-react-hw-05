import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMTZjOWU1MTMyNTlkYThmY2Y2MzAwZjFmZWI3OCIsIm5iZiI6MTc0MzcwNjgxNi42NTEsInN1YiI6IjY3ZWVkYWMwYjNlMDM1Mjg2Y2Q5MGQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhiQgrAi8xURVIwPyhgnrhq88KOZAEHcX1G8OwLmwQM"

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchDataFromApi = async () => {
    const url = `${BASE_URL}/trending/movie/day`
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

