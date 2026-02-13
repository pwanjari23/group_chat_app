import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthCard from "../components/authCards";
import { connectSocket } from "../services/socket";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", form); // your backend login endpoint
      alert(res.data.message); 

      localStorage.setItem("token", res.data.token);
      connectSocket(res.data.token);
      
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthCard>
      <h2 className="text-xl font-bold mb-2">
        Welcome to <span className="text-teal-500">Umbrella</span>
      </h2>

      <p className="text-gray-500 mb-6">
        A simple chat platform for everyday use
      </p>

      <div className="space-y-4">
        <input
          name="email"
          className="w-full input"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          type="tel"
          className="w-full input"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="w-full input"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium"
        >
          Login
        </button>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            Signup
          </button>
          <button
            onClick={() => alert("Forget password flow")}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg"
          >
            Forget Password
          </button>
        </div>
      </div>
    </AuthCard>
  );
}

export default Login;
