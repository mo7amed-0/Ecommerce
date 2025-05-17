import React, { useState } from "react";
import { auth } from "../Firebse/firebase";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleSetPassword = () => {
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password updated!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          setError(
            error.message || "Something went wrong while setting the password."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No user is currently signed in");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Set a Password</h2>
        <div className="flex items-center justify-center w-full max-w-md h-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full mb-4">
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#5141E4FF]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5141E4FF]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleSetPassword}
                disabled={loading}
                className={`w-full bg-[#5141E4FF] text-white px-4 py-3 rounded-lg transition-colors ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#4334D4FF]"
                }`}
              >
                {loading ? "Updating Password..." : "Save Password"}
              </button>

              {error && (
                <p className="text-red-500 mt-4 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
