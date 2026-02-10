import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/authCards";
import API from "../api"; 

function Signup() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/signup", form); 
      alert(res.data.message); 
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthCard>
      <button onClick={() => navigate("/")} className="text-gray-400 mb-4">
        ←
      </button>

      <h2 className="text-xl font-bold mb-6">Signup</h2>

      <div className="space-y-4">
        <input
          name="name"
          className="w-full input"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          name="email"
          className="w-full input"
          placeholder="Email address"
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          type="tel"
          className="w-full input"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="w-full input"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium"
        >
          Sign up
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-500 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </AuthCard>
  );
}

export default Signup;
