import axios from 'axios';

const API_BASE_URL = '/api'; // Since it's in app router

export const usersAPI = {
  getUsers: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all parameters to query string
      Object.keys(params).forEach(key => {
        if (params[key]) {
          queryParams.append(key, params[key]);
        }
      });

      const response = await axios.get(`/api/users?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  }
};