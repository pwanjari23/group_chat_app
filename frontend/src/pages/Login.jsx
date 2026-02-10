import { useNavigate } from "react-router-dom";
import AuthCard from "../components/authCards";

function Login() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <h2 className="text-xl font-bold mb-2">
        Welcome to <span className="text-teal-500">umbrella</span>
      </h2>

      <p className="text-gray-500 mb-6">
        A simple chat platform for everyday use
      </p>

      <div className="space-y-4">
        <input className="w-full input" placeholder="Email address" />
        <input type="tel" className="w-full input" placeholder="Phone Number" />
        <input
          type="password"
          className="w-full input"
          placeholder="Password"
        />

        <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium">
          Login
        </button>

        <p className="text-sm text-center text-gray-400"></p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/signup")}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            Back
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">
            Forget Paasword
          </button>
        </div>
      </div>
    </AuthCard>
  );
}

export default Login;
