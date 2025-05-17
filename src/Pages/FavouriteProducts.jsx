import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromFavourite } from "../Redux/appSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { createRoot } from "react-dom/client";

const FavouriteProducts = () => {
  const favouriteProducts = useSelector((state) => state.app.favouriteProducts);
  const dispatch = useDispatch();
  if (favouriteProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No select favourites</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold bg-red my-5">
        Your Favourite Products
      </h1>
      <div className="grid grid-cols-1  lgl:grid-cols-2 xl:grid-cols-3 gap-6">
        {favouriteProducts.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow-lg flex flex-col  hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]  items-center gap-6">
            <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.id}
                  className="lg:w-[45%] md:w-[55%] w-[70%] h-auto object-contain"
                />
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  <h2 className="text-lg tracking-tight font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-xs font-medium text-[#49498f] bg-[#E2E3FFFF] p-1 rounded-xl text-center">
                    {item.category}
                  </p>
                </div>
                <p className="text-sm tracking-tight w-[70%] lgl:w-full">
                  {item.description}
                </p>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < Math.round(item.rating.rate)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-700 text-sm mb-2">
                    {`(${item.rating.rate})`}
                  </span>
                  <p className="ml-4">{item.rating.count}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center my-1">
              <p className="text-lg font-semibold">
                ${parseFloat(item.price).toFixed(2)}
              </p>
             <div className="flex gap-2">
             <button
                className="add flex gap-3 items-center bg-[#5141E4FF] text-white px-4 py-2 rounded-2xl hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-semibold transition duration-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.target.innerText = "Added";
                  e.target.disabled = true;
                  const container = document.createElement("span");
                  e.target.appendChild(container);
                  const root = createRoot(container);
                  root.render(<MdBookmarkAdded />);
                  dispatch(
                    addToCart({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      description: item.description,
                      category: item.category,
                      rating: item.rating,
                      totalPrice: item.price,
                      quantity: 1,
                    })
                  );
                }}
              >
                Add <FaShoppingCart />
              </button>
              <button
                className="bg-red text-[#5141E4FF] font-semibold px-4 py-2 rounded-xl hover:bg-[#5141E4FF] hover:text-[#fff] hover:px-4 hover:py-2 transition duration-500"
                onClick={() => {
                  dispatch(removeFromFavourite({ id: item.id }));
                }}
              >
                Remove
              </button>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteProducts;
