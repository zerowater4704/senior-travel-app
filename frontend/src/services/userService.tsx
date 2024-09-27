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
    if (error.response && error.response.data && error.response.data.errors) {
      // バリデーションエラーが存在する場合
      const validationErrors = error.response.data.errors;
      const errorMessages = validationErrors.map((err: any) => err.msg);
      return { type: "validation", messages: errorMessages };
    }

    if (error.response && error.response.data && error.response.data.message) {
      // カスタムメッセージが存在する場合
      return { type: "custom", message: error.response.data.message };
    }

    // サーバーエラーの場合
    return { type: "server", message: "サーバーエラーが発生しました。" };
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
    if (error.response && error.response.data && error.response.data.errors) {
      // バリデーションエラーが存在する場合
      const validationErrors = error.response.data.errors;
      const errorMessages = validationErrors.map((err: any) => err.msg);
      return { type: "validation", messages: errorMessages };
    }

    if (error.response && error.response.data && error.response.data.message) {
      // カスタムメッセージが存在する場合
      return { type: "custom", message: error.response.data.message };
    }

    // サーバーエラーの場合
    return { type: "server", message: "サーバーエラーが発生しました。" };
  }
};
