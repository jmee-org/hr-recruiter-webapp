import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Set the base URL for your API
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if needed
  },
});

export default instance;