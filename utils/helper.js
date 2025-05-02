const axios = require("axios");

const fetchJsonp = async (url) => {
    try {
        const response = await axios.get(url);
        const text = response.data;
        const match = text.match(/\((.*)\)/);
        return match ? JSON.parse(match[1]) : null;
    } catch (error) {
        console.error(`Error fetching JSONP data from ${url}:`, error.message);
        return null;
    }
};

module.exports = { fetchJsonp };
