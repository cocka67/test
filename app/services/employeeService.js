import axios from 'axios';

const API_BASE_URL = 'https://frontend-test-api.stk8s.66bit.ru/api';

export const getEmployees = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};
