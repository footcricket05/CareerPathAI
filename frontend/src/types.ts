export interface UserData {
  name: string;
  email: string;
  role: string;
  skills: string[];
  summary: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}