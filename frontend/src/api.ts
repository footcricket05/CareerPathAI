import axios from 'axios';
import { UserData, ApiResponse } from './types';

const API_URL = 'http://localhost:8000/api';

export const generateResume = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generate-resume`, userData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to generate resume',
    };
  }
};

export const fetchJobRoles = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}/fetch-jobs`, userData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch job roles',
    };
  }
};

export const sendEmail = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}/send-email`, userData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send email',
    };
  }
};