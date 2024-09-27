import { useState } from "react";
import { loginUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    try {
      const userData = await loginUser(email, password);

      if (!userData.type) {
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
      setErrors(["メールアドレスまたはパスワードが間違っています。"]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    if (field === "email" && value) {
      setErrors(
        errors.filter((error) => error !== "メールアドレスが間違っています。")
      );
    } else if (field === "password" && value) {
      setErrors(
        errors.filter((error) => error !== "パスワードが間違っています。")
      );
    }
  };
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.includes("メールアドレスが間違っています。") && (
            <p>メールアドレスが間違っています。</p>
          )}
        </div>
        <div>
          <label>パスワード: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          {errors.includes("パスワードが間違っています。") && (
            <p>パスワードが間違っています。</p>
          )}
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
