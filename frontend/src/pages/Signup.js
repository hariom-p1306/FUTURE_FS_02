// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const navigate = useNavigate();

//     const handleSignup = async () => {
//         try {
//             setError("");

//             await API.post("/auth/signup", {
//                 name,
//                 email,
//                 password
//             });

//             // success → redirect to login
//             navigate("/", { replace: true });

//         } catch (err) {
//             const message = err.response?.data?.message || "";

//             if (message.toLowerCase().includes("exist")) {
//                 setError("User already exists");
//             } else {
//                 setError(message || "Something went wrong");
//             }
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">

//             <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

//                 <h1 className="text-3xl font-bold text-center mb-6">
//                     Create Account 🚀
//                 </h1>

//                 {/* Name */}
//                 <input
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full border p-3 mb-4 rounded"
//                 />

//                 {/* Email */}
//                 <input
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => {
//                         setEmail(e.target.value);
//                         setError("");
//                     }}
//                     className={`w-full border p-3 mb-2 rounded ${error ? "border-red-500" : ""
//                         }`}
//                 />

//                 {/* Error Message */}
//                 {error && (
//                     <p className="text-red-500 text-sm mb-2">
//                         {error}
//                     </p>
//                 )}

//                 {/* Password with Show/Hide */}
//                 <div className="relative mb-4">
//                     <input
//                         placeholder="Password"
//                         type={showPassword ? "text" : "password"}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full border p-3 rounded"
//                     />

//                     <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
//                     >
//                         {showPassword ? "Hide" : "Show"}
//                     </span>
//                 </div>

//                 {/* Signup Button */}
//                 <button
//                     onClick={handleSignup}
//                     className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition hover:scale-105"
//                 >
//                     Signup
//                 </button>

//                 {/* Login Redirect */}
//                 <p className="text-center mt-4">
//                     Already have an account?{" "}
//                     <Link to="/" className="text-blue-500">
//                         Login
//                     </Link>
//                 </p>

//             </div>

//         </div>
//     );
// }

// export default Signup;

import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await API.post("/auth/signup", {
                name,
                email,
                password
            });

            // ✅ success message (optional)
            alert("Account created successfully 🎉 Please login");

            // ✅ redirect to login page
            navigate("/", { replace: true });

        } catch (err) {
            const message = err.response?.data?.message;

            if (message?.toLowerCase().includes("exist")) {
                alert("User already exists, please login");
                navigate("/"); // 👉 direct to login
            } else {
                alert("Signup failed");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account 🚀
                </h1>

                <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 mb-4 rounded"
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Signup
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}


                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;