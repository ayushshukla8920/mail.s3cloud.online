import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in (cookie exists)
  useEffect(() => {
    if (document.cookie.includes("_authtoken")) {
      navigate("/"); // Redirect if logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isLogin ? "/api/accounts/login" : "/api/accounts/create";

    // Prepare payload; include name only for signup
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // Important to send cookies cross-origin if any
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        navigate("/"); // On success go to homepage
      }
    } catch (err) {
      setError("Network error, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight animate-fill-text-red">
            Postify
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
          {isLogin ? "Welcome Back" : "Join S3 Mail"}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isLogin ? "Login to continue" : "Create your free account"}
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
              required={!isLogin}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            required
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition duration-200"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-sm text-center text-gray-600 mt-4">
          {isLogin ? (
            <>
              New here?{" "}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsLogin(false);
                }}
                className="text-red-500 font-medium hover:underline"
              >
                Create account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsLogin(true);
                }}
                className="text-red-500 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
      <style>
        {`
          @keyframes fillTextRed {
            from { color: #d1d5db; }
            to { color: #ef4444; }
          }
          .animate-fill-text-red {
            animation: fillTextRed 1.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
