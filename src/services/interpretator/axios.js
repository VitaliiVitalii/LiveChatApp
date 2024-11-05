import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
  (response) => response, 
  async (error) => {
    // Check if it's a 401 error and the token hasn't been refreshed yet
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      
      try {
        // Log the current refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        console.log(refreshToken);

        // Attempt to refresh the access token
        const response = await axios.post('https://batrak.pythonanywhere.com/api/users/token/refresh/', 
          { refresh: refreshToken }, 
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true 
          }
        );

        // If the token refresh was successful, update the access token and retry the failed request
        if (response.status === 200) {
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          // Update Axios default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

          // Store new tokens in localStorage
          localStorage.setItem('access_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry the original request with the new token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        // Handle token refresh error (e.g., refresh token expired)
        console.error('Token refresh failed', refreshError);
      } finally {
        // Reset the refresh flag in both success and failure cases
        refresh = false;
      }
    }
    
    // If the error is not 401 or the refresh has already been attempted, reject the error
    return Promise.reject(error);
  }
);
