import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingUp from "./components/user/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
