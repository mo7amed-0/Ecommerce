import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { showUserInfo } from "../Redux/appSlice";
import { useDispatch } from "react-redux";
// import {createUserDocumentFromAuth} from ""
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;        
        const hasEmailPassword = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        dispatch(
          showUserInfo({
            userName: user.displayName,
          })
        );
        if (hasEmailPassword) {
          navigate("/");
        } else {
          navigate("/resetpassword");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };
  const signin = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Your name is require");
      return;
    } else if (email === "") {
      setNameError("");
      setEmailError("Your email is require");
      return;
    } else if (password === "") {
      setNameError("");
      setEmailError("");
      setPasswordError("Your password is require");
      return;
    } else if (password.length < 6) {
      setNameError("");
      setEmailError("");
      setPasswordError("your password is too short");
      return;
    } else if (!/[a-z]/.test(password)) {
      setNameError("");
      setEmailError("");
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setNameError("");
      setEmailError("");
      setPasswordError(
        "Your password must contain at least one uppercase letter"
      );
      return;
    }
    console.log("Starting user creation with:", { email, name });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User created successfully:", {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
        });

        try {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          console.log("Profile updated successfully with name:", name);

          // Verify user data after update
          const updatedUser = auth.currentUser;
          console.log("Updated user data:", {
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            providerData: updatedUser.providerData,
          });

          // Check authentication methods
          const methods = await fetchSignInMethodsForEmail(auth, email);
          console.log("Available sign-in methods:", methods);

          if (methods.includes("password")) {
            console.log("Password method is available");
          } else {
            console.log("Password method is NOT available");
          }

          navigate("/loginpage");
        } catch (error) {
          console.error("Error in profile update:", error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", { errorCode, errorMessage });
        if (errorCode === "auth/email-already-in-use") {
          setNameError("");
          setEmailError("This email is already in use");
          setPasswordError("");
          return;
        }
      });
  };

  return (
    <div className="h-screen px-10 mx-auto">
      <h1 className="text-3xl font-bold bg-red my-5">Create Account</h1>
      <div className="flex flex-col justify-center items-center h-[70%] w-full">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={signin}
        >
          <div className="relative flex flex-col justify-center items-center mb-3">
            <hr className="bg-black w-full h-[1px] absolute z-0 top-4" />
            <p className="bg-white px-3 py-1 relative z-10">Sign in with</p>
            <div>
              <FaGoogle
                className="text-lg cursor-pointer"
                onClick={signInWithGoogle}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className={`text-red-400 mb-2 block font-semibold`}>
            {nameError}
          </span>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className={`text-red-400 mb-2 block font-semibold`}>
            {emailError}
          </span>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className={`text-red-400 mb-2 block font-semibold`}>
            {passwordError}
          </span>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="bg-[#5141E4FF] hover:bg-white hover:text-[#5141E4FF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Register
            </button>
            <p className="text-gray-600">
              Already have an account?
              <Link to="/loginpage" className="text-[#5141E4FF] font-medium">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
