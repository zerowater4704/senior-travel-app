import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SingUp from "./components/user/SignUp";
import { useEffect, useState } from "react";
import Login from "./components/user/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");

    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <nav>
          <ul>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      setIsAuthenticated(false);
                      localStorage.removeItem("userToken");
                      localStorage.removeItem("userName");
                    }}
                  >
                    ログアウト
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/signup">会員登録</Link>
                </li>
                <li>
                  <Link to="/login">ログイン</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/signup"
            element={<SingUp setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
