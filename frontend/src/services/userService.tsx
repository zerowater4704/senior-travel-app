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
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    }
    // エラーメッセージがない場合は汎用的なエラーを投げる
    throw new Error("サーバーエラーが発生しました。");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userName", response.data.user.name);
      return response.data;
    } else {
      throw new Error("ログインに失敗しました。");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
