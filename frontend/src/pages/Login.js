import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            alert("Login successful");

            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back 👋
                </h1>

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition transform"
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;