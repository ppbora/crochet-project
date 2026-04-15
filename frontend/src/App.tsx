import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  //auto-login check
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        //accces token
        const res = await axios.post("/api/auth/refresh");
        setToken(res.data.accessToken);

        //get user
        const userRes = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${res.data.accessToken}` },
        });
        setUser(userRes.data.user);
        if (!token) {
          //accces token
          const res = await axios.post("/api/auth/refresh");
          setToken(res.data.accessToken);
          //get user
          const userRes = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${res.data.accessToken}` },
          });
          setUser(userRes.data.user);
        }
      } catch (err) {
        setToken("");
        setUser(null);
        console.log("User is not logged in. Browsing as guest.");
      } finally {
        setLoading(false);
      }
    };
    silentRefresh();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
