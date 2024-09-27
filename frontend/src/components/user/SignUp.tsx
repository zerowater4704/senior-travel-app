import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/userService";
import dayjs from "dayjs";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUp {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  image?: string;
}

const SignUp: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const userData = await register(name, email, password, birthDate);

      // ユーザー登録が成功した場合
      if (!userData.type) {
        console.log("会員登録に成功しました。", userData);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        if (userData.type === "validation") {
          setErrors(userData.messages);
        } else if (userData.type === "custom") {
          setErrors([userData.message]);
        } else if (userData.type === "server") {
          setErrors([userData.message]);
        }
      }
    } catch (error: any) {
      console.error("Error details:", error); // ここで投げられたエラーの詳細を表示
      setErrors(["予期せぬエラーが発生しました。"]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "birthDate":
        setBirthDate(value);
        break;
      default:
        break;
    }

    if (field === "name" && value) {
      setErrors(errors.filter((error) => error !== "名前を入力してください。"));
    } else if (field === "email" && value) {
      setErrors(
        errors.filter(
          (error) => error !== "有効なメールアドレスを入力してください。"
        )
      );
    } else if (field === "password" && value) {
      setErrors(
        errors.filter(
          (error) => error !== "パスワードは6文字以上にしてください。"
        )
      );
    } else if (field === "birthDate" && value) {
      setErrors(
        errors.filter((error) => error !== "生年月日を入力してください。")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {errors.includes("名前を入力してください。") && (
          <p>名前を入力してください。</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {errors.includes("有効なメールアドレスを入力してください。") && (
          <p>有効なメールアドレスを入力してください。</p>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.includes("パスワードは6文字以上にしてください。") && (
          <p>パスワードは6文字以上にしてください。</p>
        )}
      </div>
      <div>
        <label>Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {errors.includes("生年月日を入力してください。") && (
          <p>生年月日を入力してください。</p>
        )}
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default SignUp;
