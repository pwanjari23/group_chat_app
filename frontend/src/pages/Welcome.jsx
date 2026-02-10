import { useNavigate } from "react-router-dom";
import AuthCard from "../components/authCards";
import illustration from "../assets/welcome-illustration.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">
          Welcome to <span className="text-teal-500">Umbrella</span>
        </h1>

        <p className="text-gray-500">A simple chat platform for everyday use</p>

        <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={illustration}
            alt="Welcome Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium"
        >
          Sign up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full border border-teal-500 text-teal-500 py-3 rounded-lg font-medium"
        >
          Sign in
        </button>
      </div>
    </AuthCard>
  );
}

export default Welcome;
