// src/pages/ComingSoon.jsx
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-center p-4">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">🚧 Coming Soon</h1>
      <p className="text-lg mb-6">We're working hard on this page. Stay tuned!</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ComingSoon;
