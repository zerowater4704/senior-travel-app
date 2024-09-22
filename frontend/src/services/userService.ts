import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

export const register = async (
  name: string,
  email: string,
  password: string,
  birthDate: string,
  image?: string
) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      name,
      email,
      password,
      birthDate,
      image,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
