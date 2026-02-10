import { useNavigate } from "react-router-dom";
import AuthCard from "../components/authCards";


function Signup() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <button onClick={() => navigate("/")} className="text-gray-400 mb-4">
        ←
      </button>

      <h2 className="text-xl font-bold mb-6">Signup</h2>

      <div className="space-y-4">
        <input className="w-full input" placeholder="Name" />
        <input className="w-full input" placeholder="Email address" />
        <input
          type="tel"
          className="w-full input"
          placeholder="Phone Number"
        />
        <input
          type="password"
          className="w-full input"
          placeholder="Password"
        />

        <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium">
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
