import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebse/firebase";
import { useNavigate } from "react-router-dom";
import { showUserInfo } from "../Redux/appSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmailOrPass, setErrorEmailOrPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorEmail("Your email is require");
      return;
    } else if (password === "") {
      setErrorEmail("");
      setErrorPassword("Your password is require");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(
          showUserInfo({
            userName: user.displayName,
          })
        );
        console.log(user);
        navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorEmail("");
        setErrorPassword("");
        setErrorEmailOrPass("Your email or password is wrong");
      });
  };
  return (
    <div className="h-screen px-10 mx-auto">
      <h1 className="text-3xl font-bold bg-red my-5">Login Page</h1>
      <div className="flex flex-col justify-center items-center h-[70%]">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={login}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail("");
                setErrorEmailOrPass("");
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className={`text-red-400 mb-2 block font-semibold`}>
            {errorEmail}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorEmailOrPass("");
                setErrorPassword("");
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className={`text-red-400 mb-2 block font-semibold`}>
            {errorEmailOrPass}
            {errorPassword}
          </span>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#5141E4FF] hover:bg-[#fff] hover:text-[#5141E4FF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/registerpage" className="text-[#5141E4FF] font-medium">
              SignIN here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
