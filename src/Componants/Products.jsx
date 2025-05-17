import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { addToCart, favourite } from "../Redux/appSlice";
import { MdBookmarkAdded } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import ReactLoading from "react-loading";
// const loader = (
//   <ReactLoading type="balls" color="#5141E4FF" height={50} width={50} />
// );
const Products = () => {
  const data = useLoaderData();
  const products = data.data;
  const favouriteList = useSelector((state) => state.app.favouriteList);
  const checkAdded = useSelector((state) => state.app.checkAdded);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="text-4xl font-bold bg-red my-5">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 lgl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300 "
            onClick={() => {
              navigate(`/product/${product.id}`, {
                state: { product: product },
              });
            }}
          >
            <img
              src={product.image}
              alt={product.id}
              className="w-[40%] h-[48%] mb-4 mx-auto"
            />
            <div className="flex justify-between items-center ">
              <h2 className="text-lg tracking-tight font-semibold">
                {product.title.length > 30
                  ? `${product.title.slice(0, 30)}...`
                  : product.title}
              </h2>
              <p className="text-xs font-medium text-[#49498f] bg-[#E2E3FFFF] p-1 rounded-xl text-center">
                {product.category}
              </p>
            </div>
            <p className="text-sm tracking-tight">
              {product.description.length > 120
                ? `${product.description.slice(0, 120)}...`
                : product.description}
            </p>
            <div className="flex justify-between items-center my-1">
              <div>
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
                <span className="text-gray-700 text-sm mb-2">
                  {`(${product.rating.rate})`}
                </span>
              </div>
              <p>{product.rating.count}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">${product.price}</p>
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
                  className={`flex gap-3 items-center bg-[#5141E4FF] text-white px-4 py-2 rounded-2xl hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-semibold transition duration-500 ${
                    checkAdded.includes(`added${product.id}`)
                    ? "opacity-70 hover:bg-[#5141e4]  hover:text-white transition duration-500"
                    : "hover:bg-[#5141E4FF]"
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
        ))}
      </div>
    </div>
  );
};

export default Products;
