import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/userService";
import dayjs from "dayjs";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SingUp {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  image?: string;
}

const SingUp: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (name === "") {
      setNameError("名前を入力してください");
      isValid = false;
    } else {
      setNameError(null);
    }

    if (email === "") {
      setEmailError("メールアドレスを入力してください");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.length < 6) {
      setPasswordError("パスワードは6文字以上にしてください。");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    const birthYear = dayjs(birthDate).year();
    const currentYear = dayjs().year();
    const age = currentYear - birthYear;
    if (age < 50) {
      setBirthDateError("50歳以上の方しか登録できません。");
      isValid = false;
    } else {
      setBirthDateError(null);
    }

    if (!isValid) {
      return;
    }

    try {
      const userData = await register(name, email, password, birthDate);
      console.log("会員登録に成功しました。", userData);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "サーバーエラーが発生しました。";
      setEmailError(errorMessage);
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
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p>{nameError}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <div>
        <label>Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {birthDateError && <p>{birthDateError}</p>}
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default SingUp;
