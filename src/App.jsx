import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import AddProductForm from "./components/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import { addToList, globalList, selectItems } from "./redux/productSlice";
import { getRequest } from "./helpers/requests";

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [formPop, setFormPop] = useState(false);
  const items = useSelector(selectItems);
  const [productList, setProductList] = useState(items);

  useEffect(() => {
    if (loading) {
      getProductsList();
    } else {
      setProductList(items);
    }
  }, [formPop]);
  const getProductsList = async () => {
    const url = "products";

    const allProducts = await getRequest(url);

    if (allProducts.value) {
      dispatch(globalList(allProducts.data.data));
      setProductList(allProducts.data.data);
    }
    setLoading(false);
  };
  return (
    <section className="flex flex-col w-full bg-white text-gray-600 min-h-screen ">
      {formPop ? (
        <div className="fixed z-30  w-full h-screen top-0 left-0 items-center   bg-gray-800/40">
          <div className="flex w-full items-start mt-10 justify-center ">
            <div className="relative md:mx-20 flex flex-col  sm:w-4/5 lg:w-1/2 items-center justify-center bg-white rounded-lg shadow-md px-4 md:px-8 py-2">
              <div className="flex flex-row justify-between p-2 bg-white w-full border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p className="font-semibold text-gray-800">Add Product</p>
                <span onClick={() => setFormPop(false)}>
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
              <div
                id="journal-scroll"
                className="w-full h-[30rem]  overflow-y-auto"
              >
                <AddProductForm setFormPop={setFormPop} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col justify-center h-full">
        <div className="w-full  bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100 flex items-center justify-between w-full">
            <h2 className="font-semibold text-gray-800">Products</h2>
            <button
              onClick={() => setFormPop(true)}
              className="font-semibold text-white bg-blue-500 rounded px-3 py-2"
            >
              Add Products +
            </button>
          </header>
          <ProductTable productList={productList} loading={loading} />
        </div>
      </div>
    </section>
  );
}
