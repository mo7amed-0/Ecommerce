import React from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart, favourite } from "../Redux/appSlice";
import { MdBookmarkAdded } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;
  const dispatch = useDispatch();
  const favouriteList = useSelector((state) => state.app.favouriteList);
  const checkAdded = useSelector((state) => state.app.checkAdded);
  if (!product) {
    return <div className="text-center mt-10">المنتج غير موجود</div>;
  }

  return (
    <div className="md:px-10 mx-auto py-8 lgl:container">
      <div className="border p-6 rounded shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="lg:w-[45%] md:w-[55%] w-[70%] h-auto object-contain"
            />
          </div>
          <div className="space-y-4 flex flex-col justify-center">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl tracking-tight font-semibold">
                {product.title}
              </h1>
              <p className="text-xs font-medium text-[#49498f] bg-[#E2E3FFFF] p-1 rounded-xl text-center">
                {product.category}
              </p>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`${
                    index < Math.round(product.rating.rate)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-700 text-sm ml-2">
                {`(${product.rating.rate})`}
              </span>
              <span className="text-gray-700 text-sm ml-4">
                {`${product.rating.count} purchases`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">${product.price}</p>
              <div className="flex gap-2 items-center">
                <IoIosHeartEmpty
                  id={`heart${product.id}`}
                  className={`text-2xl rounded transition duration-300 ${
                    favouriteList.find((item) => item === `heart${product.id}`)
                      ? "text-white bg-[#5141E4FF]"
                      : "text-black bg-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      favourite({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        rating: product.rating,
                        quantity: 1,
                        idIcon: e.target.id,
                      })
                    );
                  }}
                />
                <button
                  id={`added${product.id}`}
                  className={`add flex gap-3 items-center bg-[#5141E4FF] text-white px-4 py-2 rounded-2xl hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-semibold transition duration-500 ${
                    checkAdded.includes(`added${product.id}`)
                      ? "opacity-70 hover:bg-[#5141e4]  hover:text-white transition duration-500"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.target.disabled = true;
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        rating: product.rating,
                        totalPrice: product.price,
                        quantity: 1,
                        idAdded: e.target.id,
                      })
                    );
                  }}
                >
                  {checkAdded.includes(`added${product.id}`) ? (
                    <>
                      Added <MdBookmarkAdded />
                    </>
                  ) : (
                    <>
                      Add{" "}
                      <FaShoppingCart
                        onClick={(e) => {
                          e.stopPropagation();
                          const button = document.getElementById(
                            `added${product.id}`
                          );
                          button.disabled = true;
                          dispatch(
                            addToCart({
                              id: product.id,
                              title: product.title,
                              image: product.image,
                              price: product.price,
                              description: product.description,
                              category: product.category,
                              rating: product.rating,
                              totalPrice: product.price,
                              quantity: 1,
                              idAdded: `added${product.id}`,
                            })
                          );
                        }}
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
