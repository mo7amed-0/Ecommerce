import { IoIosHeartEmpty, IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { userLogOut } from "../Redux/appSlice";

const Navbar = () => {
  const favouriteCount = useSelector((state) => state.app.favouriteCount);
  const cartCount = useSelector((state) => state.app.cartCount);
  const [openBar, setOpenBar] = useState(false);
  const dispatch = useDispatch();
  let userInfo = useSelector((state) => state.app.userInfo);
  const username = userInfo?.userName?.split(" ") || [];

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Log out Successfully");
        dispatch(userLogOut());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="fixed top-0 z-20 w-full bg-[#E2E3FFFF] grid grid-cols-2 lgl:grid-cols-[1fr_3fr_2fr_1fr] px-5 py-4">
      <div>
        <h2 className="text-xl font-bold">
          <span className="text-[#5141E4FF]">Shop</span>Ease
        </h2>
      </div>
      <div className="relative hidden lgl:block">
        <IoMdSearch className="absolute px-3 py-1 top-0 right-0 rounded-r-full bg-[#5141E4FF] w-11 h-8 text-white" />
        <input
          type="search"
          name=""
          id=""
          className="shadow-lg px-2 py-1 w-full rounded-full"
        />
      </div>
      <div className="hidden lgl:block">
        <ul className="flex gap-3 font-medium justify-center">
          <li>
            <Link to={"/"} className="font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="font-medium">
              About
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="font-medium">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex mr-10 lgl:mr-0 gap-3 items-center text-xl justify-end">
        {userInfo ? (
          <div className="hidden sm:flex gap-2 items-center">
            <button className="text-base font-semibold hidden sm:block hover:scale-110 transition duration-300">
              {username[0]}
            </button>
            <BiLogOut
              className="text-lg hover:scale-125 hover:rotate-180 transition duration-300"
              onClick={() => handleSignOut()}
            />
          </div>
        ) : (
          <>
            <Link to={"/registerpage"}>
              <FaRegUser className="hover:text-[#5141E4FF] hidden sm:block hover:scale-125 transition duration-300" />
            </Link>
          </>
        )}
        <Link to={"/favouriteproducts"} className="relative ">
          <IoIosHeartEmpty className="hover:text-[#5141E4FF] hover:scale-125 transition duration-300" />
          <span className="absolute top-[-10px] right-[-5px] bg-[#5141E4FF] text-center p-0.5 text-xs text-white rounded-lg">
            {favouriteCount}
          </span>
        </Link>
        <Link to={"/cart"} className="relative ">
          <IoCartOutline className="hover:text-[#5141E4FF] hover:scale-125 transition duration-300" />
          <span className="absolute top-[-10px] right-[-8px] bg-[#5141E4FF] text-center p-0.5 text-xs text-white rounded-lg">
            {cartCount}
          </span>
        </Link>
      </div>
      <div className="lgl:hidden absolute top-5 right-5 flex justify-end items-center text-xl">
        <FaBars
          className="open"
          onClick={() => {
            document.querySelector(".close").classList.remove("hidden");
            document.querySelector(".open").classList.add("hidden");
            setOpenBar(!openBar);
          }}
        />
        <MdClose
          className="hidden close text-xl"
          onClick={() => {
            document.querySelector(".close").classList.add("hidden");
            document.querySelector(".open").classList.remove("hidden");
            setOpenBar(!openBar);
          }}
        />
      </div>
      <div
        className={`absolute top-0 right-5 w-[160px] py-4 rounded-xl bg-[#E2E3FFFF] flex flex-col justify-center items-center transform ${
          openBar ? "translate-y-16 " : "translate-y-[-100%] "
        } transition duration-500`}
      >
        <ul className="flex flex-col gap-3 font-semibold text-base justify-center items-center">
          <li>
            <Link
              to={"/"}
              className="hover:text-[#5141E4FF] transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="hover:text-[#5141E4FF] transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="hover:text-[#5141E4FF] transition duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            {userInfo ? (
              <div className="flex sm:hidden gap-2 items-center">
                <button className="text-sm hover:scale-110 transition duration-300">
                  {username[0]}
                </button>
                <BiLogOut
                  className="text-lg hover:scale-125 hover:rotate-180 transition duration-300"
                  onClick={() => handleSignOut()}
                />
              </div>
            ) : (
              <>
                <Link to={"/registerpage"}>
                  <FaRegUser className="hover:text-[#5141E4FF] sm:hidden hover:scale-125 transition duration-300" />
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
